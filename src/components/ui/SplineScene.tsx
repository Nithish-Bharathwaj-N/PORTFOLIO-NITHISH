'use client';

import { useRef, useState, useEffect, type FC } from "react";
import { usePerformance } from "@/hooks/usePerformance";
import Spline from '@splinetool/react-spline';

interface SplineSceneProps {
    scene: string;
    className?: string;
}

export const SplineScene: FC<SplineSceneProps> = ({ scene, className }) => {
    const isMounted = useRef(true);
    const { isLowPowerMode } = usePerformance();
    const [isSceneLoaded, setIsSceneLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const splineApp = useRef<any>(null);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    // Intersection Observer to pause/play the heavy WebGL engine when out of view
    useEffect(() => {
        if (isLowPowerMode || !containerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isIntersecting = entry.isIntersecting;
                setIsVisible(isIntersecting);

                if (splineApp.current) {
                    try {
                        if (isIntersecting) {
                            // Resume WebGL rendering
                            splineApp.current.play();
                        } else {
                            // Pause WebGL rendering to save GPU and battery
                            splineApp.current.stop();
                        }
                    } catch (e) {
                        // Silently fallback if methods don't exist in this version
                    }
                }
            },
            { rootMargin: "200px" } // Trigger slightly before it enters viewport
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [isLowPowerMode]);

    // Fallback timer just in case onLoad fails or takes longer
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (isMounted.current && !isSceneLoaded) {
                setIsSceneLoaded(true);
            }
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, [isSceneLoaded]);

    return (
        <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className || ''}`}>
            {/* Global style to hide the react-spline watermark (not in shadow DOM) */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .spline-watermark,
                div[style*="bottom: 16px"],
                div[style*="bottom: 10px"],
                a[href*="spline.design"] {
                    display: none !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                    visibility: hidden !important;
                }
            `}} />

            <div className="w-full h-full relative flex items-center justify-center">

                {/* Custom Cinematic Cyber Orb Fallback / Loading State */}
                {!isSceneLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                        <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 via-cyan-500/20 to-purple-500/30 blur-3xl animate-pulse" />
                            <div className="w-32 h-32 rounded-full border border-primary/40 bg-primary/5 backdrop-blur-md flex items-center justify-center animate-spin-slow shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                                <div className="w-20 h-20 rounded-full border border-dashed border-cyan-400/60" />
                            </div>
                        </div>
                    </div>
                )}

                <div
                    className="w-full h-full transition-opacity duration-1000"
                    style={{
                        opacity: isSceneLoaded ? 1 : 0.8,
                        visibility: isVisible ? 'visible' : 'hidden'
                    }}
                >
                    <Spline
                        scene={scene}
                        onLoad={(app) => {
                            splineApp.current = app;
                            if (isMounted.current) setIsSceneLoaded(true);
                        }}
                        onError={() => {
                            if (isMounted.current) setIsSceneLoaded(true);
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            transform: 'scale(1.1)',
                            transformOrigin: 'center center'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
