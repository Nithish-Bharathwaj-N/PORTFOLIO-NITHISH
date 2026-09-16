<div align="center">

# ⚡ Nithish Bharathwaj N — Technical Portfolio

### Cybersecurity Engineer • AI Engineer • Full-Stack Developer

[![Live Portfolio](https://img.shields.io/badge/Live_Website-nithishbharathwaj.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://nithishbharathwaj.vercel.app?utm_source=github)

A high-performance, interactive portfolio engineered to showcase expertise across Cybersecurity, Artificial Intelligence, and Modern Web Engineering.

🌐 **Live Demo:** [https://nithishbharathwaj.vercel.app](https://nithishbharathwaj.vercel.app?utm_source=github)

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.170-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)

[![GitHub](https://img.shields.io/badge/GitHub-Nithish--Bharathwaj--N-181717?style=for-the-badge&logo=github)](https://github.com/Nithish-Bharathwaj-N)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/nithish-bharathwaj-n-847a00379)

---

![GitHub last commit](https://img.shields.io/github/last-commit/Nithish-Bharathwaj-N/PORTFOLIO-NITHISH?style=flat-square&color=6366f1)
![GitHub repo size](https://img.shields.io/github/repo-size/Nithish-Bharathwaj-N/PORTFOLIO-NITHISH?style=flat-square&color=a855f7)
![License](https://img.shields.io/badge/license-MIT-22c55e?style=flat-square)

</div>

---

## 🌟 Executive Overview

This repository houses the source code for the personal technical portfolio of **Nithish Bharathwaj N**. Engineered with production-grade web technologies, it features hardware-accelerated 3D WebGL physics, real-time developer telemetry, dynamic project showcases, and an integrated dual-LLM conversational agent.

---

## 🏗️ Architecture & Technology Stack

The platform is constructed on a decoupled Next.js App Router architecture focused on speed, accessibility, and visual presentation.

### Core Framework
- **Next.js 16 (App Router):** Server-side rendering (SSR), static site generation (SSG), and route optimization.
- **React 19 & TypeScript:** Type-safe component architecture across custom UI modules.

### 3D Graphics & Physics
- **Three.js & React Three Fiber (R3F):** High-performance WebGL rendering.
- **Rapier Physics:** Real-time physics simulation driving the interactive 3D ID Lanyard.
- **Custom GLSL Shaders:** Bespoke visual effects including Hyperspeed and warp backgrounds.

### Animation & Design System
- **Framer Motion & GSAP:** Micro-interactions, parallax reveals, and timeline choreographies.
- **Tailwind CSS & Shadcn UI:** Utility-first styling built on Radix UI primitives.
- **Lenis:** Smooth inertia scrolling system.

### Telemetry & AI
- **Dual-LLM Chatbot:** Groq (LLaMA 3.1) primary provider with automatic Gemini failover.
- **Developer Telemetry:** GitHub GraphQL API (commits, activity) & WakaTime API (coding analytics).

---

## 📁 Repository Structure

```text
PORTFOLIO-NITHISH/
├── src/
│   ├── app/                          # Next.js App Router Pages & API Routes
│   │   ├── api/                      # Backend API (Chatbot, GitHub stats, WakaTime)
│   │   ├── projects/                 # Portfolio Projects Directory
│   │   ├── experience/               # Career Timeline & Engineering Metrics
│   │   ├── skills/                   # Technical Skill Radars & Categorization
│   │   ├── resume/                   # Embedded PDF Resume Viewer
│   │   └── blog/                     # Technical Articles & Notes
│   ├── components/
│   │   ├── three/                    # WebGL/R3F Canvas & Physics Components
│   │   ├── sections/                 # Main Section Layouts (Hero, About, Skills)
│   │   └── ui/                       # Reusable UI Primitives & Animation Effects
│   ├── data/
│   │   └── portfolio.ts              # Portfolio Content & Data Store
│   ├── hooks/                        # Custom React Hooks (Performance, Motion)
│   └── styles/                       # Global CSS & Tailwind Setup
├── public/                           # Static Media, Models & Documents
├── next.config.ts                    # Next.js Build Configuration
└── tailwind.config.ts                # Design Tokens & Styling Rules
```

---

## 🚀 Key Features

1. **Interactive 3D Badge (WebGL / Rapier)** — A dynamic 3D identity badge responding to cursor interactions and gravity.
2. **Autonomous AI Assistant** — Integrated chatbot trained on portfolio credentials via dual-LLM redundancy (Groq / Gemini).
3. **Real-time Coding Telemetry** — Interactive dashboards fetching live GitHub activity and WakaTime coding telemetry.
4. **Native PDF Resume Reader** — Custom browser-native PDF viewer with zoom, rotation, and direct download capabilities.
5. **Adaptive Performance Engine** — Automatic hardware benchmark detection to throttle heavy 3D shaders on mobile or low-power devices.

---

## 🛠️ Getting Started Locally

### Prerequisites
- **Node.js**: `>= 18.0.0`
- **npm** or **pnpm**

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nithish-Bharathwaj-N/PORTFOLIO-NITHISH.git
   cd PORTFOLIO-NITHISH
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up Environment Variables:**
   Create `.env.local` in the project root:
   ```env
   NEXT_PUBLIC_GITHUB_USERNAME=Nithish-Bharathwaj-N
   GITHUB_TOKEN=your_github_token
   WAKATIME_API_KEY=your_wakatime_key
   GROQ_API_KEY=your_groq_key
   GEMINI_API_KEY=your_gemini_key
   ```

4. **Launch Development Server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 📄 License

This repository is available under the [MIT License](LICENSE).

<div align="center">
  <p>Crafted & Maintained by <strong>Nithish Bharathwaj N</strong></p>
</div>
