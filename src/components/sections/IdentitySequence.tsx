"use client";

import React, { useRef } from "react";
import { motion, useTransform, useSpring, easeOut, easeInOut, circOut, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { portfolioData } from "@/data/portfolio";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";
import { BrandScroller, BrandScrollerReverse } from "@/components/ui/brand-scroller";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import MagneticEffect from "@/components/ui/MagneticEffect";
import { useIsMobile } from "@/hooks/useIsMobile";

const BlurInUpText = ({ text, animate }: { text: string; animate: boolean }) => {
    const words = text.split(" ");
    return (
        <motion.span
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            transition={{ staggerChildren: 0.01 }}
            aria-label={text}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-pre">
                    {word.split("").map((char, charIndex) => (
                        <motion.span
                            key={charIndex}
                            variants={{
                                hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
                                visible: { 
                                    opacity: 1, 
                                    y: 0, 
                                    filter: "blur(0px)", 
                                    transition: { type: "spring", bounce: 0, duration: 0.5 } 
                                }
                            }}
                            className="inline-block"
                            style={{ willChange: "filter, opacity, transform" }}
                        >
                            {char}
                        </motion.span>
                    ))}
                    {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
                </span>
            ))}
        </motion.span>
    );
};

interface IdentitySequenceProps {
    scrollYProgress: any; // Parent scroll progress [0, 1]
    isVisible: boolean;
}

export const IdentitySequence = ({ scrollYProgress, isVisible }: IdentitySequenceProps) => {
    const t = useTranslations("about");
    const isMobile = useIsMobile();
    const [isHovered, setIsHovered] = React.useState(false);
    const [isTextAnimated, setIsTextAnimated] = React.useState(false);

    // Map the parent's scroll progress (0.4 to 0.85) to local progress (0 to 1).
    const localProgress = useTransform(scrollYProgress, [0.4, 0.85], [0, 1]);

    // 1. Card Transformation (Entrance & Scaling)
    const cardScaleTransform = useTransform(localProgress, [0, 0.4], [0.8, 1], { ease: easeInOut });
    const cardYTransform = useTransform(localProgress, [0, 0.4], ["60vh", "0vh"], { ease: easeInOut });
    const cardBorderRadiusTransform = useTransform(localProgress, [0.1, 0.4], ["60px", "0px"], { ease: easeInOut });

    // 2. Internal Content Scroll
    const contentYTransform = useTransform(localProgress, [0.35, 1], ["0%", "-70%"], { ease: easeInOut });
    const imageParallaxYTransform = useTransform(localProgress, [0.35, 1], ["-10%", "10%"], { ease: easeInOut });

    // 3. Elements specific animations
    const phase0OpacityTransform = useTransform(localProgress, [0, 0.15], [1, 0]);
    const cardContentOpacityTransform = useTransform(localProgress, [0.1, 0.3], [0, 1]);
    const photoScaleTransform = useTransform(localProgress, [0.3, 0.8], [1.15, 1], { ease: easeInOut });
    const textOpacityTransform = useTransform(localProgress, [0.85, 1], [0, 1]);

    // Static overrides on mobile to avoid scroll-hijack hiding content
    const cardScale = isMobile ? 1 : cardScaleTransform;
    const cardY = isMobile ? "0vh" : cardYTransform;
    const cardBorderRadius = isMobile ? "0px" : cardBorderRadiusTransform;
    const contentY = isMobile ? "0%" : contentYTransform;
    const imageParallaxY = isMobile ? "0%" : imageParallaxYTransform;
    const phase0Opacity = isMobile ? 0 : phase0OpacityTransform;
    const cardContentOpacity = isMobile ? 1 : cardContentOpacityTransform;
    const photoScale = isMobile ? 1 : photoScaleTransform;
    const textOpacity = isMobile ? 1 : textOpacityTransform;
    const shouldAnimateText = isMobile || isTextAnimated;

    useMotionValueEvent(localProgress, "change", (latest) => {
        if (latest > 0.85 && !isTextAnimated) {
            setIsTextAnimated(true);
        }
    });

    // 4. Background Color Transition (Smoothing the exit)
    const cardBg = useTransform(
        localProgress,
        [0.8, 1],
        ["#EBEBEB", "#FFFFFF"]
    );
    const cardBgDark = useTransform(
        localProgress,
        [0.8, 1],
        ["#18181b", "#000000"]
    );

    const vaultGradientDownDark = useTransform(cardBgDark, (color: string) => {
        const hex = color.replace('#', '');
        return `linear-gradient(to bottom, #${hex}, #${hex}00)`;
    });
    const vaultGradientDownLight = useTransform(cardBg, (color: string) => {
        const hex = color.replace('#', '');
        return `linear-gradient(to bottom, #${hex}, #${hex}00)`;
    });
    const vaultGradientUpDark = useTransform(cardBgDark, (color: string) => {
        const hex = color.replace('#', '');
        return `linear-gradient(to top, #${hex}, #${hex}00)`;
    });
    const vaultGradientUpLight = useTransform(cardBg, (color: string) => {
        const hex = color.replace('#', '');
        return `linear-gradient(to top, #${hex}, #${hex}00)`;
    });

    const { resolvedTheme } = useTheme();
    const cardBgValue = resolvedTheme === 'dark' ? cardBgDark : cardBg;
    const vaultGradientDown = resolvedTheme === 'dark' ? vaultGradientDownDark : vaultGradientDownLight;
    const vaultGradientUp = resolvedTheme === 'dark' ? vaultGradientUpDark : vaultGradientUpLight;


    const marqueeWords = [
        "CYBERSECURITY ENGINEER",
        "AI & ML DEVELOPER",
        "FULL-STACK BUILDER",
        "COMPETITIVE PROGRAMMER"
    ];

    const marqueeItems = marqueeWords.flatMap((word, idx) => [
        <span key={`word-${idx}`} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mx-4 md:mx-8 text-black dark:text-white leading-none whitespace-nowrap">
            {word}
        </span>,
        <div key={`icon-${idx}`} className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#D1FF4D] flex items-center justify-center mx-4 md:mx-8 shrink-0">
            <svg viewBox="0 0 100 100" className="w-5 h-5 md:w-7 md:h-7 fill-black dark:fill-zinc-900">
                <path d="M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0" />
            </svg>
        </div>
    ]);

    return (
        <div className={cn(
            "relative w-full flex flex-col items-center justify-center bg-background dark:bg-black",
            !isMobile && "w-screen h-full overflow-hidden overflow-x-clip"
        )}>
            {/* Phase 0: The Lead-in UI (Visible before card scales on desktop) */}
            {!isMobile && (
                <motion.div
                    style={{ opacity: phase0Opacity }}
                    className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none -translate-y-12"
                >
                    {/* Center Unified Action - Magnetic Group */}
                    <div className="mb-16 pointer-events-auto">
                        <MagneticEffect>
                            <div className="group flex items-center gap-2 cursor-pointer">
                                <div className="relative px-10 py-5 rounded-full bg-black dark:bg-white group-hover:bg-[#c1e44a] dark:group-hover:bg-[#c1e44a] overflow-hidden overflow-x-clip transition-all duration-500 shadow-lg group-hover:shadow-[0_0_30px_rgba(193,228,74,0.3)]">
                                    <div className="relative z-10 h-7 overflow-hidden overflow-x-clip">
                                        <div className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
                                            <span className="text-white dark:text-black group-hover:text-black font-bold text-xl leading-7 transition-colors duration-500">
                                                {t("leadIn.aboutMe")}
                                            </span>
                                            <span className="text-black font-bold text-xl leading-7 transition-colors duration-500">
                                                {t("leadIn.aboutMe")}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative w-16 h-16 rounded-full bg-black dark:bg-white group-hover:bg-[#c1e44a] dark:group-hover:bg-[#c1e44a] overflow-hidden overflow-x-clip flex items-center justify-center transition-all duration-500 shadow-lg">
                                    <div className="relative z-10 h-8 overflow-hidden overflow-x-clip">
                                        <div className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
                                            <ArrowUpRight className="w-8 h-8 text-white dark:text-black group-hover:text-black transition-colors duration-500" />
                                            <ArrowUpRight className="w-8 h-8 text-black transition-colors duration-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </MagneticEffect>
                    </div>

                    {/* Unified Bottom Labels Layer */}
                    <div className="w-full max-w-[1200px] flex items-center justify-between px-12">
                        <div className="flex items-center gap-3 text-zinc-500 dark:text-white/60 text-sm font-medium tracking-tight">
                            <motion.span
                                animate={{ y: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-4 h-4 flex items-center justify-center"
                            >
                                ↓
                            </motion.span>
                            <span>{t("leadIn.scroll")}</span>
                        </div>

                        <div className="text-zinc-500 dark:text-white/60 text-sm font-medium tracking-tight">
                            {t("leadIn.shortStory")}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* The Main Card Container */}
            <motion.div
                style={{
                    scale: cardScale,
                    y: cardY,
                    borderRadius: cardBorderRadius,
                    backgroundColor: isMobile ? undefined : cardBgValue,
                    willChange: isMobile ? undefined : "transform, background-color",
                }}
                className={cn(
                    "relative w-full flex flex-col z-10",
                    !isMobile && "h-full overflow-hidden overflow-x-clip origin-bottom"
                )}
            >
                {/* Unified Scrolling Content Wrapper */}
                <motion.div
                    style={{ y: contentY }}
                    className="relative w-full flex flex-col items-center"
                >
                    {/* Phase 1: Marquee Header (Top of the long card) */}
                    <div className={cn(
                        "w-full flex items-center justify-center flex-shrink-0",
                        isMobile ? "py-8" : "h-[45vh] md:h-[55vh]"
                    )}>
                        <motion.div style={{ opacity: cardContentOpacity }} className="w-full">
                            <InfiniteMarquee
                                items={marqueeItems}
                                speed={18}
                                className="w-full"
                                itemClassName={isMobile ? "py-6" : "py-12"}
                            />
                        </motion.div>
                    </div>

                    {/* Phase 2: The Large Portrait (The "Explore" area) */}
                    <div className={cn(
                        "relative w-full flex flex-col items-center flex-shrink-0",
                        isMobile ? "h-[50vh] min-h-[340px] px-4" : "h-[100vh] px-4 md:px-10 lg:px-20"
                    )}>
                        {/* Sizing wrapper */}
                        <div
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="relative w-full h-full max-w-[1500px] group/photo cursor-pointer"
                        >
                            {/* Image area */}
                            <div className={cn(
                                "absolute inset-0 overflow-hidden overflow-x-clip",
                                isMobile && "rounded-2xl border border-neutral-200 dark:border-zinc-800"
                            )}>
                                <motion.div
                                    style={{
                                        scale: photoScale,
                                    }}
                                    animate={{
                                        filter: isHovered ? "grayscale(0%) contrast(1)" : "grayscale(100%) contrast(1.1)",
                                    }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="relative w-full h-full"
                                >
                                    <div className="absolute inset-0">
                                        {/* Parallax wrapper */}
                                        <div className="absolute w-full h-[115%] top-0 left-0">
                                            <motion.div 
                                                className="relative h-full w-full" 
                                                style={{ y: imageParallaxY }}
                                            >
                                                <Image
                                                    src={portfolioData.personal.avatar}
                                                    alt="Profile"
                                                    fill
                                                    className="object-cover object-top grayscale-0"
                                                    sizes="(max-width: 768px) 100vw, 100vw"
                                                    priority
                                                />
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Vault frame - Desktop only */}
                            {!isMobile && (
                                <div className="absolute inset-0 pointer-events-none z-20">
                                    <motion.div style={{ backgroundColor: cardBgValue }} className="absolute -top-px left-0 w-full h-[52px]" />
                                    <motion.div style={{ background: vaultGradientDown }} className="absolute top-[50px] left-0 w-full h-32" />
                                    <motion.div style={{ backgroundColor: cardBgValue }} className="absolute -bottom-px left-0 w-full h-[52px]" />
                                    <motion.div style={{ background: vaultGradientUp }} className="absolute bottom-[50px] left-0 w-full h-32" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Phase 3: Final Layout Text */}
                    <motion.div
                        style={{ opacity: textOpacity }}
                        className="w-full max-w-[1700px] mx-auto px-5 md:px-16 lg:px-24 pt-10 pb-6 md:pt-32 md:pb-12 flex-shrink-0"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
                            {/* Header Left */}
                            <div className="md:col-span-7">
                                <h3
                                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-snug text-black dark:text-white"
                                    dangerouslySetInnerHTML={{ __html: t.raw("profile.title") }}
                                />
                            </div>

                            {/* Paragraph Right */}
                            <div className="md:col-span-5 pt-1">
                                <p className="text-[13px] md:text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                                    <BlurInUpText 
                                        text={`${t("profile.narrative")} ${t("profile.narrative2")}`} 
                                        animate={shouldAnimateText} 
                                    />
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Phase 4: Tech Stack & Tools Scrollers */}
                    <motion.div
                        style={{ opacity: textOpacity }}
                        className="w-full max-w-[1700px] mx-auto py-6 md:py-20 flex flex-col gap-6 md:gap-8 flex-shrink-0"
                    >
                        <div className="px-5 md:px-16 lg:px-24 mb-2 md:mb-6">
                            <h4 className="text-base md:text-xl uppercase tracking-[0.15em] font-bold text-zinc-500 dark:text-zinc-400">
                                Tech Stack & Ecosystem
                            </h4>
                        </div>
                        <BrandScroller />
                        <BrandScrollerReverse />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};
