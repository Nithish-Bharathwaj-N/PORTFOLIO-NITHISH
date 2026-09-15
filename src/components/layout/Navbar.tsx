'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, Rocket, Briefcase, BookOpen, Send, Code2, Trophy, ArrowUpRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

import CardNav from '@/components/ui/CardNav';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { usePreloadState } from '@/components/ui/arc-preloader-hero';
import { MobileDock } from '@/components/layout/MobileDock';

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
    
    const { isPreloading: isPreloadActive } = usePreloadState();

    const isDark = resolvedTheme === 'dark';

    useEffect(() => {
        setMounted(true);
    }, []);

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

                        {/* Direct High-Visibility Desktop Links */}
                        <div className="hidden lg:flex items-center gap-1.5 md:gap-2">
                            <Link
                                href="/"
                                onClick={handleHomeClick}
                                className={cn(
                                    'relative px-4 py-2 text-xs md:text-sm font-bold transition-all duration-300 rounded-full flex items-center gap-1.5',
                                    pathname === '/' ? 'text-foreground bg-muted shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                )}
                            >
                                <span>{t('home')}</span>
                            </Link>

                            <Link
                                href="/projects"
                                className={cn(
                                    'relative px-4 py-2 text-xs md:text-sm font-bold transition-all duration-300 rounded-full flex items-center gap-1.5',
                                    pathname.startsWith('/projects') ? 'text-foreground bg-muted shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                )}
                            >
                                {pathname.startsWith('/projects') && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                                <span>Projects</span>
                            </Link>

                            <Link
                                href="/experience"
                                className={cn(
                                    'relative px-4 py-2 text-xs md:text-sm font-bold transition-all duration-300 rounded-full flex items-center gap-1.5',
                                    pathname.startsWith('/experience') ? 'text-foreground bg-muted shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                )}
                            >
                                {pathname.startsWith('/experience') && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                                <span>Experience</span>
                            </Link>

                            <Link
                                href="/blog"
                                className={cn(
                                    'relative px-4 py-2 text-xs md:text-sm font-bold transition-all duration-300 rounded-full flex items-center gap-1.5',
                                    pathname.startsWith('/blog') ? 'text-foreground bg-muted shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                )}
                            >
                                {pathname.startsWith('/blog') && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                                <span>Blog</span>
                            </Link>

                            <Link
                                href="/skills"
                                className={cn(
                                    'relative px-4 py-2 text-xs md:text-sm font-bold transition-all duration-300 rounded-full flex items-center gap-1.5',
                                    pathname.startsWith('/skills') ? 'text-foreground bg-muted shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                )}
                            >
                                {pathname.startsWith('/skills') && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                                <span>Skills</span>
                            </Link>

                            <Link
                                href="/achievements"
                                className={cn(
                                    'relative px-4 py-2 text-xs md:text-sm font-bold transition-all duration-300 rounded-full flex items-center gap-1.5',
                                    pathname.startsWith('/achievements') ? 'text-foreground bg-muted shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                )}
                            >
                                {pathname.startsWith('/achievements') && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                                <span>Achievements</span>
                            </Link>

                            <Link
                                href="/contact"
                                className={cn(
                                    'relative px-4 py-2 text-xs md:text-sm font-bold transition-all duration-300 rounded-full flex items-center gap-1.5',
                                    pathname === '/contact' ? 'text-foreground bg-muted shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                )}
                            >
                                {pathname === '/contact' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                                <span>{t('contact')}</span>
                            </Link>

                            <CardNav
                                items={navItems}
                                theme={isDark ? 'dark' : 'light'}
                                pathname={pathname}
                            />

                            {mounted && (
                                <AnimatedThemeToggler className="ml-1" />
                            )}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="lg:hidden">
                                {mounted && (
                                    <AnimatedThemeToggler />
                                )}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleMenu}
                                className="p-2 md:p-2.5 rounded-full bg-muted/80 hover:bg-muted transition-colors lg:hidden"
                                aria-label="Toggle menu"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={isMenuOpen ? 'close' : 'menu'}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.nav>

            {/* Floating Mobile Dock */}
            <MobileDock onToggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

            {/* Mobile Menu Bento Grid Overlay */}
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
                            <div className="w-full max-w-sm flex flex-col items-center">
                                <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-primary mb-4">
                                    DIRECT DIRECTORY
                                </span>

                                {/* Bento Grid of Primary Hubs */}
                                <div className="grid grid-cols-2 gap-3 w-full my-4">
                                    {[
                                        { label: 'Projects', href: '/projects', icon: Rocket, desc: 'Builds & Architectures', color: 'from-sky-500/20 to-blue-600/10 border-sky-500/30' },
                                        { label: 'Experience', href: '/experience', icon: Briefcase, desc: 'Work & Leadership', color: 'from-purple-500/20 to-indigo-600/10 border-purple-500/30' },
                                        { label: 'Blog', href: '/blog', icon: BookOpen, desc: 'Cyber & AI Insights', color: 'from-amber-500/20 to-orange-600/10 border-amber-500/30' },
                                        { label: 'Skills', href: '/skills', icon: Code2, desc: 'Tech Stack & Core', color: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/30' },
                                        { label: 'Achievements', href: '/achievements', icon: Trophy, desc: 'Milestones & Awards', color: 'from-pink-500/20 to-rose-600/10 border-pink-500/30' },
                                        { label: 'Contact', href: '/contact', icon: Send, desc: "Let's Connect", color: 'from-cyan-500/20 to-blue-600/10 border-cyan-500/30' },
                                    ].map((item) => {
                                        const Icon = item.icon;
                                        const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(`${item.href}/`));

                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                onClick={closeMenu}
                                                className={cn(
                                                    "flex flex-col justify-between p-4 rounded-2xl border bg-gradient-to-br transition-all duration-300 active:scale-95",
                                                    item.color,
                                                    isActive ? "ring-2 ring-emerald-400 shadow-lg" : "hover:border-white/40"
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

                                <div className="flex items-center justify-center gap-4 mt-6 w-full pt-4 border-t border-foreground/10">
                                    <Link
                                        href="/gallery"
                                        onClick={closeMenu}
                                        className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground uppercase tracking-wider"
                                    >
                                        Gallery <ArrowUpRight className="w-3.5 h-3.5" />
                                    </Link>
                                    <span className="text-foreground/20">•</span>
                                    <Link
                                        href="/resume"
                                        onClick={closeMenu}
                                        className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground uppercase tracking-wider"
                                    >
                                        Resume <ArrowUpRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-8">
                                {mounted && (
                                    <AnimatedThemeToggler />
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
