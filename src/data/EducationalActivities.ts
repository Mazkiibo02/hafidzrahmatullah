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
      'Hafidz Rahmatullah attended the Invofest seminar, which was mandatory for all Informatics Engineering students in semester 4 at Universitas Harkat Negeri.',
    images: [
      '/images/educational/invofest-1.PNG',
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
      'Intensive cybersecurity training from the collaboration between SMT Program Indonesia and NSHC Korea, covering ethical hacking, penetration testing, and network security.',
    images: [
      '/images/educational/nshc-1.jpg',
      '/images/educational/nshc-2.jpg',
      '/images/educational/nshc-3.jpg',
    ],
    category: 'pelatihan',
  },
  // {
  //   id: 'workshop-react-ts',
  //   title: 'Workshop React & TypeScript',
  //   date: '2024-03-15',
  //   description:
  //     'Workshop pengembangan web modern menggunakan React dan TypeScript, membahas component architecture, hooks, dan best practices dalam membangun aplikasi frontend yang scalable.',
  //   images: [
  //     '/images/educational/react-ts-1.jpg',
  //     '/images/educational/react-ts-2.jpg',
  //     '/images/educational/react-ts-3.jpg',
  //   ],
  //   category: 'workshop',
  // },
  // {
  //   id: 'flutter-mobile-2023',
  //   title: 'Mobile Development with Flutter',
  //   date: '2023-08-10',
  //   description:
  //     'Pelatihan pengembangan aplikasi mobile cross-platform menggunakan Flutter dan Dart, mencakup state management dengan GetX, integrasi Firebase, dan deployment ke Play Store.',
  //   images: [
  //     '/images/educational/flutter-1.jpg',
  //     '/images/educational/flutter-2.jpg',
  //     '/images/educational/flutter-3.jpg',
  //   ],
  //   category: 'pelatihan',
  // },
];
