
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useCV = () => {
  return useQuery({
    queryKey: ['cv'],
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from('cv')
        .list('', {
          limit: 1,
          search: 'HafidzRahmatullah-CV.pdf'
        });
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        const { data: urlData } = supabase.storage
          .from('cv')
          .getPublicUrl('HafidzRahmatullah-CV.pdf');
        
        return urlData.publicUrl;
      }
      
      return null;
    },
  });
};

export const downloadCV = async () => {
  const { data: urlData } = supabase.storage
    .from('cv')
    .getPublicUrl('HafidzRahmatullah-CV.pdf');
  
  if (urlData.publicUrl) {
    const link = document.createElement('a');
    link.href = urlData.publicUrl;
    link.download = 'HafidzRahmatullah-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
