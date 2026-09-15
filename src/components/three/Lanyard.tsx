/* eslint-disable react/no-unknown-property */
'use client';

import { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
    BallCollider,
    CuboidCollider,
    Physics,
    RigidBody,
    useRopeJoint,
    useSphericalJoint,
    RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

import { usePerformance } from '@/hooks/usePerformance';
import { portfolioData } from '@/data/portfolio';

extend({ MeshLineGeometry, MeshLineMaterial });

// Preload assets for faster startup
useGLTF.preload('/lanyard/card.glb');
useTexture.preload('/lanyard/lanyard.webp');
useTexture.preload('/images/nithish-photo.jpg');

interface LanyardProps {
    position?: [number, number, number];
    gravity?: [number, number, number];
    fov?: number;
    transparent?: boolean;
    isLowPowerMode?: boolean;
}

export function Lanyard({
    position = [0, 0, 30],
    gravity = [0, -40, 0],
    fov = 20,
    transparent = true,
    isLowPowerMode: isLowPowerModeProp
}: LanyardProps) {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const { isLowPowerMode: isLowPowerModeHook } = usePerformance();
    const isLowPowerMode = isLowPowerModeProp ?? isLowPowerModeHook;
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = (): void => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isLowPowerMode) {
        return (
            <div className="w-full h-full flex items-center justify-center p-8">
                <div className="relative group transition-all duration-500 hover:scale-105">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-blue-500/10 to-purple-500/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-64 aspect-[1.5/2.3] bg-[#0a0a12]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center p-6">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-purple-500" />
                        <div className="relative w-32 h-32 mb-6 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl">
                            <img
                                src={portfolioData.personal.avatar}
                                alt={portfolioData.personal.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white tracking-tight">
                                {portfolioData.personal.name}
                            </h3>
                            <p className="text-sm text-zinc-400 font-medium">
                                {portfolioData.personal.title}
                            </p>
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/5 w-full">
                            <div className="flex justify-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 flex items-center">
                                    Archive Link Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative z-0 w-full h-full flex justify-center items-center transform scale-100 origin-center">
            <Canvas
                camera={{ position, fov }}
                dpr={[1, isMobile ? 1.5 : 2]}
                gl={{ alpha: transparent, antialias: false, powerPreference: 'high-performance' }}
                onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
            >
                <ambientLight intensity={Math.PI} />
                <Suspense fallback={null}>
                    <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
                        <Band isMobile={isMobile} isDark={isDark} />
                    </Physics>
                </Suspense>
                <Environment blur={0.75}>
                    <Lightformer
                        intensity={2}
                        color="white"
                        position={[0, -1, 5]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={3}
                        color="white"
                        position={[-1, -1, 1]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={3}
                        color="white"
                        position={[1, 1, 1]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={10}
                        color="white"
                        position={[-10, 0, 14]}
                        rotation={[0, Math.PI / 2, Math.PI / 3]}
                        scale={[100, 10, 1]}
                    />
                </Environment>
            </Canvas>
        </div>
    );
}

interface BandProps {
    maxSpeed?: number;
    minSpeed?: number;
    isMobile?: boolean;
    isDark?: boolean;
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, isDark = false }: BandProps) {
    const band = useRef<any>(null);
    const fixed = useRef<any>(null);
    const j1 = useRef<any>(null);
    const j2 = useRef<any>(null);
    const j3 = useRef<any>(null);
    const card = useRef<any>(null);

    const vec = new THREE.Vector3();
    const ang = new THREE.Vector3();
    const rot = new THREE.Vector3();
    const dir = new THREE.Vector3();

    const segmentProps: any = {
        type: 'dynamic' as RigidBodyProps['type'],
        canSleep: true,
        colliders: false,
        angularDamping: 4,
        linearDamping: 4
    };

    const { nodes, materials } = useGLTF('/lanyard/card.glb') as any;
    const texture = useTexture('/lanyard/lanyard.webp');
    const photoTexture = useTexture('/images/nithish-photo.jpg');

    const cardTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 3750;
        canvas.height = 4219;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const drawFullPhoto = (x: number, y: number, w: number, h: number) => {
            ctx.save();
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(x + 20, y + 20, w - 40, h - 40, 48);
            else ctx.rect(x + 20, y + 20, w - 40, h - 40);
            ctx.clip();

            // Background fallback
            ctx.fillStyle = '#0a0e17';
            ctx.fillRect(x, y, w, h);

            const photoImg = photoTexture?.image;
            if (photoImg && (photoImg.width || photoImg.naturalWidth)) {
                const iw = photoImg.width || photoImg.naturalWidth;
                const ih = photoImg.height || photoImg.naturalHeight;
                const imgRatio = iw / ih;
                const targetRatio = w / h;
                let sx = 0, sy = 0, sw = iw, sh = ih;
                if (imgRatio > targetRatio) {
                    sw = ih * targetRatio;
                    sx = (iw - sw) / 2;
                } else {
                    sh = iw / targetRatio;
                    sy = (ih - sh) / 4;
                }
                ctx.drawImage(photoImg, sx, sy, sw, sh, x, y, w, h);
            }

            // Subtle inner border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
            ctx.lineWidth = 12;
            if (ctx.roundRect) ctx.roundRect(x + 20, y + 20, w - 40, h - 40, 48);
            else ctx.rect(x + 20, y + 20, w - 40, h - 40);
            ctx.stroke();

            ctx.restore();
        };

        // FRONT FACE (Left Half)
        drawFullPhoto(0, 0, 1875, 4219);

        // BACK FACE (Right Half)
        drawFullPhoto(1875, 0, 1875, 4219);

        const tex = new THREE.CanvasTexture(canvas);
        tex.flipY = false;
        tex.anisotropy = 16;
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
        return tex;
    }, [photoTexture]);

    // Use original lanyard string texture adjustment
    const stringTexture = useMemo(() => {
        if (!texture) return null;
        if (!isDark) return texture;

        const img = texture.image;
        if (!img) return texture;

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return texture;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const greyValue = 50;

        for (let i = 0; i < data.length; i += 4) {
            const brightness = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
            if (brightness < 128) {
                data[i] = greyValue;
                data[i + 1] = greyValue;
                data[i + 2] = greyValue;
            }
        }
        ctx.putImageData(imageData, 0, 0);

        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.colorSpace = texture.colorSpace;
        return tex;
    }, [texture, isDark]);

    const [curve] = useState(
        () =>
            new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
    );
    const [dragged, drag] = useState<false | THREE.Vector3>(false);
    const [hovered, hover] = useState(false);

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    useSphericalJoint(j3, card, [
        [0, 0, 0],
        [0, 1.25, 0]
    ]);

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? 'grabbing' : 'grab';
            return () => {
                document.body.style.cursor = 'auto';
            };
        }
    }, [hovered, dragged]);

    useFrame((state, delta) => {
        if (dragged && typeof dragged !== 'boolean') {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
            card.current?.setNextKinematicTranslation({
                x: vec.x - dragged.x,
                y: vec.y - dragged.y,
                z: vec.z - dragged.z
            });
        }
        if (fixed.current) {
            [j1, j2].forEach(ref => {
                if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
                const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
                ref.current.lerped.lerp(
                    ref.current.translation(),
                    delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
                );
            });
            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2.current.lerped);
            curve.points[2].copy(j1.current.lerped);
            curve.points[3].copy(fixed.current.translation());
            band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
            ang.copy(card.current.angvel());
            rot.copy(card.current.rotation());
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
        }
    });

    curve.curveType = 'chordal';
    if (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }

    if (!nodes?.card?.geometry || !nodes?.clip?.geometry || !nodes?.clamp?.geometry) {
        return null;
    }

    return (
        <>
            <group position={[0, 3.6, 0]}>
                <RigidBody ref={fixed} {...segmentProps} type={'fixed' as RigidBodyProps['type']} />
                <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody
                    position={[2, 0, 0]}
                    ref={card}
                    {...segmentProps}
                    type={dragged ? ('kinematicPosition' as RigidBodyProps['type']) : ('dynamic' as RigidBodyProps['type'])}
                >
                    <CuboidCollider args={[0.9, 1.3, 0.01]} />
                    <group
                        scale={2.6}
                        position={[0, -1.2, -0.05]}
                        onPointerOver={() => hover(true)}
                        onPointerOut={() => hover(false)}
                        onPointerUp={(e: any) => {
                            e.target.releasePointerCapture(e.pointerId);
                            drag(false);
                        }}
                        onPointerDown={(e: any) => {
                            e.target.setPointerCapture(e.pointerId);
                            drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
                        }}
                    >
                        <mesh geometry={nodes.card.geometry}>
                            <meshBasicMaterial
                                map={cardTexture || undefined}
                                color="#ffffff"
                                toneMapped={false}
                            />
                        </mesh>
                        <mesh geometry={nodes.clip.geometry} material={materials.metal}>
                            <meshStandardMaterial color={isDark ? "#333333" : "#111111"} roughness={0.3} metalness={0.8} />
                        </mesh>
                        <mesh geometry={nodes.clamp.geometry}>
                            <meshStandardMaterial color={isDark ? "#333333" : "#111111"} roughness={0.3} metalness={0.8} />
                        </mesh>
                    </group>
                </RigidBody>
            </group>
            <mesh ref={band}>
                <meshLineGeometry />
                <meshLineMaterial
                    color="white"
                    depthTest={false}
                    resolution={isMobile ? [1000, 2000] : [1000, 1000]}
                    useMap={1}
                    map={stringTexture}
                    repeat={[-4, 1]}
                    lineWidth={1}
                />
            </mesh>
        </>
    );
}