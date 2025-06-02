
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  full_name?: string;
  profile_image_url?: string;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // For demo purposes, we'll use a mock profile
  // In a real app, this would fetch the authenticated user's profile
  const mockProfile: Profile = {
    id: 'demo-user',
    full_name: 'Rachmaninov',
    profile_image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  useEffect(() => {
    // Simulate loading for demo
    const timer = setTimeout(() => {
      setProfile(mockProfile);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const updateProfileImage = async (imageUrl: string) => {
    try {
      const updatedProfile = {
        ...profile!,
        profile_image_url: imageUrl,
        updated_at: new Date().toISOString()
      };
      
      setProfile(updatedProfile);
      
      // In a real app, this would update the database
      console.log('Profile image updated:', imageUrl);
      
    } catch (err) {
      setError('Failed to update profile image');
      console.error('Error updating profile:', err);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const updatedProfile = {
        ...profile!,
        ...updates,
        updated_at: new Date().toISOString()
      };
      
      setProfile(updatedProfile);
      
      // In a real app, this would update the database
      console.log('Profile updated:', updates);
      
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error updating profile:', err);
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfileImage,
    updateProfile
  };
};
