import { PortfolioData } from '@/types';

export const portfolioData: PortfolioData = {
    personal: {
        name: 'Nithish Bharathwaj N',
        title: 'Cybersecurity Engineer • AI Engineer • Full-Stack Developer',
        subtitle: 'Top 8 Aerothon 2026 Finalist (HAL & IIT Indore) • Cybersecurity • AI • Full-Stack',
        bio: "I'm a Computer Science (Cyber Security) student at Chennai Institute of Technology passionate about building software that protects, predicts, and scales. My expertise spans cybersecurity engineering (threat monitoring, attack surface analysis, CTFs), AI application development (LLMs, ML models, prompt engineering), and full-stack software engineering (React, Next.js, Node.js, FastAPI). Top 8 Finalist in Aerothon 2026 (HAL & IIT Indore), finalist in 5+ national hackathons, and active competitive programmer with 500+ LeetCode problems solved (Rating: 1771).",
        avatar: '/images/nithish-photo.jpg',
        location: 'Chennai, Tamil Nadu, India',
        email: 'nithishbharathwajn@gmail.com',
        phone: '+91 9363958388',
        resumeUrl: '/NITHISH_BHARATHWAJ_N_Resume_2026-08-15.pdf',
        website: 'https://github.com/Nithish-Bharathwaj-N',
        languages: [
            { name: 'English', level: 'Fluent' },
            { name: 'Tamil', level: 'Native' }
        ],
        socialLinks: [
            {
                platform: 'GitHub',
                url: 'https://github.com/Nithish-Bharathwaj-N',
                icon: 'github',
                username: '@Nithish-Bharathwaj-N'
            },
            {
                platform: 'LinkedIn',
                url: 'https://www.linkedin.com/in/nithish-bharathwaj-n-847a00379',
                icon: 'linkedin',
                username: 'Nithish Bharathwaj N'
            },
            {
                platform: 'LeetCode',
                url: 'https://leetcode.com/u/nithish_cit/',
                icon: 'code',
                username: '@nithish_cit'
            },
            {
                platform: 'Email',
                url: 'mailto:nithishbharathwajn@gmail.com',
                icon: 'mail',
                username: 'nithishbharathwajn@gmail.com'
            }
        ]
    },
    projects: [
        {
            id: 'proj-subaero',
            slug: 'subaero',
            title: 'SubAERO',
            description: 'Aerospace Digital Twin & PHM Platform for HAL Tejas turbojet engines. Top 8 Finalist in Aerothon 2026 (HAL & IIT Indore).',
            longDescription: 'High-precision digital twin featuring 3D engine component modeling in Blender, real-time WebGL (Three.js) visualizations, aero-thermal physics calculations, and multi-target ML regression (98.7%–99.9% R² accuracy) for health monitoring and Remaining Useful Life (RUL) prediction.',
            image: '/images/subaero-preview.jpg',
            techStack: ['React 19', 'TypeScript', 'Three.js', 'Blender', 'Python', 'FastAPI', 'Scikit-Learn', 'Tailwind CSS'],
            tools: ['Blender', 'VS Code', 'Git', 'Vercel'],
            status: 'completed',
            repoUrl: 'https://github.com/Nithish-Bharathwaj-N/SubAERO',
            demoUrl: 'https://null-pointers-aerothon-2026.vercel.app/',
            startDate: '2026-05-01',
            endDate: '2026-08-31',
            role: 'Lead Full-Stack & 3D WebGL Developer',
            customTimeline: 'May – Aug 2026',
            team: 'Team Null Pointers (Aerothon 2026)',
            category: '3D WebGL & AI Digital Twin',
            highlights: [
                'Top 8 Aerothon 2026 Finalist (HAL & IIT Indore)',
                'Interactive 3D Engine Component Inspections in WebGL (Three.js)',
                'Multi-target ML Regression with 98.7%–99.9% R² Accuracy'
            ],
            features: [
                {
                    title: 'Core System Capabilities',
                    items: [
                        '**Interactive 3D Engine Inspection**: Explode and inspect HAL Tejas turbojet engine subcomponents in real-time.',
                        '**Aero-Thermal Physics Modeling**: Simulate turbine inlet temperatures, pressure ratios, and fuel flow rates.',
                        '**Predictive Maintenance (PHM)**: Machine learning algorithms estimate Remaining Useful Life (RUL) and anomaly flags.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Repository Setup',
                    code: 'git clone https://github.com/Nithish-Bharathwaj-N/SubAERO.git\ncd SubAERO\npnpm install\npnpm dev',
                    type: 'code'
                }
            ]
        },
        {
            id: 'proj-voyage-ai',
            slug: 'voyage-ai',
            title: 'Voyage AI',
            description: 'AI-powered intelligent travel planning platform using LLMs and Prompt Engineering.',
            longDescription: 'Create personalized trip itineraries using LLMs and Prompt Engineering, budget optimization, destination recommendations, and interactive travel management dashboards.',
            image: '/images/voyage-preview.jpg',
            techStack: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'REST APIs', 'PostgreSQL'],
            tools: ['VS Code', 'Git', 'Postman'],
            status: 'completed',
            repoUrl: 'https://github.com/Nithish-Bharathwaj-N/Voyage-AI',
            startDate: '2025-10-01',
            endDate: '2025-12-31',
            role: 'Full-Stack Developer',
            customTimeline: 'Oct – Dec 2025',
            team: 'Personal Project',
            category: 'AI Application',
            highlights: ['AI Itinerary Generation', 'Budget Optimizer', 'Destination Matcher']
        },
        {
            id: 'proj-finsight',
            slug: 'finsight',
            title: 'FinSight',
            description: 'AI-driven financial analytics and modern banking dashboard.',
            longDescription: 'Real-time financial insights, transaction analytics, spending breakdown visualizer, and modern banking interface.',
            image: '/images/e-commerce.jpg',
            techStack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Vercel'],
            tools: ['VS Code', 'Git', 'Vercel'],
            status: 'completed',
            repoUrl: 'https://github.com/Nithish-Bharathwaj-N/FinSight',
            demoUrl: 'https://fin-sight-banking.vercel.app',
            startDate: '2025-08-01',
            endDate: '2025-09-30',
            role: 'Frontend Engineer',
            customTimeline: 'Aug – Sep 2025',
            team: 'Personal Project',
            category: 'FinTech',
            highlights: ['Real-time Transaction Charts', 'AI Spending Insights', 'Responsive Mobile Design']
        },
        {
            id: 'proj-securox',
            slug: 'securox',
            title: 'Securox',
            description: 'Autonomous cyber risk intelligence & attack surface monitoring platform.',
            longDescription: 'Real-time attack surface monitoring, automated vulnerability assessment, and threat intelligence dashboard.',
            image: '/images/timeline-securox.png',
            techStack: ['TypeScript', 'React', 'Node.js', 'Cybersecurity'],
            tools: ['Linux', 'Git', 'Docker'],
            status: 'ongoing',
            repoUrl: 'https://github.com/Nithish-Bharathwaj-N/Securox',
            startDate: '2026-03-01',
            endDate: '2026-09-01',
            role: 'Cybersecurity & Software Engineer',
            customTimeline: 'Mar 2026 – Present',
            team: 'Personal Project',
            category: 'Cybersecurity',
            highlights: ['Attack Surface Analysis', 'Real-time Threat Alerts', 'Automated Risk Scoring']
        },
        {
            id: 'proj-queue-cure',
            slug: 'queue-cure',
            title: 'Queue Cure',
            description: 'AI-powered smart healthcare queue management system.',
            longDescription: 'Digitizes hospital queues with AI wait-time estimation, QR check-in, live token tracking via Socket.IO, and doctor schedule dashboards.',
            image: '/images/queuecure-preview.jpg',
            techStack: ['React', 'Node.js', 'Express', 'Socket.IO', 'MySQL', 'Tailwind CSS'],
            tools: ['VS Code', 'Postman', 'Git'],
            status: 'completed',
            repoUrl: 'https://github.com/Nithish-Bharathwaj-N/QUEUE-CURE---AI',
            startDate: '2025-06-01',
            endDate: '2025-08-31',
            role: 'Full-Stack Lead',
            customTimeline: 'Jun – Aug 2025',
            team: 'Hackathon Team',
            category: 'Healthcare & IoT',
            highlights: ['Real-time Socket.IO Queue Sync', 'AI Wait-Time Estimator', 'QR Patient Check-in']
        }
    ],
    experiences: [
        {
            id: 'exp-securox',
            company: 'Securox Risk Intelligence',
            position: 'Cybersecurity Engineer & Architect',
            description: 'Built autonomous cyber risk intelligence & attack surface monitoring platform featuring real-time threat detection, automated CVE lookup, and attack surface analytics.',
            responsibilities: [
                'Built attack surface monitor with network graph analytics.',
                'Implemented real-time threat alerts and automated CVE vulnerability scoring.',
                'Architected full-stack React & Node.js dashboard with cybersecurity tooling.'
            ],
            skills: ['Cybersecurity', 'React', 'Node.js', 'Docker', 'TypeScript', 'Linux'],
            startDate: '2026-03-01',
            endDate: '2026-09-30',
            customTimeline: 'Mar – Sep 2026',
            isOngoing: false,
            location: 'Chennai, India',
            type: 'full-time',
            logo: '/images/timeline-securox.png',
            galleryImages: ['/images/timeline-securox.png']
        },
        {
            id: 'exp-subaero',
            company: 'SubAERO — Aerothon 2026 (HAL & IIT Indore)',
            position: 'Lead Full-Stack & 3D WebGL Developer',
            description: 'Engineered an aerospace-grade 3D Digital Twin for HAL Tejas turbojet engines using Three.js, Blender, FastAPI, and multi-target ML regression (98.7–99.9% R² accuracy). Top 8 National Finalist.',
            responsibilities: [
                'Engineered interactive 3D engine component inspections in WebGL (Three.js).',
                'Integrated multi-target ML regression for Remaining Useful Life (RUL) prediction with 98.7-99.9% R² accuracy.',
                'Ranked among Top 8 National Teams in Aerothon 2026 organized by HAL and IIT Indore.'
            ],
            skills: ['React 19', 'Three.js', 'Blender', 'FastAPI', 'Python', 'Machine Learning'],
            startDate: '2026-06-01',
            endDate: '2026-08-31',
            customTimeline: 'Jun – Aug 2026',
            isOngoing: false,
            location: 'IIT Indore / Chennai',
            type: 'contract',
            logo: '/images/subaero-preview.jpg',
            galleryImages: ['/images/subaero-preview.jpg', '/images/aircraft.jpg']
        },
        {
            id: 'exp-trae-hackathon',
            company: 'Notion Workshop & "Unbound Creativity with Trae" Hackathon',
            position: 'Participant & Builder (Team D3dS3c)',
            description: 'Actively participated in the Notion Workshop and "Unbound Creativity with Trae" 8-hour in-person hackathon organized by HackBriven at Ojone Office, Bangalore.',
            responsibilities: [
                'Participated in intensive 8-hour in-person hackathon at Ojone Office, Bangalore.',
                'Built AI workflow prototypes using Trae AI & Notion API integrations.',
                'Represented Team D3dS3c in competitive live hacking demo.'
            ],
            skills: ['Trae AI', 'Notion API', 'Hackathon', 'React', 'Rapid Prototyping'],
            startDate: '2026-05-30',
            endDate: '2026-05-30',
            customTimeline: 'May 30, 2026',
            isOngoing: false,
            location: 'Ojone Office, Bangalore',
            type: 'contract',
            logo: '/certificate/trae-notion-hackathon.jpg',
            galleryImages: [
                '/certificate/trae-notion-hackathon.jpg',
                '/gallery/hackathon-bangalore-1.jpg',
                '/gallery/hackathon-bangalore-2.jpg',
                '/certificate/hackbriven-trae-cert.jpg'
            ]
        },
        {
            id: 'exp-finsight',
            company: 'FinSight Banking Analytics',
            position: 'Frontend Engineer & FinTech Developer',
            description: 'Designed and engineered an AI-driven financial analytics platform and interactive banking dashboard with real-time transaction tracking.',
            responsibilities: [
                'Built responsive transaction charts and financial spending breakdown visualizers.',
                'Implemented dark-mode banking UI components using Next.js and Tailwind CSS.',
                'Integrated AI spending insights and automated financial report widgets.'
            ],
            skills: ['Next.js', 'TypeScript', 'Tailwind CSS', 'FinTech', 'Recharts'],
            startDate: '2026-03-01',
            endDate: '2026-05-31',
            customTimeline: 'Mar – May 2026',
            isOngoing: false,
            location: 'Chennai, India',
            type: 'full-time',
            logo: '/images/e-commerce.jpg',
            galleryImages: ['/images/e-commerce.jpg']
        },
        {
            id: 'exp-voyage-ai',
            company: 'Voyage AI Planner',
            position: 'Full-Stack AI Engineer',
            description: 'Created an intelligent travel itinerary generation platform powered by LLMs, prompt engineering, live Google Maps integrations, and budget optimization.',
            responsibilities: [
                'Implemented multi-step prompt workflows for personalized trip itineraries.',
                'Integrated weather APIs, live map coordinates, and budget calculation modules.',
                'Designed responsive React & Node.js dashboard with full-stack capabilities.'
            ],
            skills: ['Gemini API', 'React', 'Node.js', 'Express', 'Tailwind CSS', 'Google Maps'],
            startDate: '2026-01-01',
            endDate: '2026-03-31',
            customTimeline: 'Jan – Mar 2026',
            isOngoing: false,
            location: 'Chennai, India',
            type: 'full-time',
            logo: '/images/voyage-preview.jpg',
            galleryImages: ['/images/voyage-preview.jpg']
        },
        {
            id: 'exp-queue-cure',
            company: 'Queue Cure — Healthcare AI',
            position: 'Full-Stack Lead Developer',
            description: 'Developed an AI-powered smart healthcare queue management system with Socket.IO real-time token tracking & ML wait-time estimation. Verified proof-of-work submission on Wooble.',
            responsibilities: [
                'Engineered real-time bidirectional queue synchronization with Socket.IO.',
                'Built ML wait-time estimation API in FastAPI for hospital outpatient departments.',
                'Earned Wooble Verified Certificate ID 21A79FEAE54F015C75F3595F6B.'
            ],
            skills: ['React', 'Socket.IO', 'Node.js', 'FastAPI', 'MySQL', 'Tailwind CSS'],
            startDate: '2025-12-01',
            endDate: '2026-01-31',
            customTimeline: 'Dec 2025 – Jan 2026',
            isOngoing: false,
            location: 'Chennai, India',
            type: 'full-time',
            logo: '/certificate/wooble-queue-cure.jpg',
            galleryImages: ['/certificate/wooble-queue-cure.jpg', '/images/queuecure-preview.jpg']
        },
        {
            id: 'exp-aws-genai',
            company: 'AWS Academy × AICTE × EduSkills',
            position: 'Generative AI Virtual Intern',
            description: 'Completed an intensive 10-week virtual internship focusing on Generative AI architectures, Large Language Models, Prompt Engineering, and AWS Cloud AI infrastructure (Grade O).',
            responsibilities: [
                'Learned Generative AI architectures, transformer models, and AWS Cloud AI infrastructure.',
                'Worked with Foundation Models, LLMs, Prompt Engineering, and AWS AI services.',
                'Earned Grade "O" (Outstanding) certification from AICTE, EduSkills & AWS Academy.'
            ],
            skills: ['AWS Cloud', 'Generative AI', 'Foundation Models', 'Prompt Engineering', 'LLMs'],
            startDate: '2025-10-01',
            endDate: '2025-12-31',
            customTimeline: 'Oct – Dec 2025',
            isOngoing: false,
            location: 'Remote, India',
            type: 'internship',
            logo: '/certificate/aws-genai-virtual-internship.jpg',
            galleryImages: ['/certificate/aws-genai-virtual-internship.jpg']
        },
        {
            id: 'exp-cit-cyber',
            company: 'Chennai Institute of Technology (CIT)',
            position: 'B.E. Computer Science & Engineering (Cyber Security)',
            description: 'Enrolled in B.E. Computer Science and Engineering with specialization in Cyber Security. Maintaining an 8.48/10 CGPA while specializing in network security, ethical hacking, cryptography, and full-stack AI applications.',
            responsibilities: [
                'Enrolled in B.E. CSE (Cyber Security) under Anna University curriculum at CIT.',
                'Active student member in Cybersecurity Research Club & Competitive Programming Club.',
                'Maintained high academic standing (CGPA 8.48/10) alongside hackathons & research.'
            ],
            skills: ['Cybersecurity', 'Network Security', 'Cryptography', 'Algorithms', 'Computer Science'],
            startDate: '2025-09-01',
            endDate: '2029-05-31',
            customTimeline: 'Sep 2025 – May 2029',
            isOngoing: true,
            location: 'Chennai, Tamil Nadu, India',
            type: 'full-time',
            logo: '/images/timeline-cit-college.png',
            galleryImages: ['/images/timeline-cit-college.png']
        },
        {
            id: 'exp-leetcode-cp',
            company: 'LeetCode Competitive Programming',
            position: 'Rating 1788 · 550+ Problems Solved',
            description: 'Achieved a peak LeetCode contest rating of 1791 with 550+ problems solved across Data Structures, Algorithms, Dynamic Programming, and Graph Theory.',
            responsibilities: [
                'Maintained a continuous 118-day coding streak.',
                'Achieved peak contest rating of 1791 (Ranked #17,155 globally).',
                'Solved 550+ algorithm and system optimization challenges.'
            ],
            skills: ['Data Structures', 'Algorithms', 'C++', 'Python', 'Problem Solving'],
            startDate: '2025-06-01',
            endDate: '2026-09-01',
            customTimeline: 'Jun 2025 – Present',
            isOngoing: true,
            location: 'Online',
            type: 'contract',
            logo: '/images/timeline-leetcode-cp.png',
            galleryImages: ['/images/timeline-leetcode-cp.png']
        },
        {
            id: 'exp-cisco-cert',
            company: 'Cisco Networking Academy & OpenEDG',
            position: 'Python Essentials & Cybersecurity Certifications',
            description: 'Completed certified training in Python Essentials 1 & 2 (Cisco Networking Academy & OpenEDG Python Institute), Introduction to Cybersecurity, Modern AI, and Operating Systems Basics.',
            responsibilities: [
                'Mastered network security principles, threat mitigation, and Python 3 scripting.',
                'Earned verified Cisco Networking Academy & OpenEDG Python Institute credentials.',
                'Applied core OS & network fundamentals to cybersecurity projects.'
            ],
            skills: ['Python 3', 'Network Security', 'Operating Systems', 'Cybersecurity'],
            startDate: '2025-03-01',
            endDate: '2026-09-01',
            customTimeline: 'Mar 2025 – Present',
            isOngoing: true,
            location: 'Chennai Institute of Technology',
            type: 'internship',
            logo: '/certificate/cisco-python-essentials-1.jpg',
            galleryImages: [
                '/certificate/cisco-python-essentials-1.jpg',
                '/certificate/cisco-cybersecurity.png',
                '/certificate/cisco-modern-ai.png',
                '/certificate/cisco-os-basics.png'
            ]
        }
    ],
    education: [
        {
            id: 'edu-cit',
            institution: 'Chennai Institute of Technology',
            degree: 'Bachelor of Engineering (B.E.)',
            major: 'Computer Science and Engineering (Cyber Security)',
            startDate: '2025-09-01',
            isOngoing: true,
            activities: [
                'Cybersecurity Research Club Member',
                'Competitive Programming & Hackathons Club'
            ],
            achievements: [
                'Top 8 Finalist in Aerothon 2026 (HAL & IIT Indore)',
                'LeetCode Contest Rating: 1771 (500+ Solved)'
            ]
        }
    ],
    achievements: [
        {
            id: 'ach-aerothon',
            title: 'Top 8 Finalist – Aerothon 2026',
            issuer: 'HAL (Hindustan Aeronautics Limited) & IIT Indore',
            date: '2026-02-15',
            description: 'National Aerospace Hackathon finalist for building SubAERO (HAL Tejas Turbojet 3D Digital Twin & PHM system). Ranked Top 8 among 100+ competing engineering teams.',
            image: '/images/subaero-preview.jpg',
            category: 'award',
            type: 'National Award',
            credentialId: 'HAL-IIT-AERO-2026-TOP8',
            credentialUrl: 'https://null-pointers-aerothon-2026.vercel.app/',
            tags: ['Aerothon', 'HAL', 'IIT Indore', 'Top 8 Finalist']
        },
        {
            id: 'ach-securox',
            title: 'Securox Cyber Risk Intelligence Architecture',
            issuer: 'Securox Risk Intelligence',
            date: '2026-03-01',
            description: 'Designed and engineered an autonomous cyber risk intelligence and attack surface monitoring platform with real-time threat detection and automated vulnerability scoring.',
            image: '/images/timeline-securox.png',
            category: 'publication',
            type: 'Cybersecurity Architecture',
            credentialId: 'SECUROX-ARCH-2026',
            credentialUrl: 'https://github.com/Nithish-Bharathwaj-N/Securox',
            tags: ['Cybersecurity', 'Securox', 'Threat Intelligence', 'Next.js']
        },
        {
            id: 'ach-leetcode',
            title: '550+ Solved on LeetCode (Rating: 1788)',
            issuer: 'LeetCode',
            date: '2026-03-01',
            description: 'Achieved a peak contest rating of 1791 (Ranked #17,155 globally) with a 118-day continuous coding streak solving Data Structures & Algorithms challenges.',
            image: '/images/timeline-leetcode-cp.png',
            category: 'recognition',
            type: 'Competitive Programming',
            credentialId: 'LEETCODE-NITHISH_CIT',
            credentialUrl: 'https://leetcode.com/u/nithish_cit/',
            tags: ['LeetCode', 'Competitive Programming', 'DSA', 'Rating 1788']
        },
        {
            id: 'ach-aws-cert',
            title: 'AWS Academy Gen-AI Virtual Internship Certificate',
            issuer: 'AICTE × EduSkills × AWS Academy',
            date: '2025-12-15',
            description: '10-week Gen-AI Virtual Internship completed with Grade "O" (Outstanding), certified by AICTE, EduSkills, Ministry of Education & AWS Academy.',
            image: '/certificate/aws-genai-virtual-internship.jpg',
            category: 'certification',
            type: 'Cloud & AI Certification',
            credentialId: '099e0848411ed965caba84074e09f0d6',
            tags: ['AWS Academy', 'Gen-AI', 'AICTE', 'Grade O']
        },
        {
            id: 'ach-cisco-python',
            title: 'Python Essentials 1 Certificate of Achievement',
            issuer: 'Cisco Networking Academy & OpenEDG Python Institute',
            date: '2025-09-06',
            description: 'Statement of Achievement for completing Python Essentials 1 course, awarded by Cisco Networking Academy in collaboration with OpenEDG Python Institute.',
            image: '/certificate/cisco-python-essentials-1.jpg',
            category: 'certification',
            type: 'Python & Software Engineering',
            credentialId: 'CISCO-PYTHON-ESSENTIALS-1',
            tags: ['Cisco', 'Python Essentials', 'OpenEDG', 'Verified']
        },
        {
            id: 'ach-hackathons',
            title: '5+ National Hackathon Finalist',
            issuer: 'Various Engineering Institutes & Organizations',
            date: '2025-12-01',
            description: 'Finalist in 5+ national-level hackathons building AI tools, 3D WebGL simulators, and healthcare management systems.',
            image: '/images/queuecure-preview.jpg',
            category: 'recognition',
            type: 'National Hackathons',
            credentialId: 'HACK-NATIONAL-2025',
            tags: ['Hackathons', 'AI', 'Full-Stack', 'Finalist']
        },
        {
            id: 'ach-cisco',
            title: 'Cisco Networking & Cybersecurity Certifications',
            issuer: 'Cisco Networking Academy',
            date: '2024-11-01',
            description: 'Completed Cisco Python Essentials 1 & 2, Introduction to Cybersecurity, Introduction to Modern AI, and Operating Systems with verified digital badges.',
            image: '/certificate/cisco-cybersecurity.png',
            category: 'certification',
            type: 'Cybersecurity Certification',
            credentialId: 'CISCO-NETACAD-2024',
            tags: ['Cisco', 'Cybersecurity', 'Python', 'Networking']
        },
        {
            id: 'ach-cit-cyber',
            title: 'B.E. CSE (Cyber Security) Enrollment & Academic Excellence',
            issuer: 'Chennai Institute of Technology',
            date: '2025-09-01',
            description: 'Enrolled in B.E. Computer Science & Engineering (Cyber Security) maintaining an 8.48/10 CGPA while leading projects in attack surface analysis, 3D WebGL engines, and AI.',
            image: '/images/timeline-cit-college.png',
            category: 'recognition',
            type: 'Academic Excellence',
            credentialId: 'CIT-CSE-CYBER-2025',
            tags: ['Academic Excellence', 'Cyber Security', 'CIT', 'CGPA 8.48']
        },
        {
            id: 'ach-wooble-queuecure',
            title: "Wooble Verified Certificate – Queue Cure '26",
            issuer: 'Wooble',
            date: '2026-07-06',
            description: "Awarded for participating in a skill-based challenge hosted on Wooble, evidenced by a verified proof-of-work submission for Queue Cure '26.",
            image: '/certificate/wooble-queue-cure.jpg',
            category: 'certification',
            type: 'Verified Skill Challenge',
            credentialId: '21A79FEAE54F015C75F3595F6B',
            tags: ['Wooble', 'Queue Cure 26', 'Verified Certificate', 'Proof of Work']
        },
        {
            id: 'ach-trae-hackathon',
            title: 'Notion Workshop & "Unbound Creativity with Trae" Hackathon',
            issuer: 'HackBriven × Notion × Trae × Ojone',
            date: '2026-05-30',
            description: 'Actively participated in the Notion Workshop and "Unbound Creativity with Trae" 8-hour in-person hackathon organized by HackBriven at Ojone Office, Bangalore.',
            image: '/certificate/trae-notion-hackathon.jpg',
            category: 'certification',
            type: 'In-Person Hackathon',
            credentialId: 'UNBOU-4JQV2E',
            tags: ['Trae', 'Notion', 'HackBriven', 'Bangalore Hackathon']
        },
        {
            id: 'ach-rootaccess-ctf',
            title: 'RootAccess CTF 2026 Certificate of Participation',
            issuer: 'IIEST Shibpur (Dept of CS & Tech) – Revelation 5.0',
            date: '2026-03-15',
            description: 'Participated as Team D3dS3c representing Chennai Institute of Technology in RootAccess CTF 2026 under Revelation 5.0 organized by IIEST Shibpur.',
            image: '/certificate/rootaccess-ctf-iiest.jpg',
            category: 'certification',
            type: 'Cybersecurity CTF',
            credentialId: 'IIEST-CTF-2026-D3dS3c',
            tags: ['CTF', 'IIEST Shibpur', 'Cybersecurity', 'Revelation 5.0', 'Team D3dS3c']
        }
    ],
    techStack: [
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'language', url: 'https://python.org' },
        { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', category: 'language', url: 'https://isocpp.org' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'language', url: 'https://typescriptlang.org' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'language', url: 'https://javascript.info' },
        { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'language', url: 'https://sql.org' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'framework', url: 'https://react.dev' },
        { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', category: 'framework', url: 'https://nextjs.org' },
        { name: 'Three.js (WebGL)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', category: 'library', url: 'https://threejs.org' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'framework', url: 'https://nodejs.org' },
        { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', category: 'framework', url: 'https://expressjs.com' },
        { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', category: 'framework', url: 'https://fastapi.tiangolo.com' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', category: 'library', url: 'https://tailwindcss.com' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'database', url: 'https://postgresql.org' },
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'database', url: 'https://mysql.com' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'tool', url: 'https://docker.com' },
        { name: 'Git & GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', category: 'tool', url: 'https://github.com' },
        { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', category: 'ai', url: 'https://tensorflow.org' },
        { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', category: 'ai', url: 'https://pytorch.org' },
        { name: 'LangChain', icon: 'https://cdn.simpleicons.org/langchain/ffffff', category: 'ai', url: 'https://langchain.com' },
        { name: 'Scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg', category: 'ai', url: 'https://scikit-learn.org' },
        { name: 'OpenCV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg', category: 'ai', url: 'https://opencv.org' },
    ],
    hardSkills: [
        { name: 'Full-Stack Web Development', category: 'software', level: 'intermediate', description: 'Building modern web applications using React 19, Next.js, TypeScript, Node.js, Express, and Tailwind CSS.' },
        { name: 'Cybersecurity & Threat Intelligence', category: 'cybersecurity', level: 'intermediate', description: 'Hands-on practice in attack surface monitoring, vulnerability assessment, Linux security, and CTF challenges.' },
        { name: 'Data Structures & Algorithms', category: 'software', level: 'intermediate', description: 'Solving core algorithmic challenges with 550+ LeetCode problems solved (Peak Rating: 1791).' },
        { name: 'Network Security & OS Fundamentals', category: 'cybersecurity', level: 'intermediate', description: 'Understanding firewall rules, packet analysis, OS fundamentals, and Cisco certified training.' },
        { name: 'Applied AI & ML Integration', category: 'ai', level: 'beginner', description: 'Integrating Scikit-Learn ML regression models, data pre-processing, and FastAPI backend endpoints.' },
        { name: 'Generative AI & LLM Workflows', category: 'ai', level: 'beginner', description: 'Prompt engineering, Gemini API integrations, and AWS Academy Gen-AI Virtual Internship training.' },
        { name: '3D WebGL & Interactive Graphics', category: 'ai', level: 'beginner', description: 'Creating 3D WebGL engine component visualizations using Three.js and Blender assets.' },
        { name: 'Real-Time Web & WebSockets', category: 'software', level: 'beginner', description: 'Implementing Socket.IO bidirectional event synchronization for queue tracking & live apps.' },
        { name: 'DevOps & Cloud Basics', category: 'software', level: 'beginner', description: 'Basic Docker container usage, Git version control workflows, Vercel deployments, and AWS basics.' }
    ],
    softSkills: [
        { name: 'Security-First Mindset', description: 'Approaching every system architecture with threat modeling, zero-trust principles, and secure coding standards.' },
        { name: 'Systemic & Algorithmic Thinking', description: 'Deconstructing complex engineering problems into optimal data structures and efficient execution logic.' },
        { name: 'Applied AI Innovation', description: 'Translating LLMs, ML regression models, and prompt engineering into high-impact real-world applications.' },
        { name: 'Hackathon Team Leadership', description: 'Guiding cross-functional engineering teams under tight deadlines to win national final titles (Top 8 Aerothon 2026).' },
        { name: 'Continuous Technical Mastery', description: 'Maintaining rigorous daily streak discipline, rapid adoption of cutting-edge frameworks, and hands-on research.' },
        { name: 'Crisis Management & Resilience', description: 'Debugging critical system anomalies, mitigating security vulnerabilities, and maintaining calm under peak stress.' },
        { name: 'Technical Communication', description: 'Articulating complex software architecture, security defense strategies, and AI metrics clearly to stakeholders.' },
        { name: 'Cross-Domain Synergy', description: 'Bridging 3D WebGL graphics, aerospace digital twins, cybersecurity defense, and full-stack web platforms.' }
    ],
    tools: [
        { name: 'Blender', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg', category: 'design' },
        { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', category: 'ide' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'devops' },
        { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman', category: 'other' },
        { name: 'Git & GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', category: 'devops' },
        { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/ffffff', category: 'devops' },
        { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', category: 'devops' },
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', category: 'design' },
        { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonaws/ffffff', category: 'devops' },
        { name: 'Kali Linux', icon: 'https://cdn.simpleicons.org/kalilinux/ffffff', category: 'devops' },
    ],
    faqs: [
        {
            question: 'What is your primary area of expertise?',
            answer: 'My three core pillars are Cybersecurity Engineering (threat intelligence, attack surface analysis, CTFs), AI Engineering (LLMs, ML models, prompt engineering), and Full-Stack Development (React 19, Next.js, Node.js, FastAPI). I am a B.E. CSE (Cyber Security) student at Chennai Institute of Technology.'
        },
        {
            question: 'What cybersecurity projects have you built?',
            answer: 'Securox is my autonomous cyber risk intelligence and attack surface monitoring platform featuring real-time threat detection, vulnerability assessment dashboards, and automated risk scoring.'
        },
        {
            question: 'What AI projects have you built?',
            answer: 'I built Voyage AI (LLM-powered travel planner with prompt engineering), integrated ML regression models into SubAERO (98.7–99.9% R² accuracy), and completed a 10-week AWS Generative AI virtual internship (AICTE × EduSkills).'
        },
        {
            question: 'What is your LeetCode profile?',
            answer: 'I have solved 500+ LeetCode problems with a peak contest rating of 1771 and a 118-day continuous coding streak, focused on Data Structures, Algorithms, Dynamic Programming, and Graph Theory.'
        }
    ],
    blogs: [
        {
            id: 'blog-subaero-tech',
            slug: 'building-subaero-digital-twin-threejs-fastapi',
            title: 'Building SubAERO: 3D Digital Twin & PHM Platform for HAL Tejas Engines',
            excerpt: 'How we built a WebGL 3D engine simulator paired with multi-target ML regression for HAL Tejas jet engines at Aerothon 2026 — Top 8 Finalists nationwide.',
            content: 'SubAERO combines 3D CAD component modeling in Blender, real-time WebGL rendering with Three.js, aero-thermal physics equations, and machine learning models in FastAPI to deliver real-time component health tracking and RUL prediction.',
            image: '/images/subaero-preview.jpg',
            date: '2026-05-20',
            category: '3D & AI Engineering',
            tags: ['Three.js', 'FastAPI', 'Machine Learning', 'Digital Twin', 'Aerothon 2026'],
            author: {
                name: 'Nithish Bharathwaj N',
                avatar: '/images/nithish-photo.jpg'
            },
            readTime: '8 min read'
        },
        {
            id: 'blog-leetcode-journey',
            slug: 'reaching-1788-rating-leetcode-551-problems',
            title: 'My Journey to 1788 LeetCode Rating & 551 Problems Solved',
            excerpt: 'Key strategies, data structure patterns, and mindset shifts that helped me maintain a 118-day coding streak, reach rating 1788 and excel in weekly contests.',
            content: 'Consistent problem-solving requires mastering core data structures like Trees, Graphs, Dynamic Programming, and Two-Pointer techniques, combined with daily contest reflection.',
            image: '/images/nithish-about.jpg',
            date: '2026-08-15',
            category: 'Competitive Programming',
            tags: ['LeetCode', 'Algorithms', 'DSA', 'Competitive Programming'],
            author: {
                name: 'Nithish Bharathwaj N',
                avatar: '/images/nithish-photo.jpg'
            },
            readTime: '6 min read'
        },
        {
            id: 'blog-securox',
            slug: 'building-securox-cyber-risk-intelligence-platform',
            title: 'Building Securox: Autonomous Cyber Risk Intelligence Platform',
            excerpt: 'How I designed an AI-powered attack surface monitoring system with real-time threat detection and automated vulnerability assessment dashboards.',
            content: 'Securox leverages network graph analysis, CVE databases, and ML-based anomaly detection to deliver continuous cyber risk scoring for organisations. Built during March–September 2026.',
            image: '/images/timeline-securox.png',
            date: '2026-09-01',
            category: 'Cybersecurity',
            tags: ['Cybersecurity', 'AI', 'Next.js', 'Threat Intelligence'],
            author: {
                name: 'Nithish Bharathwaj N',
                avatar: '/images/nithish-photo.jpg'
            },
            readTime: '7 min read'
        },
        {
            id: 'blog-voyage-ai',
            slug: 'building-voyage-ai-gemini-travel-planner',
            title: 'Building Voyage AI: Gemini-Powered Personalised Travel Planner',
            excerpt: 'Deep-dive into building a full-stack AI travel itinerary generator with Gemini API, Google Maps, real-time weather and budget optimisation.',
            content: 'Voyage AI combines the Gemini API for multi-step itinerary planning, Google Maps for live place data, OpenWeather for forecasts, and a React 19 + Next.js frontend for a seamless user experience.',
            image: '/images/voyage-preview.jpg',
            date: '2026-02-10',
            category: 'AI & Full-Stack',
            tags: ['Gemini API', 'Next.js', 'Google Maps', 'Travel Tech'],
            author: {
                name: 'Nithish Bharathwaj N',
                avatar: '/images/nithish-photo.jpg'
            },
            readTime: '5 min read'
        },
        {
            id: 'blog-queue-cure',
            slug: 'queue-cure-ai-hospital-queue-management',
            title: 'Queue Cure: Solving Hospital Queue Chaos with AI & Socket.IO',
            excerpt: 'How I built an AI-powered smart hospital queue system with real-time token tracking, QR check-in, and ML-based wait-time prediction — winning a national hackathon finalist spot.',
            content: 'Queue Cure uses Socket.IO for real-time bidirectional communication, a FastAPI ML backend for wait-time estimation, QR code check-in flows, and a clean React dashboard for doctors and patients.',
            image: '/images/queuecure-preview.jpg',
            date: '2025-12-05',
            category: 'Healthcare Tech',
            tags: ['Socket.IO', 'Healthcare', 'AI', 'React', 'FastAPI'],
            author: {
                name: 'Nithish Bharathwaj N',
                avatar: '/images/nithish-photo.jpg'
            },
            readTime: '6 min read'
        },
        {
            id: 'blog-ctf-reverse',
            slug: 'ctf-reverse-engineering-writeup-2025',
            title: 'CTF Writeup: Reverse Engineering & Binary Exploitation Challenges',
            excerpt: 'Step-by-step walkthrough of complex reverse engineering, binary exploitation, and cryptography challenges from national-level CTF competitions.',
            content: 'Detailed analysis of CTF challenges covering buffer overflow exploits, ELF binary reversing with Ghidra, heap exploitation patterns, and AES-CBC padding oracle attacks.',
            image: '/images/nithish-suit.jpg',
            date: '2025-11-20',
            category: 'CTF & Hacking',
            tags: ['CTF', 'Reverse Engineering', 'Binary Exploitation', 'Cybersecurity'],
            author: {
                name: 'Nithish Bharathwaj N',
                avatar: '/images/nithish-photo.jpg'
            },
            readTime: '10 min read'
        }
    ],
    gallery: [
        {
            id: 'gal-subaero',
            title: 'SubAERO Engine 3D Digital Twin',
            description: 'WebGL component breakdown of the HAL Tejas turbojet engine simulation.',
            date: '2026',
            type: 'image',
            url: '/images/subaero-preview.jpg',
            category: 'Projects'
        },
        {
            id: 'gal-voyage',
            title: 'Voyage AI Travel Planner',
            description: 'AI travel itinerary generator interface.',
            date: '2025',
            type: 'image',
            url: '/images/voyage-preview.jpg',
            category: 'Projects'
        },
        {
            id: 'gal-queuecure',
            title: 'Queue Cure Hospital Management',
            description: 'Smart healthcare queue estimation and token tracking system.',
            date: '2025',
            type: 'image',
            url: '/images/queuecure-preview.jpg',
            category: 'Projects'
        },
        {
            id: 'gal-nithish-about',
            title: 'Nithish Bharathwaj N',
            description: 'Computer Science (Cyber Security) Student — Cybersecurity Engineer, AI Engineer & Full-Stack Developer.',
            date: '2026',
            type: 'image',
            url: '/images/nithish-about.jpg',
            category: 'About'
        }
    ]
};
