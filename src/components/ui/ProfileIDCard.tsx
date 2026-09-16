'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Shield, CheckCircle2, Award, Code } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export function ProfileIDCard() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!e.touches[0]) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const touch = e.touches[0];
        const xPct = (touch.clientX - rect.left) / rect.width - 0.5;
        const yPct = (touch.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none relative">
            {/* Interactive Card Container */}
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full max-w-[320px] sm:max-w-[340px] bg-[#0c0d14]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center group transition-shadow duration-300 hover:shadow-[0_25px_70px_rgba(59,130,246,0.25)]"
            >
                {/* Lanyard Hole Punch */}
                <div className="w-8 h-3 rounded-full bg-zinc-950 border border-white/20 mb-4 shadow-inner flex items-center justify-center">
                    <div className="w-5 h-1.5 rounded-full bg-zinc-900" />
                </div>

                {/* Animated Holographic Sheen Layer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                {/* Grid Background Texture */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                {/* Top Header & Status */}
                <div className="w-full flex items-center justify-between border-b border-white/10 pb-3 mb-4 relative z-10">
                    <div className="flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">CIT // OFFICIAL ID</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        AVAILABLE
                    </div>
                </div>

                {/* Profile Image with Glowing Border */}
                <div className="relative mb-4 group/avatar">
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary via-cyan-500 to-purple-500 rounded-2xl blur-md opacity-50 group-hover/avatar:opacity-100 transition-opacity" />
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-zinc-900">
                        <img
                            src={portfolioData.personal.avatar}
                            alt={portfolioData.personal.name}
                            className="w-full h-full object-cover group-hover/avatar:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-1 rounded-full border-2 border-zinc-950 shadow-md">
                        <CheckCircle2 className="w-4 h-4" />
                    </div>
                </div>

                {/* Identity Information */}
                <div className="text-center space-y-1 mb-4 relative z-10">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center justify-center gap-1.5">
                        {portfolioData.personal.name}
                    </h3>
                    <p className="text-xs font-semibold text-primary tracking-wide">
                        Cybersecurity & AI Engineer
                    </p>
                    <p className="text-[11px] text-zinc-400 font-mono">
                        Chennai Institute of Technology
                    </p>
                </div>

                {/* Highlights / Badges */}
                <div className="w-full grid grid-cols-2 gap-2 mb-4 relative z-10">
                    <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col items-center text-center">
                        <Award className="w-3.5 h-3.5 text-amber-400 mb-1" />
                        <span className="text-[10px] font-bold text-zinc-200">Aerothon '26</span>
                        <span className="text-[9px] text-zinc-500">Top 8 Finalist</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col items-center text-center">
                        <Code className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                        <span className="text-[10px] font-bold text-zinc-200">LeetCode 1771</span>
                        <span className="text-[9px] text-zinc-500">500+ Solved</span>
                    </div>
                </div>

                {/* Footer Security ID & Barcode Visual */}
                <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between relative z-10">
                    <div className="text-left">
                        <span className="text-[8px] font-mono text-zinc-500 block">CARD SERIAL</span>
                        <span className="text-[10px] font-mono text-zinc-300 font-semibold tracking-wider">NB-2026-CIT</span>
                    </div>
                    {/* Fake Barcode Graphic */}
                    <div className="flex items-center gap-[2px] h-5 opacity-70">
                        <div className="w-1 h-full bg-white/80" />
                        <div className="w-[1px] h-full bg-white/40" />
                        <div className="w-1.5 h-full bg-white/90" />
                        <div className="w-[2px] h-full bg-white/30" />
                        <div className="w-1 h-full bg-white/70" />
                        <div className="w-[1px] h-full bg-white/50" />
                        <div className="w-2 h-full bg-white/90" />
                        <div className="w-[1px] h-full bg-white/40" />
                        <div className="w-1 h-full bg-white/80" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default ProfileIDCard;
