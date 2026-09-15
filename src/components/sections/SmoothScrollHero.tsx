'use client';

import {
    motion,
    useMotionTemplate,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePerformance } from "@/hooks/usePerformance";

export const SmoothScrollHero = () => {
    const { isLowPowerMode } = usePerformance();

    return (
        <div className="bg-background text-zinc-900 dark:text-zinc-50 relative z-0">
            {/* Mobile Layout: Responsive, zero empty scroll void */}
            <div className="block md:hidden pt-28 pb-8 px-4 w-full relative z-10">
                <div className="relative w-full max-w-lg mx-auto bg-white/50 dark:bg-black/40 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-black/10 dark:border-white/10 flex flex-col items-center text-center shadow-xl">
                    <div className="absolute inset-0 bg-primary/5 rounded-3xl pointer-events-none" />
                    
                    <h1 className="text-4xl sm:text-6xl font-black text-foreground dark:text-white tracking-tight leading-none uppercase mb-4">
                        EXPERIENCE
                    </h1>

                    <p className="text-xs sm:text-sm font-semibold text-foreground/60 dark:text-white/60 tracking-wider uppercase leading-relaxed max-w-sm">
                        Merging technical precision with creative vision. A curated timeline of my professional journey, from foundational code to AI solutions.
                    </p>
                </div>

                {/* Mobile Preview Grid of Key Projects */}
                <div className="grid grid-cols-2 gap-3 mt-6 max-w-lg mx-auto">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-md group">
                        <Image src="/images/subaero-preview.jpg" alt="SubAERO 3D Engine" fill className="object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                            <span className="text-[10px] font-mono font-bold text-white uppercase">SubAERO 3D</span>
                        </div>
                    </div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-md group">
                        <Image src="/images/timeline-securox.png" alt="Securox Cyber Platform" fill className="object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                            <span className="text-[10px] font-mono font-bold text-white uppercase">Securox Platform</span>
                        </div>
                    </div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-md group">
                        <Image src="/images/timeline-aws-internship.png" alt="AWS GenAI Internship" fill className="object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                            <span className="text-[10px] font-mono font-bold text-white uppercase">AWS GenAI</span>
                        </div>
                    </div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-md group">
                        <Image src="/images/timeline-cit-college.png" alt="Chennai Institute of Technology" fill className="object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                            <span className="text-[10px] font-mono font-bold text-white uppercase">CIT Campus</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Layout: Pinned parallax scroll */}
            <div className="hidden md:block">
                <Hero isLowPowerMode={isLowPowerMode} />
            </div>
        </div>
    );
};

const SECTION_HEIGHT = 1000;

const Hero = ({ isLowPowerMode }: { isLowPowerMode: boolean }) => {
    const { scrollY } = useScroll();

    const smoothScrollY = useSpring(scrollY, isLowPowerMode ? {
        stiffness: 50,
        damping: 30
    } : {
        mass: 0.1,
        stiffness: 100,
        damping: 20
    });

    return (
        <div
            style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
            className="relative w-full"
        >
            <CenterImage scrollY={smoothScrollY} />

            <ParallaxImages scrollY={smoothScrollY} />

            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-background z-20 pointer-events-none" />
        </div>
    );
};

const CenterImage = ({ scrollY }: { scrollY: MotionValue<number> }) => {
    const scale = useTransform(scrollY, [0, SECTION_HEIGHT], [0.6, 1]);
    const borderRadius = useTransform(scrollY, [0, SECTION_HEIGHT], [24, 0]);
    const opacity = useTransform(
        scrollY,
        [SECTION_HEIGHT + 400, SECTION_HEIGHT + 900],
        [1, 0]
    );

    const textOpacity = useTransform(scrollY, [0, 250], [1, 0]);
    const textScale = useTransform(scrollY, [0, 250], [1, 1.05]);
    const textY = useTransform(scrollY, [0, 250], [0, 40]);

    return (
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0">
            <motion.div
                style={{
                    scale,
                    borderRadius,
                    opacity,
                    backgroundImage: "url('/images/nithish-about.jpg')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
                className="w-full h-full shadow-2xl relative origin-center"
            >
                <div className="absolute inset-0 bg-black/60" />
            </motion.div>

            {/* Title Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    style={{
                        opacity: textOpacity,
                        scale: textScale,
                        y: textY,
                    }}
                    className="relative group bg-white/50 dark:bg-black/40 backdrop-blur-[80px] px-12 py-20 md:py-28 rounded-3xl flex flex-col items-center justify-center w-[90vw] max-w-[1400px] border border-white/10 shadow-2xl"
                >
                    <div className="absolute inset-0 bg-primary/5 rounded-3xl pointer-events-none" />

                    <h1 className="text-6xl sm:text-8xl md:text-[9rem] lg:text-[11rem] font-black text-foreground dark:text-white tracking-tight leading-[0.88] uppercase text-center mb-6">
                        EXPERIENCE
                    </h1>

                    <p className="w-full max-w-3xl text-center text-xs sm:text-sm md:text-base font-bold text-foreground/70 dark:text-white/70 tracking-[0.25em] leading-relaxed uppercase">
                        Merging technical precision with creative vision. A curated timeline of my professional journey, from foundational code to AI solutions.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

const ParallaxImages = ({ scrollY }: { scrollY: MotionValue<number> }) => {
    return (
        <div className="mx-auto max-w-7xl px-4 absolute inset-0 z-20 pointer-events-none grid grid-cols-12 gap-4 h-full items-end pb-[10vh]">
            {/* 1. Left Small - SubAERO 3D Digital Twin */}
            <div className="col-span-3 col-start-2">
                <ParallaxImg
                    scrollY={scrollY}
                    src="/images/subaero-preview.jpg"
                    alt="SubAERO 3D Engine Twin"
                    start={600}
                    end={-1000}
                    className="w-full shadow-2xl rounded-2xl border border-white/10 aspect-[4/3] object-cover"
                />
            </div>

            {/* 2. Right Small - Securox Cyber Risk */}
            <div className="col-span-3 col-start-10 mb-32">
                <ParallaxImg
                    scrollY={scrollY}
                    src="/images/timeline-securox.png"
                    alt="Securox Cyber Risk Intelligence"
                    start={700}
                    end={-1000}
                    className="w-full shadow-2xl rounded-2xl border border-white/10 aspect-square object-cover"
                />
            </div>

            {/* 3. Center Wide - AWS GenAI Virtual Internship */}
            <div className="col-span-4 col-start-5 mb-10">
                <ParallaxImg
                    scrollY={scrollY}
                    src="/images/timeline-aws-internship.png"
                    alt="AWS GenAI Virtual Internship"
                    start={650}
                    end={-1200}
                    className="w-full shadow-2xl rounded-2xl border border-white/10 aspect-video object-cover"
                />
            </div>

            {/* 4. Far Left Tall - Voyage AI */}
            <div className="col-span-3 col-start-1 mb-64">
                <ParallaxImg
                    scrollY={scrollY}
                    src="/images/voyage-preview.jpg"
                    alt="Voyage AI Travel Planner"
                    start={800}
                    end={-1400}
                    className="w-full shadow-2xl rounded-2xl border border-white/10 aspect-[3/4] object-cover"
                />
            </div>

            {/* 5. Far Right Wide - Chennai Institute of Technology */}
            <div className="col-span-4 col-start-8 mb-40">
                <ParallaxImg
                    scrollY={scrollY}
                    src="/images/timeline-cit-college.png"
                    alt="Chennai Institute of Technology"
                    start={750}
                    end={-1400}
                    className="w-full shadow-2xl rounded-2xl border border-white/10 aspect-video object-cover"
                />
            </div>
        </div>
    );
};

const ParallaxImg = ({ className, alt, src, start, end, scrollY }: { className?: string, alt: string, src: string, start: number, end: number, scrollY: MotionValue<number> }) => {
    const opacity = useTransform(scrollY, [0, SECTION_HEIGHT * 1.1], [1, 0]);
    const scale = useTransform(scrollY, [0, SECTION_HEIGHT], [1, 1.1]);
    const y = useTransform(scrollY, [0, SECTION_HEIGHT], [start, end]);
    const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

    return (
        <motion.img
            src={src}
            alt={alt}
            className={className}
            style={{ transform, opacity }}
        />
    );
};
