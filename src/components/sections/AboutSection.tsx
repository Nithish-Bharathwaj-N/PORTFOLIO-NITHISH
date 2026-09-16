"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { WarpBackground } from "@/components/ui/warp-background";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import ImageTrail from "@/components/ImageTrail";
import Image from "next/image";
import InfiniteMenu from "@/components/InfiniteMenu";
import { portfolioData } from "@/data/portfolio";
import { BeamDivider } from "@/components/ui/BeamDivider";
import ScrollReveal from "@/components/ScrollReveal";
import { Github, Linkedin, Instagram, MessageSquare, ArrowRight, ArrowUpRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useCountUp } from "@/hooks/useCountUp";
import { SocialCorner } from "@/components/layout/SocialCorner";
import { cn } from "@/lib/utils";

import Testimonial1 from "@/components/ui/testimonial-1";
import { IdentitySequence } from "./IdentitySequence";
import ScrollAdventure from "@/components/ui/animated-scroll";
import Bucket from "@/components/ui/bucket";
import { ArgentLoopInfiniteSlider } from "@/components/ui/argent-loop-infinite-slider";
import { HorizontalTimeline } from "@/components/ui/horizontal-timeline";
import { CertificateShowcase } from "@/components/ui/certificate-marquee";
import { GitHubShowcase } from "@/components/ui/github-showcase";
import { LeetCodeShowcase } from "@/components/ui/leetcode-showcase";

import { ShowcaseStack } from "@/components/ui/showcase-stack";

const showcaseMembers = [
    // 1. Chennai Institute of Technology — Education (Start of journey)
    {
        id: 'edu-cit',
        name: 'Chennai Institute of Technology',
        role: 'B.E. CSE — Cybersecurity Specialization',
        description: 'Pursuing B.E. Computer Science & Engineering with a Cybersecurity specialisation. CGPA: 8.48/10. Core focus: network security, ethical hacking, cryptography, AI engineering, and full-stack development. Active participant in 15+ hackathons with 5+ national finalist appearances.',
        period: 'August 2025 – 2029',
        image: '/images/timeline-cit-college.png',
        social: { website: '/experience' }
    },
    // 2. AWS Academy Internship
    {
        id: 'exp-aws',
        name: 'AWS Academy × AICTE × EduSkills',
        role: 'Generative AI Virtual Intern',
        description: 'Completed an intensive 10-week virtual internship on Generative AI architectures, Foundation Models, Large Language Models (LLMs), Prompt Engineering, and AWS Cloud AI infrastructure. Earned official certification from AICTE × EduSkills.',
        period: 'October – December 2025',
        image: '/images/timeline-aws-internship.png',
        social: { website: '/experience' }
    },
    // 3. SubAERO — Aerothon 2026
    {
        id: 'proj-subaero',
        name: 'SubAERO — Aerothon 2026',
        role: 'Lead Full-Stack & 3D WebGL Developer',
        description: 'Top 8 National Finalist at Aerothon 2026 (HAL & IIT Indore). Built an aerospace-grade 3D Digital Twin for HAL Tejas turbojet engines using Three.js, Blender, and FastAPI. Integrated multi-target ML regression models achieving 98.7–99.9% R² accuracy for Remaining Useful Life (RUL) prediction.',
        period: 'May – August 2026',
        image: '/images/subaero-preview.jpg',
        social: { website: 'https://null-pointers-aerothon-2026.vercel.app/' }
    },
    // 4. Securox — Cybersecurity Platform
    {
        id: 'proj-securox',
        name: 'Securox — Cyber Intelligence Platform',
        role: 'Cybersecurity Engineer & Full-Stack Developer',
        description: 'Independently architecting an autonomous cyber risk intelligence and attack surface monitoring platform. Features real-time threat detection, automated vulnerability assessment dashboards, and AI-powered risk scoring — built with React, Node.js, and cybersecurity tooling.',
        period: 'March – September 2026',
        image: '/images/timeline-securox.png',
        social: { website: 'https://github.com/Nithish-Bharathwaj-N/Securox' }
    },
    // 5. Competitive Programming
    {
        id: 'cp-leetcode',
        name: 'Competitive Programming',
        role: 'LeetCode — Rating 1788 · 551 Problems',
        description: 'Achieved a peak LeetCode contest rating of 1791 with 551 problems solved across Data Structures, Algorithms, Dynamic Programming, and Graph Theory. Maintained a 118-day continuous coding streak. Ranked #171557 globally. Actively competing in weekly and biweekly contests.',
        period: 'January 2025 – Present',
        image: '/images/timeline-leetcode-cp.png',
        social: { website: 'https://leetcode.com/u/nithish_cit/' }
    },
    // 6. View more
    {
        id: 'view-more',
        name: 'View more',
        role: 'Explore all experiences',
        image: '/images/nithish-photo.jpg',
        social: { website: '/experience' }
    }
];

const GALLERY_IMAGES = [
    "/images/nithish-photo.jpg",
    "/images/nithish-about.jpg",
    "/images/subaero-preview.jpg",
    "/images/voyage-preview.jpg",
    "/images/queuecure-preview.jpg",
];

const AboutLeadInImageStack = () => {
    const [randomData, setRandomData] = useState<{ src: string, rotate: number, x: number, y: number }[]>([]);
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) return;
        const shuffled = [...GALLERY_IMAGES].sort(() => 0.5 - Math.random()).slice(0, 2);
        const data = shuffled.map((src, i) => {
            const offsetMultiplier = i === 0 ? -1 : 1;
            return {
                src,
                rotate: Math.round(offsetMultiplier * 15 + (Math.random() * 8 - 4)),
                x: Math.round(offsetMultiplier * 25 + (Math.random() * 10 - 5)),
                y: Math.round(Math.random() * 10 - 5),
            };
        });
        setRandomData(data);
    }, [mounted]);

    if (!mounted || randomData.length === 0) return null;

    return (
        <div className="relative flex items-center justify-center w-full max-w-[14rem] h-28 md:w-72 md:h-44 mb-8 lg:mb-10 overflow-visible">
            {randomData.map((item, i) => (
                <div
                    key={item.src}
                    className="absolute w-20 h-24 md:w-32 md:h-40 rounded-xl overflow-hidden overflow-x-clip border-[4px] border-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] bg-white"
                    style={{
                        zIndex: i === 1 ? 20 : 10,
                        transform: `translate(${item.x}px, ${item.y}px) rotate(${item.rotate}deg)`,
                    }}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={item.src}
                            alt="Gallery Piece"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100px, 120px"
                            priority={i === 1}
                        />
                        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- Utility: Slide Reveal (Smooth & Cinematic) ---
const SlideReveal = ({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95, y }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
            duration: 0.8,
            delay,
            ease: [0.16, 1, 0.3, 1],
            scale: { duration: 1, ease: [0.16, 1, 0.3, 1] }
        }}
    >
        {children}
    </motion.div>
);

// --- Component 1: Editorial Lead-in ---
const AboutLeadIn = () => {
    const t = useTranslations('about');

    return (
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-6 py-2 flex justify-center items-center">
            {/* The Reference Card Container (Gambar 1 Style with Dark/Light Support) */}
            <motion.div
                initial="hidden"
                whileInView="show"
                whileHover="hover"
                viewport={{ once: true, amount: 0.05 }}
                variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.96 },
                    show: { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1, 
                        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
                    }
                }}
                className="relative w-full bg-white dark:bg-black border border-red-600/20 dark:border-red-600/40 p-6 md:p-10 lg:p-12 overflow-hidden overflow-x-clip shadow-xl dark:shadow-2xl transition-colors duration-500 group"
            >

                {/* 1. Grid Background Overlay (Dynamic Colors) */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle,_#00000008_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_#ffffff08_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none transition-opacity" />

                {/* 2. Red Corner Tabs */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-red-600 -translate-x-1 translate-y-[-50%] z-10" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 translate-x-1 translate-y-[-50%] z-10" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-red-600 -translate-x-1 translate-y-[50%] z-10" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red-600 translate-x-1 translate-y-[50%] z-10" />

                {/* 3. Glare Sweep Effect (Premium Hover Shine via Framer Motion) */}
                <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden overflow-x-clip">
                    <motion.div
                        variants={{
                            hidden: { left: "-150%" },
                            show: { left: "-150%" },
                            hover: { left: "150%" }
                        }}
                        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute inset-y-0 w-[200%] md:w-[75%] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent skew-x-[-25deg]"
                    />
                </div>

                {/* 4. Content Layer */}
                <div className="relative z-10">
                    {/* Top Tagline */}
                    <div className="flex justify-between items-start mb-6 md:mb-10">
                        <span className="text-red-600 dark:text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">{t('leadIn.tagline')}</span>
                        <span className="text-zinc-400 dark:text-zinc-600 text-[9px] font-mono tracking-widest uppercase hidden md:block">{t('leadIn.role')}</span>
                    </div>

                    {/* Massive Typography - Quote Style */}
                    <div className="mb-8 md:mb-14 relative cursor-default">
                        {/* Original Text with glow */}
                        <h2 className="text-[28px] sm:text-[48px] md:text-[64px] lg:text-[76px] xl:text-[88px] font-bold tracking-tight leading-[0.92] text-zinc-900 dark:text-white transition-all duration-700 group-hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            <span className="text-zinc-300 dark:text-zinc-700 mr-2 transition-colors duration-700 group-hover:text-zinc-400 dark:group-hover:text-zinc-500">"</span>
                            {t('leadIn.headlineAI')} <span className="text-zinc-400 dark:text-zinc-500 font-medium transition-colors duration-700 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">{t('leadIn.headlineData')}</span> <br className="hidden md:block" />
                            <span className="font-serif italic font-normal text-zinc-900 dark:text-white lowercase opacity-90 transition-opacity duration-700 group-hover:opacity-100">{t('leadIn.headlineSoftware')}</span>
                            <span className="text-zinc-300 dark:text-zinc-700 ml-1 transition-colors duration-700 group-hover:text-zinc-400 dark:group-hover:text-zinc-500">."</span>
                        </h2>
                    </div>

                    {/* Detail Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-t border-zinc-100 dark:border-zinc-900 pt-8 md:pt-12">
                        {/* Left narrative */}
                        <div className="md:col-span-5">
                            <p
                                className="text-base md:text-lg lg:text-xl font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed tracking-tight"
                                dangerouslySetInnerHTML={{ __html: t.raw('leadIn.thesis') }}
                            />
                        </div>

                        {/* Right columns */}
                        <div className="md:col-span-7 flex flex-col sm:flex-row gap-8 text-xs sm:text-[13px]">
                            <div className="flex-1 space-y-3">
                                <span className="text-zinc-800 dark:text-zinc-200 font-bold uppercase tracking-widest block border-b border-zinc-100 dark:border-zinc-900 pb-3">Scope & Platform</span>
                                <p className="text-zinc-500 leading-relaxed">
                                    {t('leadIn.scope')}
                                </p>
                                <p className="text-red-600/80 dark:text-red-500/70 font-medium italic">
                                    {t('leadIn.bridging')}
                                </p>
                            </div>
                            <div className="flex-1 space-y-3 flex flex-col">
                                <span className="text-zinc-800 dark:text-zinc-200 font-bold uppercase tracking-widest block border-b border-zinc-100 dark:border-zinc-900 pb-3">Integration</span>
                                <p className="text-zinc-500 leading-relaxed">
                                    {t('leadIn.integration')}
                                </p>
                                <div className="mt-6 md:mt-auto pt-4">
                                    <span className="text-3xl lg:text-4xl font-signature text-zinc-900 dark:text-white/90">{t('leadIn.signature')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// --- Tech Stack Logos (from portfolio.ts project data) ---
const TECH_LOGOS = [
    { name: "Python", slug: "python" },
    { name: "TypeScript", slug: "typescript" },
    { name: "C++", slug: "cplusplus" },
    { name: "React", slug: "react" },
    { name: "Next.js", slug: "nextdotjs" },
    { name: "Three.js", slug: "threedotjs" },
    { name: "FastAPI", slug: "fastapi" },
    { name: "Node.js", slug: "nodedotjs" },
    { name: "Docker", slug: "docker" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "MySQL", slug: "mysql" },
    { name: "Tailwind CSS", slug: "tailwindcss" },
    { name: "Git", slug: "git" },
    { name: "Vercel", slug: "vercel" },
    { name: "Scikit-Learn", slug: "scikitlearn" },
];

// --- Component 2: Core Engineering Panel ---
// --- Component 1: Core Engineering Panel (Stats) ---
const CoreEngineeringPanel = ({ scrollYProgress }: { scrollYProgress: any }) => {
    // Panel 1 exits between 0.45 and 0.65
    const opacity = useTransform(scrollYProgress, [0.45, 0.6], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.45, 0.6], [1, 0.9]);
    const blur = useTransform(scrollYProgress, [0.45, 0.6], [0, 10]);

    return (
        <div className="w-screen h-full flex items-center justify-center bg-background transition-colors duration-500 overflow-hidden overflow-x-clip">
            <motion.div
                style={{
                    opacity,
                    scale,
                    filter: `blur(${blur}px)`,
                    willChange: "transform, opacity, filter",
                }}
                className="w-full h-full flex items-center justify-center"
            >
                <Testimonial1 />
            </motion.div>
        </div>
    );
};

// EmergingResearchPanel removed as per user request


// --- Component 3: Profile Intersection ---
// Optimized ProfilePanel (Restored to Original Design with Cinematic Transitions)
// ProfilePanel removed and replaced by IdentitySequence component


// --- Unified Typography-Focused Card for Bitwise Symmetry ---
const ClosingCard = ({ title, subtitle, desc, index, direction }: { title: string, subtitle: string, desc: string, index: number, direction: 'left' | 'right' }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`group relative min-h-[30vh] md:min-h-[50vh] flex flex-col justify-center ${direction === 'right' ? 'items-end text-right' : 'items-start text-left'}`}
    >
        <div className={`flex flex-col gap-6 relative z-10 w-full px-4 ${direction === 'right' ? 'items-end' : 'items-start'}`}>
            {/* Minimalist Index & Role Indicator */}
            <div className={`flex items-center gap-6 w-full ${direction === 'left' ? 'flex-row-reverse' : ''}`}>
                <span className="text-xl md:text-2xl font-serif-elegant italic text-muted-foreground/30 group-hover:text-primary transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <div className="h-px bg-foreground/10 flex-1 group-hover:bg-primary/30 transition-colors duration-500" />
                <span className="text-[11px] md:text-[13px] font-mono uppercase tracking-[0.3em] text-primary/80 font-semibold group-hover:tracking-[0.4em] transition-all duration-700">
                    {subtitle}
                </span>
            </div>

            {/* Title with subtle hover shift */}
            <h4 className={`text-4xl md:text-5xl lg:text-[64px] font-black text-foreground tracking-tighter leading-[1.1] transition-all duration-500 ${direction === 'right' ? 'group-hover:pr-4 origin-right' : 'group-hover:pl-4 origin-left'}`}>
                {title}
            </h4>

            {/* Description fading in slightly on hover */}
            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-muted-foreground/60 leading-relaxed max-w-[85%] font-medium mt-4 group-hover:text-foreground/90 transition-colors duration-500 line-clamp-3">
                {desc}
            </p>
        </div>
    </motion.div>
);

const ViewMoreCard = ({ href, title }: { href: string, title: string }) => {
    const t = useTranslations('about');
    return (
        <Link href={href} className="group block min-h-[30vh] md:min-h-[50vh] flex flex-col justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative flex flex-col items-center justify-center gap-10"
            >
                {/* Minimalist circular arrow */}
                <div className="w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-700 ease-out">
                    <ArrowRight className="w-10 h-10 text-primary group-hover:text-primary-foreground group-hover:translate-x-2 transition-all duration-500" />
                </div>

                <div className="text-center space-y-4">
                    <p className="text-[12px] md:text-[14px] font-mono uppercase tracking-[0.4em] text-muted-foreground group-hover:text-primary transition-colors">{t('closing.discoverMore')}</p>
                    <h4 className="text-4xl lg:text-5xl font-black text-foreground/80 group-hover:text-foreground transition-all">{title}</h4>
                </div>
            </motion.div>
        </Link>
    );
};

const GhostedHeader = ({ label, part1, part2, direction = "left" }: { label: string, part1: string, part2: string, direction?: "left" | "right" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`space-y-3 mb-16 h-32 flex flex-col justify-end ${direction === 'right' ? 'items-end text-right' : 'items-start text-left'}`}
    >
        <div className={`flex items-center gap-4 ${direction === 'right' ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-px bg-primary/50" />
            <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.3em] text-primary/80 font-bold">
                {label}
            </span>
        </div>
        <h3 className={`text-4xl md:text-5xl lg:text-5xl xl:text-[54px] font-black uppercase tracking-tighter leading-none flex items-center gap-x-3 gap-y-1 ${direction === 'right' ? 'flex-row-reverse flex-wrap-reverse justify-start' : 'flex-wrap'}`}>
            <span className="text-foreground drop-shadow-sm">{part1}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground/20 to-transparent dark:from-white/20 dark:to-transparent">{part2}</span>
        </h3>
    </motion.div>
);




// --- Component 5: Audit Funnel ---
const AuditFunnel = () => {
    const isMobile = useIsMobile();
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    const t = useTranslations('about');
    const tCommon = useTranslations('common');

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);
    const lineScaleY = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);

    // Exit parallax to transition smoothly into the next section
    const { scrollYProgress: exitProgressRaw } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });
    const exitProgress = useSpring(exitProgressRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const yExit = useTransform(exitProgress, [0, 1], ["0%", "40%"]);
    const scaleExit = useTransform(exitProgress, [0, 1], [1, 0.85]);
    const opacityExit = useTransform(exitProgress, [0, 1], [1, 0]);

    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const galleryItems = [
            "/feature/icons/image1.webp",
            "/feature/icons/image2.webp",
            "/feature/icons/image3.webp",
            "/feature/icons/image4.webp",
            "/feature/icons/image5.webp",
            "/feature/icons/image6.webp",
            "/feature/icons/image7.webp",
            "/feature/icons/image8.webp"
        ];
        // Shuffle and pick 8 random images for the trail to avoid overwhelming the DOM
        const shuffled = [...galleryItems].sort(() => 0.5 - Math.random());
        setImages(shuffled.slice(0, 8));
    }, []);

    return (
        <div ref={sectionRef} className="relative overflow-visible group min-h-[60vh] md:min-h-[120vh] flex items-center justify-center bg-background z-10 pb-10 md:pb-32">
            <div className="flex flex-col items-center text-center py-12 md:py-40 space-y-12 md:space-y-16 pointer-events-none w-full origin-top">
                <motion.div
                    style={{ y: yExit, scale: scaleExit, opacity: opacityExit }}
                    className="space-y-6 md:space-y-10 flex flex-col items-center px-6 relative z-10 mix-blend-difference w-full"
                >
                    <motion.h4
                        style={{ scale, willChange: "transform" }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] font-black tracking-tighter text-white max-w-7xl leading-[0.9] lg:px-6 uppercase text-center"
                    >
                        {t('architecting')} <br></br>
                        <motion.span
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-white italic font-serif-elegant font-light lowercase tracking-normal"
                        >
                            {t('digitalReality')}
                        </motion.span>.
                    </motion.h4>
                </motion.div>

                <motion.div
                    style={{ y: yExit, scale: scaleExit, opacity: opacityExit }}
                    className="flex flex-col items-center gap-8 pt-12 pointer-events-auto w-full px-6"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="w-full max-w-4xl mx-auto"
                    >
                        <Bucket trailImages={!isMobile ? images : undefined} />
                    </motion.div>
                </motion.div>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
                <div className="absolute inset-0 bg-[url('/noise.svg')]" />
            </div>
        </div>
    );
};



const ScrollHijackSection = () => {
    const isMobile = useIsMobile();
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.5 });
    const [isComp2Visible, setIsComp2Visible] = React.useState(false);
    const [showBorder, setShowBorder] = React.useState(true);

    const borderOpacity = useTransform(smoothProgress, [0.1, 0.15], [1, 0]);
    const xShift = useTransform(smoothProgress, [0, 0.1, 0.4, 1], ["0vw", "0vw", "-100vw", "-100vw"]);

    useMotionValueEvent(smoothProgress, "change", (v: any) => {
        if (v >= 0.20 && showBorder) setShowBorder(false);
        if (v < 0.15 && !showBorder) setShowBorder(true);
        if (v >= 0.30 && !isComp2Visible) setIsComp2Visible(true);
        if (v < 0.25 && isComp2Visible) setIsComp2Visible(false);
    });

    const { scrollYProgress: exitProgressRaw } = useScroll({
        target: sectionRef,
        offset: ["end end", "end start"]
    });
    const exitProgress = useSpring(exitProgressRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const exitScale = useTransform(exitProgress, [0, 1], [1, 0.85]);
    const exitOpacity = useTransform(exitProgress, [0, 1], [1, 0]);
    const exitBorderRadius = useTransform(exitProgress, [0, 1], ["0px", "40px"]);

    // ── Mobile: skip sticky scroll hijack, render stacked panels ──
    if (isMobile) {
        return (
            <div className="flex flex-col w-full">
                <div className="w-full overflow-hidden">
                    <CoreEngineeringPanel scrollYProgress={smoothProgress} />
                </div>
                <div className="w-full overflow-hidden">
                    <IdentitySequence isVisible={true} scrollYProgress={smoothProgress} />
                </div>
            </div>
        );
    }

    // ── Desktop: original sticky scroll hijack ──
    return (
        <div ref={sectionRef} className="relative h-[600vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden overflow-x-clip z-10">
                <motion.div
                    style={{ scale: exitScale, opacity: exitOpacity, borderRadius: exitBorderRadius }}
                    className="w-full h-full relative origin-center"
                >
                    <AnimatePresence>
                        {showBorder && (
                            <motion.div
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                                style={{
                                    opacity: borderOpacity,
                                    maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
                                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)'
                                }}
                                className="absolute top-0 left-0 right-0 h-48 border-t-2 border-x-2 border-neutral-200 dark:border-zinc-800 rounded-t-[50px] md:rounded-t-[80px] pointer-events-none z-[100]"
                            />
                        )}
                    </AnimatePresence>
                    <motion.div
                        className="flex h-full"
                        style={{ width: "200vw", x: xShift }}
                    >
                        <div className="h-full w-screen flex-shrink-0">
                            <CoreEngineeringPanel scrollYProgress={smoothProgress} />
                        </div>
                        <div className="h-full w-screen flex-shrink-0">
                            <IdentitySequence isVisible={isComp2Visible} scrollYProgress={smoothProgress} />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default function AboutSection() {
    const isMobile = useIsMobile();
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.12], [1, 0.92]);
    const opacity = useTransform(scrollYProgress, [0.03, 0.12], [1, 0]);
    const yLeadIn = useTransform(scrollYProgress, [0, 0.12], [0, -80]);

    const leadInTriggerRef = useRef(null);

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative bg-background text-foreground dark:bg-black dark:text-white transition-colors duration-500"
        >
            {/* 1. Lead-in — sticky on desktop, static on mobile */}
            {isMobile ? (
                <div className="w-full flex items-center justify-center py-10 overflow-hidden">
                    <div className="relative px-4 w-full max-w-[1700px] mx-auto">
                        <AboutLeadIn />
                    </div>
                </div>
            ) : (
                <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start z-0 overflow-hidden overflow-x-clip pointer-events-none pt-28 md:pt-32 lg:pt-36 pb-4">
                    <motion.div
                        style={{ scale, opacity, y: yLeadIn }}
                        className="relative px-4 md:px-6 w-full max-w-[1700px] mx-auto"
                        ref={leadInTriggerRef}
                    >
                        <AboutLeadIn />
                    </motion.div>
                </div>
            )}

            {/* 2. OVERLAY LAYER - Hijack Zone & Footer */}
            <div className="relative pointer-events-none mt-0 md:mt-[20vh]">
                {/* Content wrapper with background - rounded corners removed to allow animated border to control the shape */}
                <div className="bg-background dark:bg-black transition-colors duration-500 pointer-events-auto relative">

                    <ScrollHijackSection />
                    <ScrollAdventure />
                    <ArgentLoopInfiniteSlider />
                    {/* On desktop the slider leaves dead space so we pull up with -mt-[50vh]; on mobile just normal flow */}
                    <div className={`flex flex-col items-center w-full bg-background relative z-20 pt-8 md:pt-32 pb-16 md:pb-32 ${isMobile ? '' : '-mt-[50vh]'}`}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full flex flex-col items-center max-w-[1700px] px-4 md:px-6"
                        >
                            <div className="mb-6 md:mb-10 text-center space-y-4">
                            </div>
                            <div className="w-full pb-0">
                                <HorizontalTimeline data={showcaseMembers.map((member) => ({
                                    title: member.id === 'view-more' ? 'Explore all experiences' : (member.role || member.name),
                                    isEnd: member.id === 'view-more',
                                    period: 'period' in member ? member.period : undefined,
                                    content: member.id === 'view-more' ? (
                                        <Link
                                            href={member.social?.website || '/experience'}
                                            className="relative flex items-center h-[100px] md:h-[140px] w-[min(85vw,250px)] z-30"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="p-4 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                                                    <ArrowUpRight className="w-8 h-8 text-neutral-600 dark:text-neutral-400 transition-all duration-500 group-hover:text-primary-foreground group-hover:rotate-45 group-hover:scale-110" />
                                                </div>
                                                <span className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap drop-shadow-sm">
                                                    View more
                                                </span>
                                            </div>
                                        </Link>
                                    ) : (
                                        <div className="flex flex-col gap-4 w-[min(85vw,400px)] border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md shadow-xl mt-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-row items-center justify-between">
                                                    <h4 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight">
                                                        {member.name}
                                                    </h4>
                                                </div>
                                            </div>

                                            {'description' in member && member.description && (
                                                <p className="text-sm font-normal text-neutral-600 dark:text-neutral-400 leading-relaxed mt-1 line-clamp-3" title={member.description}>
                                                    {member.description}
                                                </p>
                                            )}

                                            <div className="w-full mt-4 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden overflow-x-clip relative group/card h-32">
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover opacity-90 group-hover/card:opacity-100 transition-opacity duration-500 group-hover/card:scale-105"
                                                />
                                                {member.social?.website && (
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                                                        <Link href={member.social.website} target="_blank" className="px-5 py-2.5 bg-white text-black text-xs font-bold rounded-full hover:scale-105 transition-transform">
                                                            View Details
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                }))} />
                            </div>
                        </motion.div>

                        {/* Certificate Showcase Section */}
                        <div className="w-full mt-8 md:mt-12">
                            <CertificateShowcase />
                        </div>

                        {/* Sequential Showcases — no stacking to avoid overlap */}
                        <div className="w-full flex flex-col gap-0">
                            <div className="w-full">
                                <GitHubShowcase />
                            </div>
                            <div className="w-full border-t border-white/5">
                                <LeetCodeShowcase />
                            </div>
                        </div>
                    </div>
                    <AuditFunnel />
                </div>
            </div>
        </section >
    );
};

