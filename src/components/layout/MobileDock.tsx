'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Rocket, Briefcase, BookOpen, Send, Menu, Trophy, Code2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileDockProps {
    onToggleMenu?: () => void;
    isMenuOpen?: boolean;
}

export function MobileDock({ onToggleMenu, isMenuOpen }: MobileDockProps) {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (isMenuOpen) return;
        const direction = latest > lastScrollY ? 'down' : 'up';
        if (direction === 'down' && latest > 150) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        setLastScrollY(latest);
    });

    const dockItems = [
        { label: 'Projects', href: '/projects', icon: Rocket },
        { label: 'Experience', href: '/experience', icon: Briefcase },
        { label: 'Blog', href: '/blog', icon: BookOpen },
        { label: 'Contact', href: '/contact', icon: Send },
    ];

    return (
        <AnimatePresence>
            {isVisible && !isMenuOpen && (
                <motion.div
                    initial={{ y: 80, opacity: 0, x: '-50%' }}
                    animate={{ y: 0, opacity: 1, x: '-50%' }}
                    exit={{ y: 80, opacity: 0, x: '-50%' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[95] lg:hidden w-auto max-w-[95vw] pointer-events-auto"
                >
                    <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-black/80 dark:bg-black/90 backdrop-blur-2xl border border-white/20 dark:border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.8)] text-white">
                        {dockItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(`${item.href}/`));

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={cn(
                                        "relative flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-300 text-xs font-bold tracking-tight select-none",
                                        isActive
                                            ? "bg-white/20 text-white shadow-inner"
                                            : "text-white/70 hover:text-white hover:bg-white/10"
                                    )}
                                >
                                    <Icon className={cn("w-4 h-4 transition-transform duration-300", isActive && "scale-110 text-emerald-400")} />
                                    <span className="text-[11px] font-semibold tracking-tight">{item.label}</span>
                                    {isActive && (
                                        <motion.span
                                            layoutId="mobile-dock-active"
                                            className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]"
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}

                        <div className="w-px h-5 bg-white/20 mx-0.5" />

                        {/* Full Menu Trigger */}
                        <button
                            onClick={onToggleMenu}
                            className="flex items-center gap-1 px-3 py-2 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 transition-all duration-300 text-xs font-bold"
                            aria-label="Open full menu"
                        >
                            <Menu className="w-4 h-4" />
                            <span className="text-[11px] font-extrabold uppercase tracking-widest">More</span>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
