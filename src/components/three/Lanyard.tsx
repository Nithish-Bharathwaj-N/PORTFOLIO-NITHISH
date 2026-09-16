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
import { ProfileIDCard } from '@/components/ui/ProfileIDCard';

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
        return <ProfileIDCard />;
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

        const drawIDCardFront = (x: number, y: number, w: number, h: number) => {
            ctx.save();
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(x + 20, y + 20, w - 40, h - 40, 60);
            else ctx.rect(x + 20, y + 20, w - 40, h - 40);
            ctx.clip();

            // 1. Dark Metallic Background Gradient
            const bgGrad = ctx.createLinearGradient(x, y, x, y + h);
            bgGrad.addColorStop(0, '#0c0d14');
            bgGrad.addColorStop(0.5, '#08090e');
            bgGrad.addColorStop(1, '#040508');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(x, y, w, h);

            // Grid background texture dots
            ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
            for (let gx = x + 60; gx < x + w - 60; gx += 80) {
                for (let gy = y + 60; gy < y + h - 60; gy += 80) {
                    ctx.beginPath();
                    ctx.arc(gx, gy, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Outer Card Border Glow
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
            ctx.lineWidth = 16;
            if (ctx.roundRect) ctx.roundRect(x + 30, y + 30, w - 60, h - 60, 56);
            else ctx.rect(x + 30, y + 30, w - 60, h - 60);
            ctx.stroke();

            // 2. Lanyard Slot / Punch Hole at top
            ctx.fillStyle = '#000000';
            const holeW = 320, holeH = 70;
            const holeX = x + (w - holeW) / 2;
            const holeY = y + 100;
            if (ctx.roundRect) ctx.roundRect(holeX, holeY, holeW, holeH, 35);
            else ctx.rect(holeX, holeY, holeW, holeH);
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 6;
            ctx.stroke();

            // 3. Top Header: Logo/Title & Status Badge
            ctx.fillStyle = '#9ca3af';
            ctx.font = 'bold 50px monospace';
            ctx.textAlign = 'left';
            ctx.fillText('CIT // OFFICIAL ID', x + 120, y + 340);

            // "AVAILABLE" Badge
            const badgeW = 380, badgeH = 80;
            const badgeX = x + w - 120 - badgeW;
            const badgeY = y + 280;
            ctx.fillStyle = 'rgba(6, 78, 59, 0.5)';
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 40);
            else ctx.rect(badgeX, badgeY, badgeW, badgeH);
            ctx.fill();
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
            ctx.lineWidth = 6;
            ctx.stroke();

            // Green pulsing dot
            ctx.fillStyle = '#34d399';
            ctx.beginPath();
            ctx.arc(badgeX + 50, badgeY + 40, 14, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#34d399';
            ctx.font = 'bold 40px sans-serif';
            ctx.fillText('AVAILABLE', badgeX + 85, badgeY + 54);

            // Header Separator Line
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(x + 100, y + 420);
            ctx.lineTo(x + w - 100, y + 420);
            ctx.stroke();

            // 4. Centered Avatar Photo Frame
            const photoW = 1050, photoH = 1250;
            const photoX = x + (w - photoW) / 2;
            const photoY = y + 500;

            // Photo frame background shadow & border
            ctx.save();
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(photoX, photoY, photoW, photoH, 70);
            else ctx.rect(photoX, photoY, photoW, photoH);
            ctx.clip();

            ctx.fillStyle = '#11131f';
            ctx.fillRect(photoX, photoY, photoW, photoH);

            const photoImg = photoTexture?.image;
            if (photoImg && (photoImg.width || photoImg.naturalWidth)) {
                const iw = photoImg.width || photoImg.naturalWidth;
                const ih = photoImg.height || photoImg.naturalHeight;
                const imgRatio = iw / ih;
                const targetRatio = photoW / photoH;
                let sx = 0, sy = 0, sw = iw, sh = ih;
                if (imgRatio > targetRatio) {
                    sw = ih * targetRatio;
                    sx = (iw - sw) / 2;
                } else {
                    sh = iw / targetRatio;
                    sy = (ih - sh) / 4;
                }
                ctx.drawImage(photoImg, sx, sy, sw, sh, photoX, photoY, photoW, photoH);
            }
            ctx.restore();

            // Photo Frame Border
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 12;
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(photoX, photoY, photoW, photoH, 70);
            else ctx.rect(photoX, photoY, photoW, photoH);
            ctx.stroke();

            // Verified Badge Icon at bottom right of photo
            const vBadgeX = photoX + photoW - 70;
            const vBadgeY = photoY + photoH - 70;
            ctx.fillStyle = '#0284c7';
            ctx.beginPath();
            ctx.arc(vBadgeX, vBadgeY, 45, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#08090e';
            ctx.lineWidth = 10;
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 50px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('✓', vBadgeX, vBadgeY + 16);

            // 5. Identity Details
            ctx.textAlign = 'center';
            
            // Name
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 95px system-ui, sans-serif';
            ctx.fillText('Nithish Bharathwaj N', x + w / 2, y + 1950);

            // Role
            ctx.fillStyle = '#38bdf8';
            ctx.font = 'bold 60px system-ui, sans-serif';
            ctx.fillText('Cybersecurity & AI Engineer', x + w / 2, y + 2080);

            // Institution
            ctx.fillStyle = '#9ca3af';
            ctx.font = 'bold 48px monospace';
            ctx.fillText('Chennai Institute of Technology', x + w / 2, y + 2190);

            // 6. Highlight Achievement Cards Grid
            const card1X = x + 120;
            const card1Y = y + 2300;
            const card1W = 760;
            const card1H = 450;

            const card2X = x + w - 120 - card1W;
            const card2Y = card1Y;

            // Card 1: Aerothon '26
            ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(card1X, card1Y, card1W, card1H, 45);
            else ctx.rect(card1X, card1Y, card1W, card1H);
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 6;
            ctx.stroke();

            ctx.textAlign = 'center';
            ctx.fillStyle = '#f59e0b';
            ctx.font = 'bold 60px sans-serif';
            ctx.fillText('★ Aerothon \'26', card1X + card1W / 2, card1Y + 180);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 52px sans-serif';
            ctx.fillText('Top 8 Finalist', card1X + card1W / 2, card1Y + 280);
            ctx.fillStyle = '#9ca3af';
            ctx.font = '40px monospace';
            ctx.fillText('National Aerospace Hack', card1X + card1W / 2, card1Y + 360);

            // Card 2: LeetCode 1771
            ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(card2X, card2Y, card1W, card1H, 45);
            else ctx.rect(card2X, card2Y, card1W, card1H);
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 6;
            ctx.stroke();

            ctx.fillStyle = '#22d3ee';
            ctx.font = 'bold 60px sans-serif';
            ctx.fillText('</> LeetCode 1771', card2X + card1W / 2, card2Y + 180);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 52px sans-serif';
            ctx.fillText('500+ Solved', card2X + card1W / 2, card2Y + 280);
            ctx.fillStyle = '#9ca3af';
            ctx.font = '40px monospace';
            ctx.fillText('DSA & Algorithms', card2X + card1W / 2, card2Y + 360);

            // 7. Footer: Serial Number & Barcode
            const footerY = y + 2900;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(x + 100, footerY);
            ctx.lineTo(x + w - 100, footerY);
            ctx.stroke();

            ctx.textAlign = 'left';
            ctx.fillStyle = '#6b7280';
            ctx.font = 'bold 40px monospace';
            ctx.fillText('CARD SERIAL', x + 120, footerY + 100);
            ctx.fillStyle = '#e5e7eb';
            ctx.font = 'bold 55px monospace';
            ctx.fillText('NB-2026-CIT', x + 120, footerY + 180);

            // Barcode graphic
            const barX = x + w - 750;
            const barY = footerY + 60;
            const barH = 140;
            const barPattern = [12, 4, 18, 6, 8, 4, 24, 6, 10, 4, 16, 8, 6, 4, 20, 6, 12, 4];
            let currentX = barX;
            ctx.fillStyle = '#ffffff';
            barPattern.forEach((width, idx) => {
                if (idx % 2 === 0) {
                    ctx.fillRect(currentX, barY, width * 2.5, barH);
                }
                currentX += width * 2.5 + 4;
            });

            ctx.restore();
        };

        const drawIDCardBack = (x: number, y: number, w: number, h: number) => {
            ctx.save();
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(x + 20, y + 20, w - 40, h - 40, 60);
            else ctx.rect(x + 20, y + 20, w - 40, h - 40);
            ctx.clip();

            const bgGrad = ctx.createLinearGradient(x, y, x, y + h);
            bgGrad.addColorStop(0, '#0a0b12');
            bgGrad.addColorStop(1, '#030406');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(x, y, w, h);

            // Back punch hole
            ctx.fillStyle = '#000000';
            const holeW = 320, holeH = 70;
            const holeX = x + (w - holeW) / 2;
            const holeY = y + 100;
            if (ctx.roundRect) ctx.roundRect(holeX, holeY, holeW, holeH, 35);
            else ctx.rect(holeX, holeY, holeW, holeH);
            ctx.fill();

            // Large Monogram / Logo
            ctx.textAlign = 'center';
            ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
            ctx.font = 'bold 320px sans-serif';
            ctx.fillText('NB', x + w / 2, y + 1000);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 80px system-ui, sans-serif';
            ctx.fillText('Nithish Bharathwaj N', x + w / 2, y + 1400);

            ctx.fillStyle = '#9ca3af';
            ctx.font = '50px monospace';
            ctx.fillText('nithishbharathwajn@gmail.com', x + w / 2, y + 1550);
            ctx.fillText('+91 9363958388', x + w / 2, y + 1670);

            ctx.restore();
        };

        // FRONT FACE (Left Half)
        drawIDCardFront(0, 0, 1875, 4219);

        // BACK FACE (Right Half)
        drawIDCardBack(1875, 0, 1875, 4219);

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
            new THREE.CatmullRomCurve3([
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3()
            ])
    );
    const [dragged, drag] = useState<false | THREE.Vector3>(false);
    const [hovered, hover] = useState(false);

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.6]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.6]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.6]);
    useSphericalJoint(j3, card, [
        [0, 0, 0],
        [0, 1.45, 0]
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
            if (card.current) {
                ang.copy(card.current.angvel());
                rot.copy(card.current.rotation());
                card.current.setAngvel({ x: ang.x * 0.9, y: (ang.y - rot.y * 0.25) * 0.9, z: ang.z * 0.9 });
            }
        }
    });

    if (!nodes?.card?.geometry || !nodes?.clip?.geometry || !nodes?.clamp?.geometry) {
        return null;
    }

    return (
        <group position={[0, 2.2, 0]}>
            <RigidBody ref={fixed} {...segmentProps} type={'fixed' as RigidBodyProps['type']} />
            <RigidBody position={[0, -0.5, 0]} ref={j1} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
                <BallCollider args={[0.1]} />
            </RigidBody>
            <RigidBody position={[0, -1.0, 0]} ref={j2} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
                <BallCollider args={[0.1]} />
            </RigidBody>
            <RigidBody position={[0, -1.5, 0]} ref={j3} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
                <BallCollider args={[0.1]} />
            </RigidBody>
            <RigidBody
                position={[0, -2.0, 0]}
                ref={card}
                {...segmentProps}
                linearDamping={8}
                angularDamping={8}
                type={dragged ? ('kinematicPosition' as RigidBodyProps['type']) : ('dynamic' as RigidBodyProps['type'])}
            >
                <CuboidCollider args={[0.9, 1.3, 0.01]} />
                <group
                    scale={2.6}
                    position={[0, -0.4, -0.05]}
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
    );
}