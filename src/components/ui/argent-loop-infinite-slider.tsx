import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown, Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MagneticEffect from "@/components/ui/MagneticEffect";

import { useIsMobile } from "@/hooks/useIsMobile";

interface ProjectData {
  title: string;
  image: string;
  category: string;
  year: string;
  description: string;
  slug: string;
}

const PROJECT_DATA: ProjectData[] = [
  {
    title: "Securox",
    image: "/images/timeline-securox.png",
    category: "Cybersecurity",
    year: "2026",
    description: "Autonomous cyber risk intelligence & attack surface monitoring platform.",
    slug: "securox"
  },
  {
    title: "SubAERO",
    image: "/images/subaero-preview.jpg",
    category: "3D WebGL & AI Digital Twin",
    year: "2026",
    description: "Aerospace digital twin for HAL Tejas engines — Top 8 Aerothon 2026.",
    slug: "subaero"
  },
  {
    title: "Voyage AI",
    image: "/images/voyage-preview.jpg",
    category: "AI Application",
    year: "2026",
    description: "LLM-powered intelligent travel planner with prompt engineering.",
    slug: "voyage-ai"
  },
  {
    title: "Queue Cure",
    image: "/images/queuecure-preview.jpg",
    category: "Healthcare & IoT",
    year: "2025",
    description: "AI-powered smart healthcare queue management with real-time sync.",
    slug: "queue-cure"
  },
  {
    title: "FinSight",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop&fm=webp",
    category: "FinTech",
    year: "2025",
    description: "AI-driven financial analytics and modern banking dashboard.",
    slug: "finsight"
  },
];

export function ArgentLoopInfiniteSlider() {
  const isMobile = useIsMobile();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 30, mass: 1 });

  const projectArea = 0.85;
  const projectStep = projectArea / PROJECT_DATA.length; 
  const transWindow = 0.05; 

  const scrollMap = [0];
  const yMap = ["0vh"];
  const internalYMap = ["0px"];

  PROJECT_DATA.forEach((_, i) => {
    if (i === 0) return;
    const boundary = i * projectStep;
    scrollMap.push(boundary - transWindow / 2, boundary + transWindow / 2);
    yMap.push(`-${(i-1)*100}vh`, `-${i*100}vh`);
    internalYMap.push(`-${(i-1)*250}px`, `-${i*250}px`);
  });

  scrollMap.push(projectArea, 1);
  yMap.push(`-${(PROJECT_DATA.length-1)*100}vh`, `-${(PROJECT_DATA.length-1)*100}vh`);
  internalYMap.push(`-${(PROJECT_DATA.length-1)*250}px`, `-${(PROJECT_DATA.length-1)*250}px`);

  const currentY = useTransform(smoothProgress, scrollMap, yMap);
  const contentInternalY = useTransform(smoothProgress, scrollMap, internalYMap);

  const bgOpacity = useTransform(smoothProgress, [0, 0.05, projectArea, 1], [0, 1, 1, 0]);
  const mainUIOpacity = useTransform(smoothProgress, [0, 0.05, projectArea, 1], [0, 1, 1, 0]);
  const buttonOpacity = useTransform(smoothProgress, [projectArea, projectArea + 0.05], [0, 1]);
  const finalContainerY = useTransform(smoothProgress, [projectArea, projectArea + 0.05], ["0px", "-250px"]);
  const imageY = useTransform(smoothProgress, [0, 1], ["-12%", "12%"]);

  if (isMobile) {
    return (
      <div className="w-full bg-background px-4 py-12 flex flex-col gap-8 relative z-20">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/80 font-bold">
            Selected Work
          </span>
          <h3 className="text-3xl font-black uppercase tracking-tight text-foreground">
            Featured Projects
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            High-impact systems in cybersecurity, 3D WebGL, healthcare, and applied AI.
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
          {PROJECT_DATA.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="group relative flex flex-col gap-4 p-4 rounded-2xl border border-neutral-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-xl overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-neutral-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-white font-bold tracking-wider">
                  {(i + 1).toString().padStart(2, "0")}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md text-[10px] font-bold text-foreground">
                  {project.year}
                </div>
              </div>

              {/* Text info */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase text-primary font-semibold">
                    {project.category}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-foreground tracking-tight">
                  {project.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  {project.description}
                </p>
              </div>

              {/* Action Link */}
              <Link
                href={`/projects/${project.slug}`}
                className="mt-1 inline-flex items-center gap-2 text-xs font-bold text-foreground hover:text-primary transition-colors self-start"
              >
                <span>Explore Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="flex items-center justify-center pt-2">
          <Link
            href="/projects"
            className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-foreground text-background font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <style>{`
        .argent-slider-wrapper {
            position: sticky;
            top: 0;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            background: hsl(var(--background));
            z-index: 20;
        }
        .project-list {
            position: absolute;
            width: 100%;
            height: 100%;
            will-change: transform;
        }
        .project {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .project img {
            width: 100%;
            height: 124%;
            object-fit: cover;
            filter: brightness(0.3) blur(10px);
            transform: scale(1.05);
            will-change: transform;
        }
        .mist-overlay {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at center, transparent 20%, hsl(var(--background) / 0.8) 100%);
            z-index: 5;
            pointer-events: none;
        }
        .minimap-bar-outer {
            width: 85vw;
            height: 250px;
            background: white !important;
            box-shadow: 0 50px 120px -30px rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            overflow: hidden;
        }
        .minimap-content-viewport {
            position: relative;
            width: 100%;
            height: 100%;
        }
        .minimap-img-preview {
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            width: 440px;
            height: 100%;
            overflow: hidden;
            z-index: 10;
        }
        .minimap-img-item {
            position: absolute;
            width: 100%;
            height: 100%;
            padding: 0.8rem 0;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .minimap-img-item img {
            display: block;
            margin: 0;
            will-change: transform;
        }
        .minimap-info-list {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 5;
        }
        .minimap-item-info {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 2.25rem 3.5%;
            font-family: 'Inter', sans-serif;
            color: black !important;
            text-transform: uppercase;
        }
        .minimap-item-info-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            width: 100%;
        }
        .minimap-item-info-row p {
            margin: 0;
            font-size: 10px;
            letter-spacing: 0.2em;
            font-weight: 800;
        }
        .minimap-item-info-row:nth-child(2) p { color: #666; font-weight: 700; }
        .minimap-item-info-row:nth-child(3) p { color: #999; font-weight: 500; font-size: 9.5px; text-transform: lowercase; }
        
        /* DEFAULT (Light Mode) Base State */
        .custom-btn {
            background: black;
            color: white;
            border-radius: 9999px;
            padding: 1.25rem 3rem;
            font-weight: 800;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            display: flex;
            align-items: center;
            gap: 0.6rem;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .custom-btn-arrow,
        .custom-btn-github {
            background: black;
            color: white;
            width: 58px;
            height: 58px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* DARK MODE Base State */
        .dark .custom-btn,
        .dark .custom-btn-arrow,
        .dark .custom-btn-github {
            background: white;
            color: black;
        }

        /* Independent GitHub hover */
        .custom-btn-github:hover {
            background: #c1e44a !important;
            color: black !important;
        }

        /* Synchronized View More + Arrow hover */
        .group-projects:hover .custom-btn,
        .group-projects:hover .custom-btn-arrow {
            background: #c1e44a !important;
            color: black !important;
        }

        .slide-overlay {
            position: absolute;
            bottom: 3rem;
            left: 5%;
            z-index: 110;
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }
        .slide-line {
            width: 140px;
            height: 1px;
            position: relative;
        }
        .slide-progress {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            will-change: width;
        }
      `}</style>
      
      <div className="argent-slider-wrapper">
        <motion.div style={{ opacity: bgOpacity }}>
          <div className="mist-overlay" />
          <motion.div className="project-list" style={{ y: currentY }}>
            {PROJECT_DATA.map((data, i) => (
              <div key={i} className="project" style={{ top: `${i * 100}vh` }}>
                <motion.img src={data.image} alt={data.title} style={{ y: imageY }} />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <motion.div 
            style={{ y: finalContainerY, willChange: "transform" }}
            className="flex flex-col items-center"
          >
            <motion.div style={{ opacity: mainUIOpacity }} className="minimap-bar-outer">
              <div className="minimap-content-viewport">
                <div className="minimap-img-preview">
                  <motion.div style={{ y: contentInternalY }} className="w-full h-full relative">
                    {PROJECT_DATA.map((data, i) => (
                      <div key={i} className="minimap-img-item" style={{ top: `${i * 250}px` }}>
                        <img src={data.image} alt={data.title} className="block w-full h-full object-cover" />
                      </div>
                    ))}
                  </motion.div>
                </div>
                <div className="minimap-info-list">
                  <motion.div style={{ y: contentInternalY }} className="w-full h-full relative">
                    {PROJECT_DATA.map((data, i) => {
                      const num = (i + 1).toString().padStart(2, "0");
                      return (
                        <div key={i} className="minimap-item-info" style={{ top: `${i * 250}px` }}>
                          <div className="minimap-item-info-row">
                            <p className="font-medium opacity-100">{num}</p>
                            <h4 className="text-xl md:text-2xl font-medium tracking-tight uppercase text-right max-w-[45%] leading-tight">
                              {data.title}
                            </h4>
                          </div>
                          <div className="minimap-item-info-row">
                            <p className="text-neutral-600 font-medium">{data.category}</p>
                            <p className="font-medium tabular-nums text-neutral-600">{data.year}</p>
                          </div>
                          <div className="minimap-item-info-row">
                            <p className="lowercase opacity-80 font-medium leading-relaxed max-w-[35%] text-[10px]">
                              {data.description}
                            </p>
                            <Link 
                                href={`/projects/${data.slug}`} 
                                className="pointer-events-auto font-medium text-[10px] opacity-60 hover:opacity-100 hover:text-black transition-all duration-300 text-right group/link"
                            >
                              <span className="border-b border-black/10 group-hover/link:border-black pb-1">View More</span>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <div className="h-[200px] w-full flex items-center justify-center pt-10">
              <motion.div 
                style={{ 
                  opacity: buttonOpacity,
                  pointerEvents: useTransform(smoothProgress, (v) => v > projectArea ? "auto" : "none")
                }}
              >
                <div className="flex items-center gap-4 pointer-events-auto">
                  <MagneticEffect>
                    <a 
                      href="https://github.com/Nithish-Bharathwaj-N" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="custom-btn-github hover:scale-110 active:scale-95 transition-transform shadow-xl block"
                      title="GitHub Profile"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                  </MagneticEffect>
                  
                  <MagneticEffect>
                    <div className="group-projects flex items-center gap-2">
                      <Link href="/projects" className="custom-btn group-hover:scale-105 active:scale-95 group-hover:shadow-[0_0_30px_rgba(193,228,74,0.3)]">
                        View More
                      </Link>
                      <Link href="/projects" className="custom-btn-arrow group-hover:scale-110 active:scale-95 transition-transform shadow-xl">
                        <ArrowUpRight className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </MagneticEffect>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          style={{ opacity: useTransform(smoothProgress, [0, 0.05, projectArea, projectArea + 0.05], [0, 1, 1, 0]) }}
          className="slide-overlay"
        >
           <span className="text-foreground/40 font-mono text-[10px] tracking-[0.5em] uppercase">Page</span>
           <div className="slide-line bg-foreground/10">
              <motion.div 
                className="slide-progress bg-foreground" 
                style={{ width: useTransform(smoothProgress, [0, projectArea], ["0%", "100%"]) }} 
              />
           </div>
           <motion.span className="text-foreground font-mono text-[11px] tabular-nums font-bold">
              {useTransform(smoothProgress, (v) => {
               const idx = Math.min(Math.floor(v / projectStep), PROJECT_DATA.length - 1);
               return `${idx + 1} / ${PROJECT_DATA.length}`;
             })}
           </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
