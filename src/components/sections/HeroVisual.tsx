import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Code2, ArrowDown, ArrowDownRight, Bot, Zap, ExternalLink, MessageSquare, Mail, FileText, Sparkles, Trophy, ShieldCheck } from 'lucide-react';
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import Image from 'next/image';
import gsap from "gsap";
import { ProfileCard } from "@/components/ui/profile-card";
import { Spotlight } from "@/components/ui/spotlight-new";
import { useIsMobile } from "@/hooks/useIsMobile";

export function HeroVisual({ isExiting = false }: { isExiting?: boolean }) {
  const { personal } = portfolioData;
  const isMobile = useIsMobile();
  const [showProfile, setShowProfile] = useState(false);
  const [tooltip, setTooltip] = useState<{ show: boolean; text: string; x: number; y: number; icon: 'zap' | 'bot' | null }>({
    show: false,
    text: '',
    x: 0,
    y: 0,
    icon: null
  });

  const githubRef = useRef(null);
  const linkedinRef = useRef(null);
  const instagramRef = useRef(null);
  const zapRef = useRef(null);
  const zapSmallRef = useRef(null);
  const botRef = useRef(null);

  useEffect(() => {
    if (!isExiting || isMobile) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(githubRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          onComplete: () => {
            gsap.to(githubRef.current, { y: -10, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut", force3D: true });
          }
        }
      );
      gsap.fromTo(linkedinRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, delay: 0.1, ease: "power3.out",
          onComplete: () => {
            gsap.to(linkedinRef.current, { y: 10, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut", force3D: true });
          }
        }
      );
      gsap.fromTo(instagramRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out",
          onComplete: () => {
            gsap.to(instagramRef.current, { x: 10, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", force3D: true });
          }
        }
      );
      gsap.to([zapRef.current, zapSmallRef.current], { scale: 1.2, duration: 0.6, repeat: -1, yoyo: true, ease: "power2.inOut", force3D: true });
      gsap.to(botRef.current, { rotation: 8, y: -10, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut", force3D: true });
    });

    return () => ctx.revert();
  }, [isExiting, isMobile]);

  // ─── MOBILE LAYOUT ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen w-full flex flex-col bg-background text-foreground overflow-hidden"
      >
        {/* Dot grid background */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle,_#888_0.5px,_transparent_0.5px)] dark:bg-[radial-gradient(circle,_#444_0.5px,_transparent_0.5px)] opacity-20 [background-size:20px_20px]" />

        {/* Portrait — top half, faded bottom */}
        <div className="relative w-full h-[45vh] overflow-hidden z-[1]">
          <Image
            src="/images/nithish-suit.jpg"
            alt="Nithish Bharathwaj N"
            fill
            className="object-cover object-top filter contrast-[112%] saturate-[115%] brightness-[102%]"
            priority
          />
          {/* Fade bottom of photo into background */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
          {/* Subtle top fade */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background/60 to-transparent" />
        </div>

        {/* Content below photo */}
        <div className="relative z-10 flex flex-col px-5 pt-2 pb-20 gap-5">

          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">Available For Work</span>
          </motion.div>

          {/* Main heading — stacked, no nowrap */}
          <div className="flex flex-col gap-1">
            {[
              { text: "CYBER", delay: 0.1 },
              { text: "SECURITY", delay: 0.2 },
              { text: "& AI", delay: 0.3 },
              { text: "ENGINEER", delay: 0.4 },
            ].map(({ text, delay }) => (
              <motion.h1
                key={text}
                initial={{ opacity: 0, y: 20 }}
                animate={isExiting ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.8rem,11vw,5rem)] font-black leading-[0.88] tracking-tighter text-shiny will-change-transform"
              >
                {text}
              </motion.h1>
            ))}
          </div>

          {/* Specialties — 2-column badge grid */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 text-[10px] font-mono font-bold tracking-wide">
              <ShieldCheck className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>CYBER RISK</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-200 text-[10px] font-mono font-bold tracking-wide">
              <Trophy className="w-3 h-3 text-amber-400 shrink-0 animate-pulse" />
              <span>AEROTHON '26</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-sky-950/60 border border-sky-500/35 text-sky-300 text-[10px] font-mono font-bold tracking-wider">
              <Sparkles className="w-3 h-3 text-sky-400 shrink-0" />
              <span>LLMs & NETS</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/35 text-amber-300 text-[10px] font-mono font-bold tracking-wider">
              <Zap className="w-3 h-3 text-amber-400 shrink-0" />
              <span>AGENTIC AI</span>
            </div>
          </motion.div>

          {/* Stats tag */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.15em]"
          >
            Autonomous AI · Cyber Intelligence · Full-Stack Architect
          </motion.p>

          {/* Divider + Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="pt-4 border-t border-foreground/15 flex flex-col gap-4"
          >
            {/* Social row */}
            <div className="flex flex-wrap gap-2">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300"
              >
                <Mail className="w-3 h-3 text-sky-400" />
                <span>Email</span>
              </a>
              <a
                href={personal.socialLinks.find(s => s.platform === 'GitHub')?.url || '#'}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300"
              >
                <Github className="w-3 h-3 text-purple-400" />
                <span>GitHub</span>
              </a>
              <a
                href={personal.socialLinks.find(s => s.platform === 'LinkedIn')?.url || '#'}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300"
              >
                <Linkedin className="w-3 h-3 text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://leetcode.com/u/nithish_cit/"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300"
              >
                <Code2 className="w-3 h-3 text-amber-400" />
                <span>LeetCode</span>
              </a>
            </div>

            {/* Resume buttons */}
            <div className="flex items-center gap-3">
              <a
                href={personal.resumeUrl}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume PDF</span>
              </a>
              <Link
                href="/resume"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-300"
              >
                <ArrowDownRight className="w-3.5 h-3.5" />
                <span>View Resume</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // ─── DESKTOP LAYOUT (original) ───────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen w-full flex flex-col bg-background text-foreground overflow-hidden overflow-x-clip selection:bg-primary/20"
    >
      {/* Background Pattern */}
      <div className="w-full absolute h-full z-0 bg-[radial-gradient(circle,_#888_0.5px,_transparent_0.5px)] dark:bg-[radial-gradient(circle,_#444_0.5px,_transparent_0.5px)] opacity-20 [background-size:24px_24px]" />

      {/* Spotlight Effect */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden overflow-x-clip">
        <Spotlight
          duration={10}
          xOffset={120}
          translateY={-300}
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0, 0%, 100%, .15) 0, hsla(0, 0%, 100%, .05) 50%, transparent 80%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 100%, .1) 0, hsla(0, 0%, 100%, .02) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 100%, .08) 0, hsla(0, 0%, 100%, 0) 80%, transparent 100%)"
        />
      </div>

      {/* Portrait */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.9, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-0 top-0 bottom-0 w-[42%] xl:w-[38%] pointer-events-none overflow-hidden overflow-x-clip z-[1]"
      >
        <Image
          src="/images/nithish-suit.jpg"
          alt="Nithish Bharathwaj N"
          fill
          className="object-cover object-top filter contrast-[112%] saturate-[115%] brightness-[102%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent w-full" />
        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-background/70 via-transparent to-transparent h-36" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent h-48" />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/15 via-transparent to-purple-500/10 mix-blend-soft-light" />
      </motion.div>

      {/* Right-Side Profile Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-4 bottom-24 md:right-16 md:bottom-44 z-20 flex flex-col gap-1.5 p-4 md:p-5 rounded-2xl bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-2xl max-w-xs md:max-w-sm pointer-events-auto group hover:border-sky-500/40 transition-colors"
      >
        <div className="flex items-center justify-between gap-3 mb-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">Available For Work</span>
          </div>
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">CIT // 2026</span>
        </div>
        <span className="text-sm md:text-base font-black uppercase tracking-wider text-white leading-tight">
          Nithish Bharathwaj N
        </span>
        <span className="text-[10px] md:text-[11px] text-zinc-400 font-medium uppercase tracking-wider leading-relaxed">
          B.E. CSE (Cybersecurity) · Chennai Institute of Technology
        </span>
      </motion.div>

      <main className="relative flex-1 flex flex-col justify-center pt-32 pb-12 md:pt-48 lg:pt-52 md:pb-20 z-10 max-w-[105rem] w-full mx-auto">
        <div className="flex relative gap-2 px-4 md:px-12 w-full max-w-full md:max-w-[56vw] flex-col justify-center items-start text-left">

          {/* Follow-Cursor Tooltip */}
          <AnimatePresence>
            {tooltip.show && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="fixed pointer-events-none z-[100] flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold px-4 py-2.5 rounded-full shadow-2xl"
                style={{ left: tooltip.x, top: tooltip.y, x: "-50%", y: "-150%" }}
              >
                {tooltip.icon === 'zap' && <ExternalLink className="w-4 h-4" />}
                {tooltip.icon === 'bot' && <MessageSquare className="w-4 h-4" />}
                <span className="text-sm">{tooltip.text}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Line 1: CYBER */}
          <div className="relative">
            <div ref={githubRef} className="absolute -top-4 right-0 text-primary/60 hover:text-primary z-20 opacity-0">
              <a href={personal.socialLinks.find(s => s.platform === 'GitHub')?.url} target="_blank" className="block">
                <Github size={32} />
              </a>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isExiting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,8.5vw,10.5rem)] font-black leading-[0.85] tracking-tighter text-shiny will-change-transform text-left whitespace-nowrap"
            >
              CYBER
            </motion.h1>
          </div>

          {/* Line 2: SECU[ZAP]RITY */}
          <div className="relative">
            <div ref={linkedinRef} className="absolute -top-8 left-4 text-primary/60 hover:text-primary z-20 opacity-0">
              <a href={personal.socialLinks.find(s => s.platform === 'LinkedIn')?.url} target="_blank" className="block">
                <Linkedin size={32} />
              </a>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isExiting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,8.5vw,10.5rem)] flex items-center font-black leading-[0.85] tracking-tighter text-shiny will-change-transform text-left whitespace-nowrap"
            >
              <span>SECU</span>
              <div
                ref={zapRef}
                className="hidden lg:block mx-[0.05em] relative cursor-pointer group"
                onClick={() => window.open('https://github.com/Nithish-Bharathwaj-N/Securox', '_blank')}
                onMouseEnter={(e) => setTooltip({ show: true, text: "Securox — Cyber Risk Platform", icon: 'zap', x: e.clientX, y: e.clientY })}
                onMouseMove={(e) => setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }))}
                onMouseLeave={() => setTooltip(prev => ({ ...prev, show: false }))}
              >
                <Zap className="w-[0.8em] h-[0.8em] text-sky-400 group-hover:text-sky-300 transition-colors" strokeWidth={1.5} />
              </div>
              <div
                ref={zapSmallRef}
                className="block lg:hidden mx-[0.02em] relative cursor-pointer group"
                onClick={() => window.open('https://github.com/Nithish-Bharathwaj-N/Securox', '_blank')}
              >
                <Zap className="w-[0.8em] h-[0.8em] text-sky-400" strokeWidth={2} />
              </div>
              <span>RITY</span>
            </motion.h1>
          </div>

          {/* Line 3: & AI + Badges */}
          <div className="relative flex items-center gap-4 md:gap-5 flex-nowrap">
            <div ref={instagramRef} className="absolute -bottom-12 right-24 md:right-36 text-primary/60 hover:text-primary z-20 opacity-0">
              <a href="https://leetcode.com/u/nithish_cit/" target="_blank" className="block">
                <Code2 size={32} />
              </a>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isExiting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,8.5vw,10.5rem)] font-black leading-[0.85] tracking-tighter text-shiny will-change-transform text-left whitespace-nowrap shrink-0"
            >
              & AI
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col gap-2.5 my-auto shrink-0 justify-center"
            >
              <div className="flex items-center gap-2.5 flex-nowrap">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 backdrop-blur-md text-cyan-200 text-xs md:text-sm font-mono font-bold tracking-wide shadow-lg shadow-cyan-500/10 hover:border-cyan-400/60 transition-all group cursor-default whitespace-nowrap">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>CYBER RISK & THREAT INTEL</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/40 backdrop-blur-md text-purple-200 text-xs md:text-sm font-mono font-bold tracking-wide shadow-lg shadow-purple-500/10 hover:border-purple-400/60 transition-all group cursor-default whitespace-nowrap">
                  <Trophy className="w-4 h-4 text-amber-400 shrink-0 animate-pulse group-hover:scale-110 transition-transform" />
                  <span>AEROTHON '26 FINALIST</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 flex-nowrap">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sky-950/60 border border-sky-500/35 text-sky-300 text-xs md:text-sm font-mono font-bold tracking-wider hover:border-sky-400/50 transition-colors cursor-default whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>LLMs & NEURAL NETS</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/35 text-amber-300 text-xs md:text-sm font-mono font-bold tracking-wider hover:border-amber-400/50 transition-colors cursor-default whitespace-nowrap">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>AGENTIC AI BUILDER</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Line 4: ENGI[BOT]NEER */}
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isExiting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,8.5vw,10.5rem)] flex items-center font-black leading-[0.85] tracking-tighter text-shiny will-change-transform text-left whitespace-nowrap"
            >
              <span>EN</span><span>GI</span>
              <div
                ref={botRef}
                className="mx-[0.05em] relative cursor-pointer group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  window.dispatchEvent(new CustomEvent('portfolio:toggle-chatbot', {
                    detail: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
                  }));
                }}
                onMouseEnter={(e) => setTooltip({ show: true, text: "Talk to my AI Assistant", icon: 'bot', x: e.clientX, y: e.clientY })}
                onMouseMove={(e) => setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }))}
                onMouseLeave={() => setTooltip(prev => ({ ...prev, show: false }))}
              >
                <Bot className="w-[0.85em] h-[0.85em] text-yellow-500 fill-yellow-500/10 group-hover:text-yellow-400 group-hover:fill-yellow-400/20 transition-colors" />
              </div>
              <span>NEER</span>
            </motion.h1>
          </div>

          {/* Stats tag */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[10px] md:text-xs text-muted-foreground font-mono font-medium uppercase tracking-[0.2em] pt-3 text-left"
          >
            Autonomous AI · Threat Intelligence · High-Performance Architectures
          </motion.p>
        </div>

        {/* Bottom Quick-Links & Action Dock */}
        <div className="mx-auto max-w-[105rem] w-full px-6 md:px-20 mt-8 md:mt-16 z-30 relative">
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-foreground/15">
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <div className="text-[10px] md:text-xs whitespace-nowrap font-mono font-bold tracking-[0.25em] text-muted-foreground uppercase">
                CHENNAI, IN — 2026
              </div>
              <div className="hidden sm:block w-px h-4 bg-foreground/20" />
              <div className="flex items-center flex-wrap gap-2">
                <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-sky-400 text-zinc-300 transition-all duration-300 shadow-sm" title="Direct Email Inquiry">
                  <Mail className="w-3.5 h-3.5 text-sky-400" /><span>Email</span>
                </a>
                <a href={personal.socialLinks.find(s => s.platform === 'GitHub')?.url || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-400 text-zinc-300 transition-all duration-300 shadow-sm">
                  <Github className="w-3.5 h-3.5 text-purple-400" /><span>GitHub</span>
                </a>
                <a href={personal.socialLinks.find(s => s.platform === 'LinkedIn')?.url || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400 text-zinc-300 transition-all duration-300 shadow-sm">
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" /><span>LinkedIn</span>
                </a>
                <a href="https://leetcode.com/u/nithish_cit/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400 text-zinc-300 transition-all duration-300 shadow-sm">
                  <Code2 className="w-3.5 h-3.5 text-amber-400" /><span>LeetCode</span>
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all duration-300 shadow-sm">
                <FileText className="w-3.5 h-3.5" /><span>Resume PDF</span>
              </a>
              <Link href="/resume" className="group flex items-center">
                <motion.div className="relative flex items-center bg-zinc-100 dark:bg-white h-10 w-10 group-hover:w-36 rounded-full transition-all duration-500 ease-[0.23,1,0.32,1] overflow-hidden overflow-x-clip shadow-xl">
                  <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:delay-150 text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-black pl-4 pr-10">
                    View Resume
                  </span>
                  <div className="absolute right-0 flex items-center justify-center size-10 text-zinc-900 dark:text-black group-hover:rotate-45 transition-transform duration-500">
                    <ArrowDownRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Award/Badge Vertical - LEFT SIDE (desktop only) */}
      <div
        className="absolute left-0 top-1/2 z-50 hidden md:flex items-center transform -translate-y-1/2 group/container"
        onMouseEnter={() => setShowProfile(true)}
        onMouseLeave={() => setShowProfile(false)}
      >
        <div className="relative z-50">
          <motion.div
            whileHover={{ x: 10 }}
            className="bg-white text-black py-10 px-4 text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl rounded-r-3xl border-r border-y border-zinc-200 cursor-pointer"
          >
            <span className="rotate-0 [writing-mode:vertical-rl]">
              AVAILABLE FOR OPPORTUNITY
            </span>
          </motion.div>
        </div>
        <AnimatePresence>
          {showProfile && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="pl-4 pointer-events-auto"
              style={{ width: 'max-content' }}
            >
              <ProfileCard
                name={personal.name}
                title="Cybersecurity · AI Engineer · Full-Stack Architect"
                description={`${personal.name} is a Cybersecurity & AI Engineer dedicated to building autonomous threat intelligence platforms, predictive machine learning engines, and resilient full-stack web architectures.`}
                imageUrl={personal.avatar}
                githubUrl={personal.socialLinks.find(s => s.platform === 'GitHub')?.url}
                linkedinUrl={personal.socialLinks.find(s => s.platform === 'LinkedIn')?.url}
                instagramUrl={"https://leetcode.com/u/nithish_cit/"}
                className="!max-w-4xl scale-[0.8] origin-left"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
