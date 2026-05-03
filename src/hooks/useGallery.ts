import { useQuery } from '@tanstack/react-query';
import { galleryData } from '@/data/gallery';

export const useGallery = () => {
  return useQuery({
    queryKey: ['gallery'],
    queryFn: async () => galleryData,
  });
};