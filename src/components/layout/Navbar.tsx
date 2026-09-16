'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, Rocket, Briefcase, BookOpen, Send, Code2, Trophy, Sparkles, ArrowUpRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

import CardNav from '@/components/ui/CardNav';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { usePreloadState } from '@/components/ui/arc-preloader-hero';

function Clock() {
    const [time, setTime] = useState<string>('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateTime = () => {
            const now = new Date();
            const h = String(now.getHours()).padStart(2, '0');
            const m = String(now.getMinutes()).padStart(2, '0');
            const s = String(now.getSeconds()).padStart(2, '0');
            setTime(`${h}:${m}:${s}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return <span className="font-mono text-xl md:text-2xl font-black opacity-0">00:00:00</span>;

    return (
        <span className="font-mono text-xl md:text-2xl font-black text-gradient tracking-widest hover:tracking-[0.2em] transition-all duration-300">
            {time}
        </span>
    );
}

const useNavItems = () => {
    const t = useTranslations('navigation.menu');
    return [
        {
            label: "About",
            links: [
                { label: t('achievements'), href: "/achievements", description: t('achievementsDesc') },
                { label: t('skills'), href: "/skills", description: t('skillsDesc') },
                { label: t('experience'), href: "/experience", description: t('experienceDesc') },
                { label: t('projects'), href: "/projects", description: t('projectsDesc') },
                { label: t('blog'), href: "/blog", description: t('blogDesc') },
            ]
        }
    ];
};

export function Navbar() {
    const t = useTranslations('navigation');
    const navItems = useNavItems();
    const { resolvedTheme } = useTheme();
    const pathname = usePathname();
    const { scrollY } = useScroll();

    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [labelIndex, setLabelIndex] = useState(0);
    
    const { isPreloading: isPreloadActive } = usePreloadState();
    const isDark = resolvedTheme === 'dark';

    const menuLabels = ["EXPLORE MATRIX", "PROJECTS & HUBS", "NAVIGATE ALL"];

    useEffect(() => {
        setMounted(true);
        if (typeof document !== 'undefined' && document.cookie.includes('locale=id')) {
            document.cookie = 'locale=en;path=/;max-age=31536000';
            window.location.reload();
        }
        const interval = setInterval(() => {
            setLabelIndex((prev) => (prev + 1) % menuLabels.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [menuLabels.length]);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (isMenuOpen) return;

        const direction = latest > lastScrollY ? 'down' : 'up';
        setIsScrolled(latest > 50);

        if (direction === 'down' && latest > 100) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }

        setLastScrollY(latest);
    });

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    const handleHomeClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        closeMenu();
    }, [pathname, closeMenu]);

    const navVariants = {
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 }
    };

    const menuVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
    };

    return (
        <>
            <motion.nav
                variants={navVariants}
                initial="hidden"
                animate={!isPreloadActive && (isVisible || isMenuOpen) ? 'visible' : 'hidden'}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="fixed top-0 left-0 right-0 z-[100]"
            >
                <div className="max-w-[1600px] mx-auto px-4 md:px-12 lg:px-24 py-4 md:py-6">
                    <motion.div
                        className={cn(
                            'flex items-center justify-between transition-all duration-500 rounded-full',
                            isScrolled ? 'glass-strong px-6 py-3' : 'py-2'
                        )}
                        layout
                    >
                        {/* Clock / Home Link */}
                        <Link href="/" className="relative group min-w-[120px]" onClick={handleHomeClick}>
                            <Clock />
                        </Link>

                        {/* Desktop Navigation with CardNav */}
                        <div className="hidden lg:flex items-center gap-4 md:gap-5">
                            <Link
                                href="/"
                                onClick={handleHomeClick}
                                className={cn(
                                    'relative px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full group',
                                    pathname === '/' ? 'text-foreground bg-muted' : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <span className="relative z-10">{t('home')}</span>
                            </Link>

                            <CardNav
                                items={navItems}
                                theme={isDark ? 'dark' : 'light'}
                                pathname={pathname}
                            />

                            <Link
                                href="/contact"
                                className={cn(
                                    'relative px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full group',
                                    pathname === '/contact' ? 'text-foreground bg-muted' : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <span className="relative z-10">{t('contact')}</span>
                            </Link>

                            {mounted && (
                                <AnimatedThemeToggler className="ml-1" />
                            )}
                        </div>

                        {/* Controls - Impressive Eye-Catching Menu Trigger */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="lg:hidden">
                                {mounted && (
                                    <AnimatedThemeToggler />
                                )}
                            </div>

                            {/* Ultra-Impressive Pulsing Cyber Menu Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleMenu}
                                className={cn(
                                    "relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-500 group overflow-hidden border shadow-lg cursor-pointer lg:hidden shrink-0",
                                    isMenuOpen
                                        ? "bg-zinc-950 border-purple-500/80 shadow-[0_0_20px_rgba(168,85,247,0.5)] text-white"
                                        : "bg-zinc-950/90 border-emerald-500/50 shadow-[0_0_15px_rgba(52,211,153,0.3)] text-white hover:border-emerald-400"
                                )}
                                aria-label="Toggle menu"
                            >
                                {/* Subtle Glowing Radar Ring Animation */}
                                <span className="relative flex h-2 w-2 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]"></span>
                                </span>

                                {/* Compact Mobile Label / Animated Larger Label for Tablet+ */}
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={isMenuOpen ? "close" : labelIndex}
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-[10px] sm:text-xs font-mono font-extrabold uppercase tracking-wider text-emerald-400 select-none whitespace-nowrap"
                                    >
                                        {isMenuOpen ? "CLOSE" : (
                                            <>
                                                <span className="sm:hidden">MENU</span>
                                                <span className="hidden sm:inline">{menuLabels[labelIndex]}</span>
                                            </>
                                        )}
                                    </motion.span>
                                </AnimatePresence>

                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={isMenuOpen ? 'close' : 'menu'}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="shrink-0"
                                    >
                                        {isMenuOpen ? <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" /> : <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.nav>

            {/* Impressive Full-Screen Bento Grid Navigation Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[90] lg:hidden"
                    >
                        <motion.div
                            className="absolute inset-0 bg-background/95 backdrop-blur-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        <div className="relative flex flex-col items-center justify-between h-full overflow-y-auto py-20 px-4">
                            <div className="w-full max-w-sm flex flex-col items-center my-auto">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                                    <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-primary">
                                        SYSTEM HUBS DIRECTORY
                                    </span>
                                </div>

                                {/* 2x3 Bento Card Grid */}
                                <div className="grid grid-cols-2 gap-3.5 w-full my-2">
                                    {[
                                        { label: 'Projects', href: '/projects', icon: Rocket, desc: 'Builds & Architectures', color: 'from-sky-500/20 to-blue-600/10 border-sky-500/40 shadow-sky-500/10' },
                                        { label: 'Experience', href: '/experience', icon: Briefcase, desc: 'Work & Leadership', color: 'from-purple-500/20 to-indigo-600/10 border-purple-500/40 shadow-purple-500/10' },
                                        { label: 'Blog', href: '/blog', icon: BookOpen, desc: 'Cyber & AI Insights', color: 'from-amber-500/20 to-orange-600/10 border-amber-500/40 shadow-amber-500/10' },
                                        { label: 'Skills', href: '/skills', icon: Code2, desc: 'Tech Stack & Tools', color: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/40 shadow-emerald-500/10' },
                                        { label: 'Achievements', href: '/achievements', icon: Trophy, desc: 'Milestones & Awards', color: 'from-pink-500/20 to-rose-600/10 border-pink-500/40 shadow-pink-500/10' },
                                        { label: 'Contact', href: '/contact', icon: Send, desc: "Let's Connect", color: 'from-cyan-500/20 to-blue-600/10 border-cyan-500/40 shadow-cyan-500/10' },
                                    ].map((item) => {
                                        const Icon = item.icon;
                                        const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(`${item.href}/`));

                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                onClick={closeMenu}
                                                className={cn(
                                                    "flex flex-col justify-between p-4 rounded-2xl border bg-gradient-to-br transition-all duration-300 active:scale-95 shadow-lg",
                                                    item.color,
                                                    isActive ? "ring-2 ring-emerald-400 shadow-emerald-400/20" : "hover:border-white/50"
                                                )}
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="p-2 rounded-xl bg-foreground/10 backdrop-blur-md">
                                                        <Icon className="w-5 h-5 text-foreground" />
                                                    </div>
                                                    {isActive && <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)] animate-pulse" />}
                                                </div>
                                                <div>
                                                    <h4 className="text-base font-black text-foreground leading-tight">{item.label}</h4>
                                                    <p className="text-[10px] text-muted-foreground font-medium mt-0.5 leading-tight">{item.desc}</p>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>

                                <div className="flex items-center justify-center gap-6 mt-6 w-full pt-4 border-t border-foreground/10">
                                    <Link
                                        href="/gallery"
                                        onClick={closeMenu}
                                        className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors"
                                    >
                                        Gallery <ArrowUpRight className="w-3.5 h-3.5" />
                                    </Link>
                                    <span className="text-foreground/20">•</span>
                                    <Link
                                        href="/resume"
                                        onClick={closeMenu}
                                        className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors"
                                    >
                                        Resume <ArrowUpRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
