"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import {
  ShieldCheck, Network, Brain, Trophy, Flame,
  ShieldAlert, MessageSquare, Layers, Sparkles, Cpu
} from "lucide-react";

const skillIcons: Record<string, any> = {
  'Security-First Mindset': ShieldCheck,
  'Systemic & Algorithmic Thinking': Network,
  'Applied AI Innovation': Brain,
  'Hackathon Team Leadership': Trophy,
  'Continuous Technical Mastery': Flame,
  'Crisis Management & Resilience': ShieldAlert,
  'Technical Communication': MessageSquare,
  'Cross-Domain Synergy': Layers,
};

const allCards = portfolioData.softSkills.map((skill, index) => ({
  id: index + 1,
  title: skill.name,
  description: skill.description,
  Icon: skillIcons[skill.name] || Sparkles
}));

export const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

  return (
    <section
      ref={targetRef}
      className="relative h-[350vh] bg-background"
    >
      <div className="sticky top-0 flex flex-col h-screen overflow-hidden pb-8 md:pb-12">

        {/* Title Section */}
        <div className="w-full px-6 md:px-24 pt-6 md:pt-8 lg:pt-12 z-20 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/40 leading-[0.9] pb-2">
              Strategic Directives
            </h2>
            <div className="w-20 h-1.5 bg-primary mt-4 mb-4 rounded-full opacity-80"></div>
            <p className="text-muted-foreground text-base md:text-lg lg:text-xl font-medium max-w-2xl leading-relaxed">
              Interpersonal capabilities engineered for high-impact leadership and systemic problem solving in complex environments.
            </p>
          </motion.div>
        </div>

        {/* Carousel Items */}
        <div className="flex-1 flex items-center w-full relative mt-4 lg:mt-6">
          <motion.div style={{ x }} className="flex gap-6 md:gap-8 px-6 md:px-24 absolute w-max">
            {allCards.map((card) => {
              return <Card card={card} key={card.id} />;
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: typeof allCards[0] }) => {
  const { Icon } = card;
  return (
    <div
      key={card.id}
      className="group relative h-[320px] w-[240px] sm:h-[360px] sm:w-[280px] md:h-[400px] md:w-[320px] lg:h-[440px] lg:w-[380px] overflow-hidden bg-card/20 hover:bg-card/40 border border-border/80 shadow-sm flex-shrink-0 transition-colors duration-500 rounded-2xl max-h-[50vh] lg:max-h-[60vh]"
    >
      {/* Sci-fi Corner Brackets (On Hover) */}
      <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-[2px] border-l-[2px] border-primary opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 transform -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
      <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t-[2px] border-r-[2px] border-primary opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 transform translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
      <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b-[2px] border-l-[2px] border-primary opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 transform -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
      <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-[2px] border-r-[2px] border-primary opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />

      {/* Cyber Watermark Icon Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center p-6 sm:p-8 transition-transform duration-700 group-hover:scale-110 opacity-15 group-hover:opacity-30 pointer-events-none">
        <Icon className="w-48 h-48 sm:w-64 sm:h-64 text-primary stroke-[1]" />
      </div>

      {/* Ambient Radial Gradient Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500 pointer-events-none" />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/70 to-transparent transition-opacity duration-500 opacity-90 group-hover:opacity-100 pointer-events-none"></div>

      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8 lg:p-10 pointer-events-none">
        <div className="flex items-center gap-3 mb-3 lg:mb-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div className="p-2.5 border border-primary/30 bg-primary/10 backdrop-blur-md rounded-xl">
            <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
          </div>
          <span className="text-[10px] lg:text-xs font-mono text-primary font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
            DIRECTIVE #{String(card.id).padStart(2, '0')}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase text-foreground mb-2 lg:mb-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75 leading-tight">
          {card.title}
        </h3>

        <p className="text-muted-foreground text-xs sm:text-sm lg:text-base leading-relaxed opacity-80 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-150 border-t border-border/50 pt-3 lg:pt-4">
          {card.description}
        </p>
      </div>
    </div>
  );
};

export default HorizontalScrollCarousel;

