
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
    role: 'Teknisi',
    period: 'Feb 2024 – Mar 2024',
    type: 'Freelance',
    description: [
      'Melaksanakan instalasi fisik dan konfigurasi infrastruktur rak server baru untuk pusat data klien, termasuk instalasi PDU yang efisien, manajemen kabel, dan panel patch.',
      'Mengelola pengkabelan dan pelabelan, serta mengintegrasikan perangkat jaringan (switch, router, server) untuk memastikan keteraturan sistem dan keterbacaan struktur jaringan.',
      'Berpartisipasi dalam pengujian dan komisioning sistem jaringan dan server setelah instalasi untuk memastikan keandalan dan kinerja operasional teknis yang optimal.',
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
      'https://picsum.photos/seed/exp1a/800/600',
      'https://picsum.photos/seed/exp1b/800/600',
      'https://picsum.photos/seed/exp1c/800/600',
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
      'Terlibat dalam pengembangan dan pemeliharaan sistem kepegawaian MorHuman (SIMRS), memastikan stabilitas dan performa sistem yang optimal.',
      'Mengimplementasikan fitur baru dan perbaikan bug berdasarkan dokumen QA dan tiket internal secara efisien dan terstruktur.',
      'Menyelesaikan masalah pada modul kepegawaian, penjadwalan, kehadiran, transfer, dan lembur dalam lingkungan produksi aktif.',
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
      'https://picsum.photos/seed/exp2a/800/600',
      'https://picsum.photos/seed/exp2b/800/600',
      'https://picsum.photos/seed/exp2c/800/600',
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
      'Membangun dan meluncurkan situs web siap produksi untuk klien nyata sebagai pengembang web tunggal, meliputi UI/UX, frontend, dan persiapan penyebaran.',
      'Mengembangkan Single Page Application (SPA) menggunakan React, Vite, dan TypeScript dengan struktur kode modular dan mudah dipelihara.',
      'Mengimplementasikan UI responsif dan profesional menggunakan Tailwind CSS dan shadcn/ui, disesuaikan dengan kebutuhan merek dan kredibilitas layanan hukum.',
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
      'https://picsum.photos/seed/exp3a/800/600',
      'https://picsum.photos/seed/exp3b/800/600',
      'https://picsum.photos/seed/exp3c/800/600',
    ],
    color: {
      primary: '#6366f1',
      bg: 'bg-indigo-500/10',
      text: 'text-indigo-400',
      border: 'border-indigo-500/30',
      glow: 'rgba(99, 102, 241, 0.12)',
    },
  },
];
