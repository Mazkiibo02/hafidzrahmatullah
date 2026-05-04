export interface EducationalActivity {
  id: string;
  title: string;
  date: string;
  description: string;
  images: string[];
  category: 'seminar' | 'workshop' | 'course' | 'pelatihan';
}

export const educationalActivities: EducationalActivity[] = [
  {
    id: 'invofest-2024',
    title: 'Seminar Invofest 2024',
    date: '2024-02-02',
    description:
      'Hafidz Rahmatullah menghadiri seminar Invofest yang wajib dihadiri oleh seluruh mahasiswa prodi Teknik Informatika Semester 4.',
    images: [
      '/images/educational/invofest-1.jpg',
      '/images/educational/invofest-2.jpg',
      '/images/educational/invofest-3.jpg',
    ],
    category: 'seminar',
  },
  {
    id: 'smt-nshc-2024',
    title: 'SMT Program Indonesia x NSHC Korea',
    date: '2024-07-01',
    description:
      'Pelatihan cybersecurity intensif hasil kolaborasi SMT Program Indonesia dengan NSHC Korea, mencakup materi ethical hacking, penetration testing, dan keamanan jaringan.',
    images: [
      '/images/educational/nshc-1.jpg',
      '/images/educational/nshc-2.jpg',
      '/images/educational/nshc-3.jpg',
    ],
    category: 'pelatihan',
  },
  {
    id: 'workshop-react-ts',
    title: 'Workshop React & TypeScript',
    date: '2024-03-15',
    description:
      'Workshop pengembangan web modern menggunakan React dan TypeScript, membahas component architecture, hooks, dan best practices dalam membangun aplikasi frontend yang scalable.',
    images: [
      '/images/educational/react-ts-1.jpg',
      '/images/educational/react-ts-2.jpg',
      '/images/educational/react-ts-3.jpg',
    ],
    category: 'workshop',
  },
  {
    id: 'flutter-mobile-2023',
    title: 'Mobile Development with Flutter',
    date: '2023-08-10',
    description:
      'Pelatihan pengembangan aplikasi mobile cross-platform menggunakan Flutter dan Dart, mencakup state management dengan GetX, integrasi Firebase, dan deployment ke Play Store.',
    images: [
      '/images/educational/flutter-1.jpg',
      '/images/educational/flutter-2.jpg',
      '/images/educational/flutter-3.jpg',
    ],
    category: 'pelatihan',
  },
];