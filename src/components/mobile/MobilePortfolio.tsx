'use client';

/**
 * MobilePortfolio.tsx
 *
 * Renders the EXACT SAME components as the desktop experience but skips:
 * - The heavy LoadingScreen / arc preloader
 * - Desktop-only GSAP ScrollTrigger bootstrap loops
 * Each component already has its own isMobile branch for proper layout.
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

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function MobilePortfolio() {
    useEffect(() => {
        // Single lightweight refresh — no ResizeObserver loop
        const t = setTimeout(() => ScrollTrigger.refresh(), 600);
        return () => {
            clearTimeout(t);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-x-clip bg-background"
        >
            {/* Hero — has its own isMobile branch (photo + stacked headings + badges) */}
            <HeroVisual isExiting={true} />

            {/* Expertise nav shortcuts grid */}
            <ExpertiseSection />

            {/* About — isMobile branch skips scroll-hijack, renders stacked panels */}
            <AboutSection />

            {/* Stats — isMobile branch shows 1 book, mobile carousel */}
            <StatsSection />

            {/* CTA — ribbons + contact links */}
            <CTASection />
        </motion.main>
    );
}
