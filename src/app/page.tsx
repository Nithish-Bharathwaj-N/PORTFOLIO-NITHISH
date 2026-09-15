'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from "@/hooks/useIsMobile";

import { LoadingScreen } from '@/components/layout';
import { SocialCorner } from '@/components/layout/SocialCorner';
import { DeferredMount } from '@/components/ui/DeferredMount';
import { usePreloadState } from "@/components/ui/arc-preloader-hero";

// Mobile-only — loaded only on small screens
import dynamic_mobile from 'next/dynamic';
const MobilePortfolio = dynamic_mobile(() => import('@/components/mobile/MobilePortfolio'), { ssr: false });

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Desktop-only sections (lazy loaded, never shipped to mobile)
import AboutSection from "@/components/sections/AboutSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import { HeroVisual } from "@/components/sections/HeroVisual";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";

// ─── Desktop sticky CTA ───────────────────────────────────────────────────────

const MetricCTAHijack = () => {
    return (
        <>
            <StatsSection showOnly="top" />
            <section className="relative">
                <div className="sticky top-0 z-0 overflow-hidden overflow-x-clip">
                    <StatsSection showOnly="bottom" />
                </div>
                <div className="relative z-20 bg-background dark:bg-black">
                    <div className="absolute top-0 left-0 w-full h-10 dark:shadow-[0_-50px_150px_rgba(0,0,0,0.8)] -z-10" />
                    <div className="h-[10vh]" />
                    <CTASection />
                    <div className="h-20" />
                </div>
            </section>
        </>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
    const { phase } = usePreloadState();
    const isMobile = useIsMobile();
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialLoadingExit, setIsInitialLoadingExit] = useState(false);
    const [skipAnimation, setSkipAnimation] = useState(false);

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem('portfolioLoaded');
        if (hasLoaded) {
            setSkipAnimation(true);
            setIsLoading(false);
        }

        // Only run GSAP layout tracking on desktop
        if (isMobile) return;
        if (typeof window === 'undefined' || !('ResizeObserver' in window)) return;

        const refreshLayout = () => {
            window.dispatchEvent(new Event('resize'));
            ScrollTrigger.refresh();
        };
        const resizeObserver = new ResizeObserver(() => { refreshLayout(); });
        resizeObserver.observe(document.body);
        window.addEventListener('load', refreshLayout);
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('load', refreshLayout);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [isMobile]);

    const isReadyToAnimate = isLoading ? isInitialLoadingExit : (phase === "reveal" || phase === "done");

    useEffect(() => {
        if (isReadyToAnimate && !isMobile) {
            const timer = setTimeout(() => { ScrollTrigger.refresh(); }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isReadyToAnimate, isMobile]);

    const handleLoadingComplete = () => {
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
        sessionStorage.setItem('portfolioLoaded', 'true');
        if (!isMobile) setTimeout(() => { ScrollTrigger.refresh(); }, 100);
    };

    const handleExitStart = () => {
        setIsInitialLoadingExit(true);
    };

    // ── Mobile: render dedicated mobile site ──────────────────────────────────
    if (isMobile) {
        return <MobilePortfolio />;
    }

    // ── Desktop: render full animated experience ──────────────────────────────
    return (
        <>
            {isLoading && <LoadingScreen onComplete={handleLoadingComplete} onExitStart={handleExitStart} duration={2500} />}
            <motion.main
                initial={skipAnimation ? false : { opacity: 0, y: 40 }}
                animate={skipAnimation ? { opacity: 1, y: 0 } : (isReadyToAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 })}
                transition={{
                    duration: skipAnimation ? 0 : 1.4,
                    ease: skipAnimation ? "linear" : [0.16, 1, 0.3, 1],
                    opacity: { duration: skipAnimation ? 0 : 0.8 }
                }}
                className="relative overflow-x-clip will-change-transform will-change-opacity"
            >
                <HeroVisual isExiting={isReadyToAnimate} />

                <DeferredMount>
                    <ExpertiseSection />
                    <AboutSection />
                    <MetricCTAHijack />
                    <SocialCorner className="fixed bottom-4 right-4 md:bottom-12 md:right-12 z-[30]" />
                </DeferredMount>
            </motion.main>
        </>
    );
}
