
import React, { useState, useRef } from 'react';
import { Upload, Camera, X, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ProfileImageUploadProps {
  currentImageUrl?: string;
  onImageUpdate: (imageUrl: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  currentImageUrl,
  onImageUpdate,
  className = "",
  size = 'lg'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showUploadOverlay, setShowUploadOverlay] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-80 h-80',
    xl: 'w-96 h-96'
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, WebP, or GIF)');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    
    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `profile-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);

      // Update profile in database
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: 'temp-user-id', // In a real app, this would be the authenticated user's ID
          profile_image_url: publicUrl,
          updated_at: new Date().toISOString()
        });

      if (updateError) {
        console.warn('Could not update profile in database:', updateError);
      }

      onImageUpdate(publicUrl);
      setShowUploadOverlay(false);
      
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const displayImage = previewUrl || currentImageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face";

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div
        className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-1 cursor-pointer group"
        onMouseEnter={() => setShowUploadOverlay(true)}
        onMouseLeave={() => setShowUploadOverlay(false)}
        onClick={triggerFileInput}
      >
        <div className="w-full h-full rounded-full overflow-hidden relative">
          <img
            src={displayImage}
            alt="Profile"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Upload Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-opacity duration-300 ${
              showUploadOverlay || isUploading ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {isUploading ? (
              <div className="animate-spin">
                <Upload className="text-white" size={size === 'sm' ? 16 : size === 'md' ? 20 : 32} />
              </div>
            ) : (
              <Camera className="text-white" size={size === 'sm' ? 16 : size === 'md' ? 20 : 32} />
            )}
          </div>
        </div>
      </div>

      {/* Success indicator */}
      {previewUrl && !isUploading && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
          <Check size={16} />
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {/* Upload instructions */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Click to change photo
        </p>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
