import { useQuery } from '@tanstack/react-query';

const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY as string;
const FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID as string;

export interface DriveCertificate {
  id: string;
  name: string;
  title: string;
  issuer: string;
  date: string;         // YYYY-MM-DD parsed from filename
  dateDisplay: string;  // DD-MM-YYYY for display
  mimeType: string;
  thumbnailUrl: string;
  viewUrl: string;
  downloadUrl: string;
}

/**
 * Parse filename format: DD-MM-YYYY-EventName.pdf
 * Example: "18-07-2024-Al-Basic-Overview-of-AI.pdf"
 * Returns: { date, dateDisplay, title }
 */
const parseFilename = (filename: string) => {
  // Strip extension
  const base = filename.replace(/\.[^/.]+$/, '');

  // Match DD-MM-YYYY at the start
  const match = base.match(/^(\d{2})-(\d{2})-(\d{4})-(.+)$/);

  if (!match) {
    return {
      date: '1970-01-01',
      dateDisplay: '',
      title: base,
    };
  }

  const [, dd, mm, yyyy, rest] = match;

  // Convert slug to readable title
  const title = rest
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    date: `${yyyy}-${mm}-${dd}`,          // for sorting
    dateDisplay: `${dd}-${mm}-${yyyy}`,   // for display
    title,
  };
};

/**
 * Try to extract issuer from filename.
 * Looks for known issuer keywords in the name segment.
 */
const extractIssuer = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes('udemy')) return 'Udemy';
  if (lower.includes('huawei')) return 'Huawei';
  if (lower.includes('coursera')) return 'Coursera';
  if (lower.includes('dicoding')) return 'Dicoding';
  if (lower.includes('google')) return 'Google';
  if (lower.includes('nshc')) return 'SMT Program x NSHC Korea';
  if (lower.includes('ielts')) return 'EF / IELTS';
  if (lower.includes('toefl')) return 'TOEFL';
  if (lower.includes('seminar')) return 'Seminar Nasional';
  if (lower.includes('morbis') || lower.includes('medika')) return 'PT Medika Digital Nusantara';
  if (lower.includes('innolegalist') || lower.includes('tricipta')) return 'PT Tricipta Karsa Inovasi';
  return 'Certificate';
};

export const useGoogleDriveCertificates = () => {
  return useQuery({
    queryKey: ['drive-certificates', FOLDER_ID],
    queryFn: async (): Promise<DriveCertificate[]> => {
      if (!API_KEY || !FOLDER_ID) {
        throw new Error('Google Drive API key or Folder ID not configured.');
      }

      const params = new URLSearchParams({
        key: API_KEY,
        q: `'${FOLDER_ID}' in parents and trashed = false`,
        fields: 'files(id,name,mimeType,thumbnailLink,webViewLink)',
        pageSize: '100',
        orderBy: 'name desc',
      });

      const res = await fetch(
        `https://www.googleapis.com/drive/v3/files?${params.toString()}`
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error?.message ?? 'Failed to fetch Drive files');
      }

      const data = await res.json();
      const files: {
        id: string;
        name: string;
        mimeType: string;
        thumbnailLink?: string;
        webViewLink: string;
      }[] = data.files ?? [];

      return files
        .map((file): DriveCertificate => {
          const { date, dateDisplay, title } = parseFilename(file.name);
          const issuer = extractIssuer(file.name);

          return {
            id: file.id,
            name: file.name,
            title,
            issuer,
            date,
            dateDisplay,
            mimeType: file.mimeType,
            // thumbnailLink from Drive API (size can be adjusted via =s param)
            thumbnailUrl: file.thumbnailLink
              ? file.thumbnailLink.replace(/=s\d+/, '=s400')
              : '',
            viewUrl: `https://drive.google.com/file/d/${file.id}/view`,
            downloadUrl: `https://drive.google.com/uc?export=download&id=${file.id}`,
          };
        })
        .sort((a, b) => b.date.localeCompare(a.date)); // newest first
    },
    staleTime: 1000 * 60 * 15, // cache 15 menit
    retry: 2,
  });
};