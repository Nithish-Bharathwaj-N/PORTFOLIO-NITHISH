'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Github, Linkedin, Mail, Code2, FileText, ArrowUpRight,
  Shield, Zap, Trophy, Sparkles, ChevronDown, ExternalLink,
  Briefcase, GraduationCap, Star, Award, BookOpen, Globe,
  Terminal, Cpu, Database, Lock, Menu, X, Phone
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

// ─── Tiny helpers ────────────────────────────────────────────────────────────

const ACCENT = '#38bdf8'; // sky-400

function Tag({ children, color = 'sky' }: { children: React.ReactNode; color?: string }) {
  const palettes: Record<string, string> = {
    sky: 'bg-sky-500/10 text-sky-300 border-sky-500/25',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/25',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    pink: 'bg-pink-500/10 text-pink-300 border-pink-500/25',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold tracking-wide ${palettes[color] || palettes.sky}`}>
      {children}
    </span>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-6">
      <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-sky-400 block mb-1">{label}</span>
      <h2 className="text-2xl font-black text-white leading-tight">{title}</h2>
    </div>
  );
}

function Divider() {
  return <div className="w-full h-px bg-white/8 my-10" />;
}

// ─── Navigation bar ───────────────────────────────────────────────────────────

function MobileNav({ activeSection }: { activeSection: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-xl border-b border-white/8">
        <button onClick={() => scrollTo('hero')} className="font-mono font-black text-sm text-white tracking-widest">
          NBN<span className="text-sky-400">.</span>
        </button>
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/8 border border-white/10"
        >
          {menuOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-white" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
          >
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-3xl font-black transition-colors ${activeSection === item.id ? 'text-sky-400' : 'text-white/60'}`}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-8 flex gap-4">
              <a href="https://github.com/Nithish-Bharathwaj-N" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/8 border border-white/10">
                <Github className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.linkedin.com/in/nithish-bharathwaj-n-847a00379" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/8 border border-white/10">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a href="mailto:nithishbharathwajn@gmail.com" className="p-3 rounded-full bg-white/8 border border-white/10">
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* Mesh gradient bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(56,189,248,0.15),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.08),transparent_60%)]" />
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Portrait — right side, tall */}
      <div className="absolute right-0 top-0 w-[55%] h-[65vh] overflow-hidden">
        <Image
          src="/images/nithish-suit.jpg"
          alt="Nithish Bharathwaj N"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Fades */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col pt-24 pb-10 px-5 flex-1">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-5"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-emerald-400">Open to Opportunities</span>
        </motion.div>

        {/* Name + Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-5"
        >
          <h1 className="text-[2.6rem] font-black leading-[0.9] tracking-tighter text-white mb-2">
            NITHISH<br />
            <span className="text-sky-400">BHARATHWAJ</span>
          </h1>
          <p className="text-xs font-mono text-white/50 uppercase tracking-[0.15em] mt-3">
            Cybersecurity · AI · Full-Stack
          </p>
        </motion.div>

        {/* Specialty badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-2 mb-6"
        >
          <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-200 text-[10px] font-mono font-bold tracking-wide">
            <Shield className="w-3 h-3 text-cyan-400 shrink-0" />
            B.E. CSE (Cyber Security) · CIT
          </div>
          <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-200 text-[10px] font-mono font-bold tracking-wide">
            <Trophy className="w-3 h-3 text-amber-400 shrink-0 animate-pulse" />
            Top 8 · Aerothon 2026 (HAL × IIT Indore)
          </div>
          <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-200 text-[10px] font-mono font-bold tracking-wide">
            <Code2 className="w-3 h-3 text-purple-400 shrink-0" />
            LeetCode 1771 · 500+ Solved · 118-day streak
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3 flex-wrap mb-8"
        >
          <Link
            href="/contact"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-sky-500 text-black text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(56,189,248,0.4)]"
          >
            <Mail className="w-3.5 h-3.5" />
            Hire Me
          </Link>
          <a
            href="/NITHISH_BHARATHWAJ_N_Resume_2026-08-15.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/8 border border-white/15 text-white text-xs font-bold uppercase tracking-wider"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </a>
        </motion.div>

        {/* Quick stat row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-3 mt-auto"
        >
          {[
            { value: '5+', label: 'Hackathons' },
            { value: '500+', label: 'LeetCode' },
            { value: '8.48', label: 'CGPA' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center py-3 rounded-2xl bg-white/5 border border-white/8">
              <span className="text-xl font-black text-white">{s.value}</span>
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider mt-0.5">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 flex flex-col items-center pb-6 gap-1"
      >
        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4 text-white/30 animate-bounce" />
      </motion.div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="bg-black px-5 py-12">
      <SectionHeader label="01 · About" title="Who I Am" />

      {/* Photo + bio card */}
      <div className="flex gap-4 mb-6">
        <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-white/10">
          <Image src="/images/nithish-photo.jpg" alt="Nithish" fill className="object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold text-white">Nithish Bharathwaj N</p>
          <p className="text-[11px] text-white/50 mt-0.5">Chennai, Tamil Nadu, India</p>
          <p className="text-[11px] text-white/50">B.E. CSE (Cyber Security) · CIT</p>
          <p className="text-[11px] text-sky-400 mt-1 font-mono">CGPA 8.48 / 10</p>
        </div>
      </div>

      <p className="text-sm text-white/65 leading-relaxed mb-6">
        I&apos;m a Computer Science (Cyber Security) student at Chennai Institute of Technology, passionate about building software that <span className="text-white font-semibold">protects, predicts, and scales</span>. My expertise spans cybersecurity engineering, AI application development, and full-stack software engineering.
      </p>

      {/* Three pillars */}
      <div className="flex flex-col gap-3">
        {[
          { icon: Shield, color: 'text-cyan-400', bg: 'bg-cyan-950/50 border-cyan-500/25', label: 'Cybersecurity', desc: 'Threat monitoring · Attack surface analysis · CTFs · Securox platform' },
          { icon: Cpu, color: 'text-purple-400', bg: 'bg-purple-950/50 border-purple-500/25', label: 'AI Engineering', desc: 'LLMs · ML regression · Prompt engineering · AWS Gen-AI Intern' },
          { icon: Globe, color: 'text-sky-400', bg: 'bg-sky-950/50 border-sky-500/25', label: 'Full-Stack Dev', desc: 'React · Next.js · Node.js · FastAPI · Three.js · TypeScript' },
        ].map(({ icon: Icon, color, bg, label, desc }) => (
          <div key={label} className={`flex items-start gap-3 p-4 rounded-2xl border ${bg}`}>
            <Icon className={`w-5 h-5 ${color} shrink-0 mt-0.5`} />
            <div>
              <p className="text-sm font-bold text-white">{label}</p>
              <p className="text-[11px] text-white/50 mt-0.5 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────

function ProjectsSection() {
  const projects = portfolioData.projects;

  const categoryColors: Record<string, string> = {
    'Cybersecurity': 'sky',
    'AI Application': 'purple',
    'FinTech': 'emerald',
    '3D WebGL & AI Digital Twin': 'amber',
    'Healthcare & IoT': 'pink',
  };

  return (
    <section id="projects" className="bg-[#050505] px-5 py-12">
      <SectionHeader label="02 · Projects" title="What I've Built" />

      <div className="flex flex-col gap-4">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            className="rounded-2xl border border-white/8 overflow-hidden bg-white/[0.02]"
          >
            {/* Image */}
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={proj.image || '/images/subaero-preview.jpg'}
                alt={proj.title}
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              {/* Status */}
              <div className="absolute top-3 right-3">
                <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded-full ${proj.status === 'ongoing' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/10 text-white/50 border border-white/10'}`}>
                  {proj.status === 'ongoing' ? '● Live' : '✓ Done'}
                </span>
              </div>
              {/* Category tag */}
              <div className="absolute bottom-3 left-3">
                <Tag color={(proj.category ? categoryColors[proj.category as string] : undefined) ?? 'sky'}>{proj.category}</Tag>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-base font-black text-white leading-tight">{proj.title}</h3>
                <div className="flex gap-2 shrink-0">
                  {proj.repoUrl && (
                    <a href={proj.repoUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                      <Github className="w-3.5 h-3.5 text-white/60" />
                    </a>
                  )}
                  {proj.demoUrl && (
                    <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30">
                      <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-xs text-white/55 leading-relaxed mb-3">{proj.description}</p>

              {/* Highlights */}
              {proj.highlights && (
                <div className="flex flex-col gap-1 mb-3">
                  {proj.highlights.slice(0, 2).map((h) => (
                    <div key={h} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                      <span className="text-[11px] text-white/60">{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5">
                {proj.techStack.slice(0, 5).map((t) => (
                  <span key={t} className="text-[9px] font-mono text-white/40 px-2 py-0.5 rounded-full bg-white/5 border border-white/8">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Link
        href="/projects"
        className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-white/10 text-sm font-bold text-white/60 hover:text-white transition-colors"
      >
        View All Projects <ArrowUpRight className="w-4 h-4" />
      </Link>
    </section>
  );
}

// ─── Experience Section ───────────────────────────────────────────────────────

function ExperienceSection() {
  const key = portfolioData.experiences.slice(0, 6);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="experience" className="bg-black px-5 py-12">
      <SectionHeader label="03 · Experience" title="Where I've Worked" />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/60 via-white/10 to-transparent" />

        <div className="flex flex-col gap-0">
          {key.map((exp, i) => (
            <div key={exp.id} className="relative pl-10 pb-8">
              {/* Dot */}
              <div className={`absolute left-[13px] top-1 w-2.5 h-2.5 rounded-full border-2 ${exp.isOngoing ? 'bg-sky-400 border-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]' : 'bg-white/20 border-white/30'}`} />

              <button
                onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
                className="w-full text-left"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-0.5">{exp.customTimeline}</p>
                    <h3 className="text-sm font-black text-white leading-tight">{exp.position}</h3>
                    <p className="text-xs text-sky-400 mt-0.5">{exp.company}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-white/30 mt-1 shrink-0 transition-transform ${expanded === exp.id ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <AnimatePresence>
                {expanded === exp.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 border-t border-white/8 mt-3">
                      <p className="text-xs text-white/55 leading-relaxed mb-3">{exp.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.skills.slice(0, 6).map((s) => (
                          <Tag key={s} color="sky">{s}</Tag>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/experience"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-white/10 text-sm font-bold text-white/60"
      >
        Full Experience <ArrowUpRight className="w-4 h-4" />
      </Link>
    </section>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────

function SkillsSection() {
  const techGroups = [
    {
      label: 'Languages',
      icon: Terminal,
      color: 'text-sky-400',
      items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'SQL'],
    },
    {
      label: 'Frameworks',
      icon: Cpu,
      color: 'text-purple-400',
      items: ['React 19', 'Next.js', 'Node.js', 'Express.js', 'FastAPI', 'Tailwind CSS'],
    },
    {
      label: 'AI & ML',
      icon: Sparkles,
      color: 'text-amber-400',
      items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'LangChain', 'Gemini API', 'OpenCV'],
    },
    {
      label: 'Cybersecurity',
      icon: Lock,
      color: 'text-emerald-400',
      items: ['Kali Linux', 'CTF', 'Attack Surface Analysis', 'Network Security', 'Cryptography', 'CVE Assessment'],
    },
    {
      label: 'Tools & Cloud',
      icon: Database,
      color: 'text-pink-400',
      items: ['Docker', 'Git / GitHub', 'Vercel', 'AWS', 'Linux', 'Postman', 'Blender'],
    },
  ];

  return (
    <section id="skills" className="bg-[#050505] px-5 py-12">
      <SectionHeader label="04 · Skills" title="My Stack" />

      <div className="flex flex-col gap-4">
        {techGroups.map(({ label, icon: Icon, color, items }) => (
          <div key={label} className="p-4 rounded-2xl border border-white/8 bg-white/[0.02]">
            <div className="flex items-center gap-2 mb-3">
              <Icon className={`w-4 h-4 ${color}`} />
              <span className="text-xs font-black text-white uppercase tracking-wider">{label}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span key={item} className="text-[11px] font-mono text-white/60 px-2.5 py-1 rounded-lg bg-white/5 border border-white/8">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Soft skills */}
      <div className="mt-5 p-4 rounded-2xl border border-sky-500/20 bg-sky-950/10">
        <p className="text-[10px] font-mono text-sky-400 uppercase tracking-widest mb-3">Soft Skills</p>
        <div className="flex flex-col gap-2">
          {portfolioData.softSkills.slice(0, 4).map((s) => (
            <div key={s.name} className="flex items-start gap-2">
              <Star className="w-3 h-3 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white">{s.name}</p>
                <p className="text-[10px] text-white/40 leading-relaxed">{s.description?.slice(0, 70)}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Achievements Section ─────────────────────────────────────────────────────

function AchievementsSection() {
  const items = portfolioData.achievements.slice(0, 6);
  type IconFC = React.FC<{ className?: string }>;
  const iconMap: Record<string, IconFC> = {
    award: Trophy,
    certification: Award,
    recognition: Star,
    publication: BookOpen,
  };
  const colorMap: Record<string, string> = {
    award: 'text-amber-400 bg-amber-950/50 border-amber-500/25',
    certification: 'text-sky-400 bg-sky-950/50 border-sky-500/25',
    recognition: 'text-purple-400 bg-purple-950/50 border-purple-500/25',
    publication: 'text-emerald-400 bg-emerald-950/50 border-emerald-500/25',
  };

  return (
    <section className="bg-black px-5 py-12">
      <SectionHeader label="05 · Achievements" title="Recognition" />

      <div className="flex flex-col gap-3">
        {items.map((ach, i) => {
          const cat = ach.category as string;
          const IconComp: IconFC = (iconMap[cat] ?? Award) as IconFC;
          const colors = colorMap[cat] ?? colorMap['certification'];
          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-2xl border border-white/8 bg-white/[0.02]"
            >
              <div className={`p-2 rounded-xl border ${colors} shrink-0`}>
                <IconComp className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-white leading-tight mb-0.5">{ach.title}</p>
                <p className="text-[10px] text-white/40 mb-1">{ach.issuer}</p>
                <p className="text-[10px] text-white/50 leading-relaxed">{ach.description?.slice(0, 90)}...</p>
                {ach.credentialUrl && (
                  <a
                    href={ach.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-[10px] text-sky-400 font-mono"
                  >
                    View <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <Link
        href="/achievements"
        className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-white/10 text-sm font-bold text-white/60"
      >
        All Achievements <ArrowUpRight className="w-4 h-4" />
      </Link>
    </section>
  );
}

// ─── Blog Section ─────────────────────────────────────────────────────────────

function BlogSection() {
  const blogs = portfolioData.blogs.slice(0, 3);
  const catColors: Record<string, string> = {
    '3D & AI Engineering': 'amber',
    'Competitive Programming': 'purple',
    'Cybersecurity': 'sky',
    'AI & Full-Stack': 'emerald',
    'Healthcare Tech': 'pink',
  };

  return (
    <section className="bg-[#050505] px-5 py-12">
      <SectionHeader label="06 · Blog" title="Latest Writes" />

      <div className="flex flex-col gap-4">
        {blogs.map((blog, i) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Link href={`/blog/${blog.slug}`} className="block rounded-2xl border border-white/8 overflow-hidden bg-white/[0.02] active:scale-[0.98] transition-transform">
              <div className="relative h-32 w-full">
                <Image src={blog.image || '/images/nithish-about.jpg'} alt={blog.title} fill className="object-cover opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-2 left-3">
                  <Tag color={catColors[blog.category] || 'sky'}>{blog.category}</Tag>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="text-[9px] font-mono text-white/50">{blog.readTime}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-black text-white leading-tight mb-1">{blog.title}</h3>
                <p className="text-[11px] text-white/50 leading-relaxed">{blog.excerpt.slice(0, 90)}...</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <Link
        href="/blog"
        className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-white/10 text-sm font-bold text-white/60"
      >
        All Articles <ArrowUpRight className="w-4 h-4" />
      </Link>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" className="bg-black px-5 py-12 pb-24">
      <SectionHeader label="07 · Contact" title="Let's Connect" />

      <p className="text-sm text-white/55 leading-relaxed mb-8">
        Available for internships, freelance projects, and full-time roles in Cybersecurity, AI Engineering, or Full-Stack Development.
      </p>

      {/* Contact cards */}
      <div className="flex flex-col gap-3 mb-8">
        <a
          href="mailto:nithishbharathwajn@gmail.com"
          className="flex items-center gap-4 p-4 rounded-2xl border border-sky-500/20 bg-sky-950/10 active:scale-[0.98] transition-transform"
        >
          <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
            <Mail className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Email</p>
            <p className="text-[11px] text-white/50">nithishbharathwajn@gmail.com</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-sky-400 ml-auto" />
        </a>

        <a
          href="tel:+919363958388"
          className="flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/[0.02] active:scale-[0.98] transition-transform"
        >
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <Phone className="w-5 h-5 text-white/60" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Phone</p>
            <p className="text-[11px] text-white/50">+91 9363958388</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/30 ml-auto" />
        </a>

        <a
          href="https://github.com/Nithish-Bharathwaj-N"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/[0.02] active:scale-[0.98] transition-transform"
        >
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <Github className="w-5 h-5 text-white/60" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">GitHub</p>
            <p className="text-[11px] text-white/50">@Nithish-Bharathwaj-N</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/30 ml-auto" />
        </a>

        <a
          href="https://www.linkedin.com/in/nithish-bharathwaj-n-847a00379"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-2xl border border-blue-500/20 bg-blue-950/10 active:scale-[0.98] transition-transform"
        >
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <Linkedin className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">LinkedIn</p>
            <p className="text-[11px] text-white/50">Nithish Bharathwaj N</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-blue-400 ml-auto" />
        </a>
      </div>

      {/* CTA */}
      <Link
        href="/contact"
        className="block w-full py-4 rounded-2xl bg-sky-500 text-black text-sm font-black uppercase tracking-widest text-center shadow-[0_0_30px_rgba(56,189,248,0.3)]"
      >
        Send Me a Message →
      </Link>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-white/8 text-center">
        <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest">
          Nithish Bharathwaj N · Chennai, India · 2026
        </p>
        <p className="text-[10px] font-mono text-white/20 mt-1">
          Built with Next.js · TypeScript · Tailwind
        </p>
      </div>
    </section>
  );
}

// ─── Bottom Navigation Bar ────────────────────────────────────────────────────

function BottomNav({ active }: { active: string }) {
  const tabs = [
    { id: 'hero', icon: Globe, label: 'Home' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'experience', icon: GraduationCap, label: 'Exp' },
    { id: 'skills', icon: Terminal, label: 'Skills' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/8">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all"
          >
            <Icon className={`w-5 h-5 transition-colors ${active === id ? 'text-sky-400' : 'text-white/30'}`} />
            <span className={`text-[9px] font-mono transition-colors ${active === id ? 'text-sky-400' : 'text-white/25'}`}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export default function MobilePortfolio() {
  const [activeSection, setActiveSection] = useState('hero');

  // Intersection observer for section tracking
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'experience', 'skills', 'contact'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <MobileNav activeSection={activeSection} />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <AchievementsSection />
      <BlogSection />
      <ContactSection />
      <BottomNav active={activeSection} />
    </div>
  );
}
