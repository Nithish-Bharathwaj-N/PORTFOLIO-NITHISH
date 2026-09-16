'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, AlertCircle, Loader2, Disc, Music, ArrowUpRight, Sparkles, HelpCircle, MessageSquare, ExternalLink, Github, Linkedin, Twitter, Instagram, ChevronDown, Mail, Phone, MapPin, Copy, Check, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';
import dynamic from 'next/dynamic';

const Lanyard = dynamic<{ position?: [number, number, number], gravity?: [number, number, number], fov?: number, isLowPowerMode?: boolean }>(() => import('@/components/three/Lanyard').then(mod => mod.Lanyard), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-transparent"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
});

const DynamicScrollVelocity = dynamic(() => import('@/components/ui/ScrollVelocity'), { ssr: false });
const Meteors = dynamic(() => import('@/components/ui/meteors').then(mod => mod.Meteors), { ssr: false });

import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { DeferredMount } from '@/components/ui/DeferredMount';
import { ProfileIDCard } from '@/components/ui/ProfileIDCard';

function DirectContactCards() {
    const [copiedEmail, setCopiedEmail] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(portfolioData.personal.email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const githubLink = portfolioData.personal.socialLinks.find(s => s.platform === 'GitHub')?.url || 'https://github.com/Nithish-Bharathwaj-N';
    const linkedinLink = portfolioData.personal.socialLinks.find(s => s.platform === 'LinkedIn')?.url || 'https://www.linkedin.com/in/nithish-bharathwaj-n-847a00379';
    const leetcodeLink = portfolioData.personal.socialLinks.find(s => s.platform === 'LeetCode')?.url || 'https://leetcode.com/u/nithish_cit/';

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full mb-12">
            {/* GitHub Card */}
            <div className="group relative p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-purple-500/50 hover:bg-white/[0.08] transition-all duration-300 shadow-xl flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                        <Github className="w-6 h-6" />
                    </div>
                    <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 transition-colors"
                        title="View GitHub Profile"
                    >
                        <span>Profile</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                </div>
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">GitHub Profile</span>
                    <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-base font-bold text-foreground hover:text-purple-400 transition-colors truncate mt-1"
                    >
                        @Nithish-Bharathwaj-N
                    </a>
                </div>
            </div>

            {/* LinkedIn Card */}
            <div className="group relative p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-blue-500/50 hover:bg-white/[0.08] transition-all duration-300 shadow-xl flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                        <Linkedin className="w-6 h-6" />
                    </div>
                    <a
                        href={linkedinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20 transition-colors"
                        title="Connect on LinkedIn"
                    >
                        <span>Connect</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                </div>
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">LinkedIn Network</span>
                    <a
                        href={linkedinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-base font-bold text-foreground hover:text-blue-400 transition-colors truncate mt-1"
                    >
                        Nithish Bharathwaj N
                    </a>
                </div>
            </div>

            {/* LeetCode Card */}
            <div className="group relative p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-amber-500/50 hover:bg-white/[0.08] transition-all duration-300 shadow-xl flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                        <Code className="w-6 h-6" />
                    </div>
                    <a
                        href={leetcodeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20 transition-colors"
                        title="View LeetCode Stats"
                    >
                        <span>1771 Rating</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                </div>
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">LeetCode (500+ Solved)</span>
                    <a
                        href={leetcodeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-base font-bold text-foreground hover:text-amber-400 transition-colors truncate mt-1"
                    >
                        @nithish_cit
                    </a>
                </div>
            </div>

            {/* Direct Email Card */}
            <div className="group relative p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-emerald-500/50 hover:bg-white/[0.08] transition-all duration-300 shadow-xl flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6" />
                    </div>
                    <button
                        onClick={handleCopyEmail}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 transition-colors"
                        title="Copy email address"
                    >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                    </button>
                </div>
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Direct Email</span>
                    <a
                        href={`mailto:${portfolioData.personal.email}`}
                        className="block text-base font-bold text-foreground hover:text-emerald-400 transition-colors truncate mt-1"
                    >
                        {portfolioData.personal.email}
                    </a>
                </div>
            </div>

            {/* Phone Card */}
            <div className="group relative p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-500/50 hover:bg-white/[0.08] transition-all duration-300 shadow-xl flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
                        <Phone className="w-6 h-6" />
                    </div>
                    <a
                        href={`tel:${portfolioData.personal.phone}`}
                        className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20 transition-colors"
                    >
                        <span>Call</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                </div>
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Phone / WhatsApp</span>
                    <p className="text-base font-bold text-foreground mt-1">
                        {portfolioData.personal.phone}
                    </p>
                </div>
            </div>

            {/* Location & Status Card */}
            <div className="group relative p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-rose-500/50 hover:bg-white/[0.08] transition-all duration-300 shadow-xl flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20 group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Available
                    </div>
                </div>
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Location</span>
                    <p className="text-base font-bold text-foreground mt-1">
                        {portfolioData.personal.location}
                    </p>
                </div>
            </div>
        </div>
    );
}

function SocialTicker({ items, direction = 'left', speed = 30, isLowPowerMode = false }: { items: any[], direction?: 'left' | 'right', speed?: number, isLowPowerMode?: boolean }) {
    const multipliedItems = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items];

    return (
        <div className="flex overflow-hidden relative w-full group/ticker py-4 select-none">
            <motion.div
                className="flex flex-nowrap hover:[animation-play-state:paused]"
                initial={{ x: direction === 'left' ? 0 : '-50%' }}
                animate={isLowPowerMode ? { x: direction === 'left' ? 0 : '-50%' } : { x: direction === 'left' ? '-50%' : 0 }}
                transition={{
                    ease: "linear",
                    duration: speed * 4,
                    repeat: Infinity,
                }}
                style={{ width: "max-content" }}
            >
                {multipliedItems.map((item, idx) => (
                    <div key={`${item.name}-${idx}`} className="pr-4">
                        <SocialCard item={item} />
                    </div>
                ))}
            </motion.div>

            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
    );
}

const socialIconsMap: Record<string, React.ElementType> = {
    github: Github,
    linkedin: Linkedin,
    leetcode: Code,
    email: Mail,
    twitter: Twitter,
    instagram: Instagram,
    discord: Disc,
    spotify: Music
};

function SocialCard({ item }: { item: any }) {
    const Icon = item.image || ArrowUpRight;
    return (
        <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-[140px] w-[240px] sm:w-[280px] flex-col justify-between rounded-3xl border border-neutral-200 dark:border-white/5 bg-white dark:bg-white/[0.02] p-6 shadow-sm dark:shadow-2xl transition-all hover:bg-neutral-50 dark:hover:bg-white/5 hover:border-neutral-300 hover:scale-[1.02] hover:-translate-y-1 backdrop-blur-md overflow-hidden flex-shrink-0"
        >
            <div className="absolute -top-6 -right-6 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity transform group-hover:scale-125 duration-700">
                <Icon className="w-40 h-40" />
            </div>

            <div className="relative z-10 flex items-center gap-4">
                <div className="relative h-12 w-12 flex items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-inner ring-1 ring-white/5">
                    <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col truncate">
                    <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">{item.name}</span>
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground/80 truncate">{item.username}</span>
                </div>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-auto pt-4 border-t border-border">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 group-hover:text-foreground/70 transition-colors">
                    {item.body || "Connect"}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary opacity-50 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </div>
        </a>
    );
}

const InputGroup = ({ label, name, type = "text", value, onChange, required = false }: any) => {
    return (
        <div className="group relative z-0 w-full mb-10">
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    rows={2}
                    className="peer block w-full appearance-none border-0 border-b-2 border-foreground/20 bg-transparent py-2.5 px-0 text-xl font-medium text-foreground focus:border-foreground focus:outline-none focus:ring-0 transition-colors duration-300 resize-y min-h-[70px] max-h-[200px]"
                    placeholder=" "
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="peer block w-full appearance-none border-0 border-b-2 border-foreground/20 bg-transparent py-2.5 px-0 text-xl font-medium text-foreground focus:border-foreground focus:outline-none focus:ring-0 transition-colors duration-300"
                    placeholder=" "
                />
            )}
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-8 scale-75 transform text-sm font-bold tracking-widest text-muted-foreground duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-foreground">
                {label.toUpperCase()}
            </label>
        </div>
    );
};

function ContactForm() {
    const t = useTranslations('contact');
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const subjectPresets = [
        "Full-Time Engineering Role",
        "Freelance AI / Web Project",
        "CTF / Security Research",
        "General Inquiry"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        } finally {
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const getMessageLabel = () => {
        if (formData.subject === "Full-Time Engineering Role") {
            return "Tell me about the role or opportunity...";
        } else if (formData.subject === "Freelance AI / Web Project") {
            return "Tell me about your project...";
        } else if (formData.subject === "CTF / Security Research") {
            return "Tell me about the security inquiry...";
        } else if (formData.subject === "General Inquiry") {
            return "How can I help you?...";
        }
        return t('form.messagePlaceholder');
    };

    return (
        <div className="w-full relative z-20">
            {/* Direct Cards Stack */}
            <DirectContactCards />

            {/* Typography Header */}
            <div className="mb-12">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground relative z-10">
                    Let's Build Something Exceptional.
                </h2>
                <p className="text-base md:text-lg text-muted-foreground mt-3 font-light max-w-lg">
                    Whether you have an ambitious AI project, cybersecurity engineering position, or freelance idea — send me a message below.
                </p>
            </div>

            {/* Subject Preset Chips */}
            <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">Quick Topic Preset:</span>
                <div className="flex flex-wrap gap-2">
                    {subjectPresets.map((preset) => (
                        <button
                            key={preset}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, subject: preset }))}
                            className={cn(
                                "text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200",
                                formData.subject === preset
                                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                                    : "bg-white/5 border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10"
                            )}
                        >
                            {preset}
                        </button>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="w-full relative z-10">
                <InputGroup label={t('form.name')} name="name" value={formData.name} onChange={handleChange} required />
                <InputGroup label={t('form.email')} name="email" type="email" value={formData.email} onChange={handleChange} required />
                <InputGroup label={t('form.subject')} name="subject" value={formData.subject} onChange={handleChange} required />
                <InputGroup
                    label={getMessageLabel()}
                    name="message"
                    type="textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />

                {status === 'success' && (
                    <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3 text-sm font-semibold">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span>Message transmitted successfully! I will reply to your email shortly.</span>
                    </div>
                )}

                {status === 'error' && (
                    <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-3 text-sm font-semibold">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>Could not send message automatically. Please reach out directly to nithishbharathwajn@gmail.com</span>
                    </div>
                )}

                {/* Creative Large Button */}
                <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative w-full flex items-center justify-between border-b-2 border-foreground py-6 text-left hover:bg-foreground/5 transition-colors disabled:opacity-50"
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="text-2xl md:text-4xl font-bold tracking-tight text-foreground group-hover:pl-4 transition-all duration-300">
                        {status === 'loading' ? t('form.sending') : status === 'success' ? 'Message Sent!' : t('form.submit')}
                    </span>

                    <div className="relative overflow-hidden w-12 h-12 flex items-center justify-center rounded-full bg-foreground text-background group-hover:scale-110 transition-transform duration-500">
                        {status === 'loading' ? <Loader2 className="w-6 h-6 animate-spin" /> :
                            status === 'success' ? <CheckCircle className="w-6 h-6" /> :
                                <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                        }
                    </div>
                </motion.button>
            </form>
        </div>
    );
}

function FAQSection() {
    const t = useTranslations('contact');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            q: t('faqData.0.q'),
            a: t('faqData.0.a')
        },
        {
            q: t('faqData.1.q'),
            a: t('faqData.1.a')
        },
        {
            q: t('faqData.2.q'),
            a: t('faqData.2.a')
        },
        {
            q: t('faqData.3.q'),
            a: t('faqData.3.a')
        },
        {
            q: t('faqData.4.q'),
            a: t('faqData.4.a')
        }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto py-20 px-4 md:px-8">
            <div className="flex flex-col items-center mb-16 relative z-10 text-center">

                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Frequently Asked Questions</h2>
                <div className="h-1 w-20 bg-primary/20 rounded-full" />
            </div>

            <div className="space-y-0 relative z-10">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border-b border-border last:border-0"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full py-8 md:py-10 flex items-center justify-between text-left group"
                        >
                            <span className={cn(
                                "text-xl md:text-3xl font-bold tracking-tight transition-all duration-300",
                                openIndex === index ? "text-primary translate-x-2" : "text-foreground/90 group-hover:text-foreground group-hover:translate-x-1"
                            )}>
                                {faq.q}
                            </span>
                            <div className={cn(
                                "flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-border bg-primary/5 transition-all duration-500",
                                openIndex === index ? "rotate-180 bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]" : "text-muted-foreground group-hover:text-foreground group-hover:bg-primary/10"
                            )}>
                                <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                        </button>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-10 md:pb-14 text-lg md:text-xl text-muted-foreground/80 leading-relaxed max-w-4xl">
                                        {faq.a}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}

const socialDescriptions: Record<string, string> = {
    GitHub: "Code & Open Source",
    LinkedIn: "Professional Network",
    LeetCode: "500+ Solved (1771)",
    Email: "Direct Email Inquiry"
};

import { usePerformance } from '@/hooks/usePerformance';

export default function ContactPage() {
    const t = useTranslations('contact');
    const { isLowPowerMode } = usePerformance();

    const getSocialItem = (platform: string) => {
        const link = portfolioData.personal.socialLinks.find(l => l.platform.toLowerCase() === platform.toLowerCase());
        return {
            name: link?.platform || platform.charAt(0).toUpperCase() + platform.slice(1),
            username: link?.username || '@user',
            body: socialDescriptions[link?.platform || ''] || "Connect",
            image: socialIconsMap[platform.toLowerCase()] || ArrowUpRight,
            url: link?.url || '#'
        };
    };

    const row1Real = ['linkedin', 'github', 'leetcode', 'email'].map(getSocialItem);
    const row2Real = ['email', 'leetcode', 'github', 'linkedin'].map(getSocialItem);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const faqTriggerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: showFAQ } = useScroll({
        target: faqTriggerRef,
        offset: ["start end", "end end"]
    });

    const headerOpacity = useTransform(showFAQ, [0, 0.4], [1, 0.6]);
    const headerScale = useTransform(showFAQ, [0, 0.4], [1, 0.98]);
    const headerFilter = useTransform(showFAQ, [0, 0.4], ["blur(0px)", "blur(2px)"]);


    return (
        <div ref={containerRef} className="relative bg-background selection:bg-primary/20">
            {/* 2. HEADER & BACKGROUNDS */}
            <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none z-0" />
            <div className="fixed inset-0 bg-background/60 backdrop-blur-[2px] pointer-events-none z-0" />
            <DeferredMount>
                <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
                    {!isLowPowerMode && <Meteors number={50} />}
                </div>
            </DeferredMount>

            {/* 3. MAIN CONTENT: (Header + Form + Lanyard) */}
            <motion.div
                className="relative z-10"
                style={{
                    opacity: headerOpacity,
                    scale: isLowPowerMode ? 1 : headerScale,
                    filter: isLowPowerMode ? "none" : headerFilter,
                }}
            >

                {/* Header Section (Flows normally) */}
                <div className="relative w-full pt-28 sm:pt-40 md:pt-48 pb-10 sm:pb-16 md:pb-20 overflow-hidden">
                    <div className="w-full flex items-center justify-center opacity-20 select-none pointer-events-none">
                        <DynamicScrollVelocity
                            texts={[t('hero.ticker.build'), t('hero.ticker.freelance')]}
                            velocity={20}
                            className="text-4xl sm:text-7xl md:text-[9rem] font-black tracking-tight uppercase whitespace-nowrap"
                            isLowPowerMode={isLowPowerMode}
                        />
                    </div>
                </div>

                {/* Interaction Section (Lanyard + Social + Form) */}
                {/* We keep this relative and stable. No shrinking or fading here. */}
                <div className="container-creative px-4 md:px-8 max-w-[1800px] mx-auto pb-40">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                        {/* LEFT COLUMN: Lanyard / Profile ID Card */}
                        <div className="col-span-1 lg:col-span-4 relative lg:sticky top-28 h-auto min-h-[520px] sm:min-h-[620px] lg:h-[780px] flex items-center justify-center z-20 overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01]">
                            {/* Anchor Slot/Bar for Lanyard */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 md:w-64 lg:w-80 h-2 bg-gradient-to-r from-transparent via-foreground/20 to-transparent blur-[2px] rounded-full z-30 mt-[-1px]" />
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 md:w-32 lg:w-40 h-[3px] bg-gradient-to-r from-transparent via-foreground/40 to-transparent rounded-full z-30" />

                            <DeferredMount fallback={<div className="w-full h-full flex items-center justify-center opacity-50"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
                                <div className="w-full h-full pointer-events-auto flex items-center justify-center">
                                    {!isLowPowerMode ? (
                                        <ErrorBoundary fallback={<ProfileIDCard />}>
                                            <Lanyard position={[0, 0, 13]} fov={20} gravity={[0, -40, 0]} isLowPowerMode={isLowPowerMode} />
                                        </ErrorBoundary>
                                    ) : (
                                        <ProfileIDCard />
                                    )}
                                </div>
                            </DeferredMount>
                        </div>

                        {/* RIGHT COLUMN: Content Stack */}
                        <div className="col-span-1 lg:col-span-8 flex flex-col gap-16 relative z-10 pt-10 lg:pt-0">

                            {/* Social Connect */}
                            <motion.div
                                className="w-full"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex flex-col gap-1">
                                    <SocialTicker items={row1Real} direction="right" speed={50} isLowPowerMode={isLowPowerMode} />
                                    <SocialTicker items={row2Real} direction="left" speed={50} isLowPowerMode={isLowPowerMode} />
                                </div>
                            </motion.div>

                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <ContactForm />
                            </motion.div>


                        </div>
                    </div>
                </div>

                {/* FAQ TRIGGER ZONE: Positioned after the form to initiate the cover */}
                {/* Massive 100vh runway for the most natural transition trip possible */}
                <div ref={faqTriggerRef} className="h-[100vh] w-full pointer-events-none" />
            </motion.div >

            {/* 4. FAQ SECTION: The "Full Viewport Cover" Layer */}
            < motion.section
                className="relative z-50 bg-background overflow-hidden"
                style={{
                    y: useTransform(showFAQ, [0, 1], ["100vh", "0vh"]),
                    marginTop: "-100vh",
                }
                }
            >
                {/* Dedicated Meteors for FAQ Section - Reduced count */}
                <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
                    {!isLowPowerMode && <Meteors number={30} />}
                </div>

                {/* Ultra-Smooth Sheet Edge: Tallest gradient for deep cinematic transition */}
                < div className="absolute top-0 left-0 right-0 h-[40rem] bg-gradient-to-t from-background via-background/95 to-transparent -translate-y-full pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <div className="container-creative px-4 md:px-8 max-w-[1700px] mx-auto py-32 pb-32 relative z-10">
                    <FAQSection />
                </div>
            </motion.section >
        </div >
    );
}
