import { useQuery } from '@tanstack/react-query';
import { projectsExtra } from '@/data/projectsExtra';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  // merged from projectsExtra
  screenshot: string;
  youtubeUrl?: string;
  featured?: boolean;
}

const GITHUB_USERNAME = 'Mazkiibo02';
const PLACEHOLDER = '/images/projects/placeholder.jpg';

export const useGitHubRepos = () => {
  return useQuery({
    queryKey: ['github-repos', GITHUB_USERNAME],
    queryFn: async (): Promise<GitHubRepo[]> => {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=public`,
        {
          headers: {
            Accept: 'application/vnd.github.mercy-preview+json',
          },
        }
      );

      if (!res.ok) throw new Error('Failed to fetch GitHub repos');

      const repos: GitHubRepo[] = await res.json();

      return repos
        .map((repo) => {
          const extra = projectsExtra.find(
            (e) => e.repoName.toLowerCase() === repo.name.toLowerCase()
          );
          return {
            ...repo,
            screenshot: extra?.screenshot ?? PLACEHOLDER,
            youtubeUrl: extra?.youtubeUrl,
            featured: extra?.featured ?? false,
          };
        })
        .sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });
    },
    staleTime: 1000 * 60 * 10,
  });
};
