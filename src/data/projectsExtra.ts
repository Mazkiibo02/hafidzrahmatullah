export interface ProjectExtra {
  repoName: string;
  screenshot: string;
  youtubeUrl?: string;
  featured?: boolean;
}

export const projectsExtra: ProjectExtra[] = [
  {
    repoName: 'saka-digital',
    screenshot: '/images/projects/saka-digital.jpg',
    youtubeUrl: undefined,
    featured: true,
  },
  {
    repoName: 'morintern',
    screenshot: '/images/projects/morintern.jpg',
    youtubeUrl: undefined,
    featured: true,
  },
  // Tambahkan entry per repo yang punya screenshot/youtube
  // Repo yang tidak ada di sini tetap tampil dengan placeholder
];
