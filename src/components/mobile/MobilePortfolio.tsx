'use client';

/**
 * MobilePortfolio.tsx
 *
 * This is NOT a separate website — it renders the EXACT SAME components as the
 * desktop experience (HeroVisual, AboutSection, StatsSection, CTASection, etc.)
 * but skips the heavy loading screen, arc preloader, and GSAP ScrollTrigger
 * bootstrap that cause freezes on mobile.
 *
 * Each component already has its own isMobile branch inside it. This wrapper
 * just provides the same <main> shell the desktop page does, without the
 * desktop-only orchestration code.
 */

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { HeroVisual } from '@/components/sections/HeroVisual';
import ExpertiseSection from '@/components/sections/ExpertiseSection';
import AboutSection from '@/components/sections/AboutSection';
import StatsSection from '@/components/sections/StatsSection';
import CTASection from '@/components/sections/CTASection';
import { SocialCorner } from '@/components/layout/SocialCorner';
import { DeferredMount } from '@/components/ui/DeferredMount';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function MobilePortfolio() {
    useEffect(() => {
        // Single lightweight refresh after mount — no ResizeObserver loop
        const t = setTimeout(() => ScrollTrigger.refresh(), 800);
        return () => {
            clearTimeout(t);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-x-clip"
        >
            {/* Hero — has its own isMobile branch inside */}
            <HeroVisual isExiting={true} />

            <DeferredMount>
                {/* Expertise nav grid */}
                <ExpertiseSection />

                {/* About — has its own mobile-safe stacked layout inside */}
                <AboutSection />

                {/* Stats counter + book carousel (1-up on mobile) */}
                <section className="relative">
                    <StatsSection showOnly="top" />
                    <div className="sticky top-0 z-0 overflow-hidden overflow-x-clip">
                        <StatsSection showOnly="bottom" />
                    </div>
                    <div className="relative z-20 bg-background dark:bg-black">
                        <div className="h-[5vh]" />
                        <CTASection />
                        <div className="h-10" />
                    </div>
                </section>

                {/* Floating social corner */}
                <SocialCorner className="fixed bottom-20 right-4 z-[30]" />
            </DeferredMount>
        </motion.main>
    );
}
