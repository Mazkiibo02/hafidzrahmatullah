
export type ExperienceType = 'Magang' | 'Freelance' | 'Full-time' | 'Organisasi';

export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  type: ExperienceType;
  description: string[];
  techStack: string[];
  images: [string, string, string];
  liveUrl?: string;
  color: {
    primary: string;
    bg: string;
    text: string;
    border: string;
    glow: string;
  };
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'PT Duta Pratama Teknologi',
    role: 'Technician',
    period: 'Feb 2024 – Mar 2024',
    type: 'Freelance',
    description: [
      'Performed physical installation and configuration of new server rack infrastructure for the client data center, including efficient PDU installation, cable management, and patch panels.',
      'Managed cabling and labeling and integrated network devices (switch, router, server) to keep the system organized and the network structure clear.',
      'Participated in testing and commissioning of network and server systems after installation to ensure reliability and optimal technical operations.',
    ],
    techStack: [
      'Server Rack',
      'PDU Installation',
      'Cable Management',
      'Patch Panel',
      'Network Switch',
      'Router Config',
      'Network Testing',
    ],
    images: [
      '/images/experience/duta-pratama-1.webp',
      '/images/experience/duta-pratama-2.webp',
      '/images/experience/duta-pratama-3.webp',
    ],
    color: {
      primary: '#06b6d4',
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      glow: 'rgba(6, 182, 212, 0.12)',
    },
  },
  {
    id: 2,
    company: 'PT Medika Digital Nusantara',
    role: 'Programmer',
    period: 'Aug 2025 – Dec 2025',
    type: 'Magang',
    description: [
      'Contributed to development and maintenance of the MorHuman HR module (HIS), supporting system stability and performance.',
      'Implemented new features and bug fixes from QA documentation and internal tickets in an efficient, structured way.',
      'Resolved issues in HR, scheduling, attendance, transfer, and overtime modules in an active production environment.',
    ],
    techStack: [
      'Laravel 5.7',
      'PHP 7.1',
      'Vue.js 2',
      'Bootstrap 4',
      'MySQL',
      'Pusher',
      'jQuery',
      'Axios',
      'Eloquent ORM',
    ],
    images: [
      '/images/experience/morbis-1.webp',
      '/images/experience/morbis-2.webp',
      '/images/experience/morbis-3.webp',
    ],
    color: {
      primary: '#8b5cf6',
      bg: 'bg-violet-500/10',
      text: 'text-violet-400',
      border: 'border-violet-500/30',
      glow: 'rgba(139, 92, 246, 0.12)',
    },
  },
  {
    id: 3,
    company: 'PT Tricipta Karsa Inovasi',
    role: 'Fullstack Developer',
    period: 'Oct 2025 – Jan 2026',
    type: 'Freelance',
    description: [
      'Built and launched a production-ready website for a real client as the sole web developer, covering UI/UX, frontend, and deployment preparation.',
      'Developed a Single Page Application (SPA) using React, Vite, and TypeScript with a modular, maintainable codebase.',
      'Implemented a responsive, professional UI with Tailwind CSS and shadcn/ui tailored to the brand and credibility of the legal services offering.',
    ],
    techStack: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'shadcn/ui',
      'Framer Motion',
      'React Router',
      'TanStack Query',
      'Zod',
    ],
    images: [
      '/images/experience/innolegalist-1.webp',
      '/images/experience/innolegalist-2.webp',
      '/images/experience/innolegalist-3.webp',
    ],
    liveUrl: 'https://www.innolegalist.co.id/',
    color: {
      primary: '#6366f1',
      bg: 'bg-indigo-500/10',
      text: 'text-indigo-400',
      border: 'border-indigo-500/30',
      glow: 'rgba(99, 102, 241, 0.12)',
    },
  },
  {
    id: 4,
    company: 'Usahaku POS (Self-Owned SaaS)',
    role: 'Founder & Fullstack Developer',
    period: 'Early 2026 – Present',
    type: 'Full-time',
    description: [
      'Architected and launched a cloud-based Point of Sales (POS) SaaS helping MSMEs manage multi-branch operations and structured cashier shifts.',
      'Integrated Google Gemini AI for automatic sales data analytics, delivering intelligent business insights directly to merchants.',
      'Engineered offline-first Progressive Web App (PWA) capabilities and direct Bluetooth thermal printer integration via ESC/POS protocol.',
      'Developed a scalable subscription and billing module seamlessly integrated with Midtrans Payment Gateway and Firebase.',
    ],
    techStack: [
      'Next.js',
      'React 19',
      'TypeScript',
      'Firebase',
      'Zustand',
      'Tailwind CSS',
      'Google Gen AI',
      'Midtrans',
      'PWA',
    ],
    images: [
      '/images/experience/usahakupos1.webp',
      '/images/experience/usahakupos2.webp',
      '/images/experience/usahakupos3.webp',
    ],
    liveUrl: 'https://www.usahakupos.my.id/',
    color: {
      primary: '#f97316',
      bg: 'bg-orange-500/10',
      text: 'text-orange-400',
      border: 'border-orange-500/30',
      glow: 'rgba(249, 115, 22, 0.12)',
    },
  },
];
