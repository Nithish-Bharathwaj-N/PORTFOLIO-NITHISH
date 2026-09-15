"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Trophy, Flame, Code2, Star, ArrowUpRight, Target, Zap, Medal } from "lucide-react";
import Link from "next/link";

const LEETCODE_USER = "nithish_cit";
const LEETCODE_PROFILE = "https://leetcode.com/u/nithish_cit/";

// Nithish's REAL LeetCode stats (from profile)
const STATS = {
  totalSolved: 551,
  contestRating: 1788,
  highestRating: 1791,
  streak: 118,
  globalRank: "#171557",
  easy: 240,
  medium: 277,
  hard: 34,
  badges: ["50 Days Badge", "100 Days Badge", "Knight"],
};

const RECENT_TOPICS = [
  { name: "Tree / BFS / DFS", count: 85, color: "#22c55e" },
  { name: "Dynamic Programming", count: 72, color: "#f97316" },
  { name: "Graph Theory", count: 54, color: "#3b82f6" },
  { name: "Binary Search", count: 48, color: "#a855f7" },
  { name: "Sliding Window", count: 41, color: "#ec4899" },
];

const Counter = ({
  value,
  duration = 1.5,
  suffix = "",
}: {
  value: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && value > 0) {
      const controls = animate(0, value, {
        duration,
        onUpdate: (latest) => setCount(Math.floor(latest)),
        ease: "easeOut",
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const DifficultyBar = ({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const pct = Math.round((count / total) * 100);

  return (
    <div ref={ref} className="space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span style={{ color }}>{label}</span>
        <span className="text-foreground font-mono font-semibold">{count}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
};

export const LeetCodeShowcase = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      id="leetcode-stats"
      className="w-full max-w-[1700px] mx-auto px-6 pt-10 pb-16 md:pt-14 md:pb-20"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.18em] text-[#FFA116] uppercase">
              <Code2 className="w-3.5 h-3.5" />
              LeetCode Profile · @{LEETCODE_USER}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            Sharpening{" "}
            <span className="text-[#FFA116]">Algorithms,</span>
            <br />
            One Problem at a Time.
          </h2>
          <p className="text-muted-foreground max-w-xl text-base leading-relaxed">
            Contest rating{" "}
            <span className="text-foreground font-semibold">1788</span> · Highest{" "}
            <span className="text-[#FFA116] font-semibold">1791</span> · 551 problems solved with a{" "}
            <span className="text-red-400 font-semibold">118-day</span> continuous streak.
          </p>
        </div>

        <Link
          href={LEETCODE_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 border border-white/10 hover:border-[#FFA116]/50 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-[#FFA116]/5 self-start md:self-auto whitespace-nowrap"
        >
          View Profile
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Contest Rating", value: STATS.contestRating, icon: Trophy, color: "#FFA116" },
          { label: "Problems Solved", value: STATS.totalSolved, icon: Target, color: "#22c55e" },
          { label: "Day Streak", value: STATS.streak, icon: Flame, color: "#ef4444", suffix: "d" },
          { label: "Global Rank", value: STATS.globalRank, icon: Medal, color: "#a855f7", isText: true },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-5 group hover:border-white/15 transition-all duration-300"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${stat.color}18 0%, transparent 70%)`,
              }}
            />
            <stat.icon className="w-5 h-5 mb-3" style={{ color: stat.color }} />
            <div className="text-2xl font-bold font-mono tracking-tight text-foreground">
              {stat.isText ? (
                stat.value
              ) : (
                <Counter value={stat.value as number} suffix={(stat as any).suffix ?? ""} />
              )}
            </div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Bottom: Difficulty + Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Difficulty Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 space-y-3"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-[#FFA116]" />
            <span className="text-sm font-semibold text-foreground">Difficulty Breakdown</span>
            <span className="ml-auto text-xs font-mono text-muted-foreground">
              Highest: <span className="text-[#FFA116]">{STATS.highestRating}</span>
            </span>
          </div>
          <DifficultyBar label="Easy" count={STATS.easy} total={STATS.totalSolved} color="#22c55e" />
          <DifficultyBar label="Medium" count={STATS.medium} total={STATS.totalSolved} color="#FFA116" />
          <DifficultyBar label="Hard" count={STATS.hard} total={STATS.totalSolved} color="#ef4444" />
          <div className="pt-2 border-t border-white/5 flex justify-between text-xs text-muted-foreground">
            <span>Total Solved</span>
            <span className="text-foreground font-mono font-bold">{STATS.totalSolved}</span>
          </div>
        </motion.div>

        {/* Top Problem Categories */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 space-y-3"
        >
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-[#FFA116]" />
            <span className="text-sm font-semibold text-foreground">Top Problem Categories</span>
          </div>
          {RECENT_TOPICS.map((topic, i) => (
            <motion.div
              key={topic.name}
              initial={{ opacity: 0, x: 10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: topic.color }}
                />
                <span className="text-sm text-muted-foreground truncate">{topic.name}</span>
              </div>
              <span className="text-sm font-mono font-bold text-foreground flex-shrink-0">
                {topic.count}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Badge row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-5 flex flex-wrap gap-3 items-center"
      >
        <span className="text-xs text-muted-foreground font-medium">Earned Badges:</span>
        {STATS.badges.map((badge) => (
          <span
            key={badge}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-[#FFA116]/30 bg-[#FFA116]/10 text-[#FFA116]"
          >
            <Medal className="w-3 h-3" />
            {badge}
          </span>
        ))}
        <Link
          href={LEETCODE_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-muted-foreground hover:text-[#FFA116] transition-colors flex items-center gap-1"
        >
          @{LEETCODE_USER}
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </motion.div>
    </section>
  );
};

export default LeetCodeShowcase;
