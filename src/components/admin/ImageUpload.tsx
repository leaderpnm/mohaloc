
import React, { useState, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, X, Plus, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label = "Images" }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropZoneIndex, setDropZoneIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/webp'];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];
    
    // Validate all files first
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (!acceptedFileTypes.includes(file.type)) {
        toast.error(`Format non supporté pour ${file.name}. Utilisez JPG, JPEG, PNG, HEIC ou WEBP.`);
        continue;
      }

      if (file.size > maxFileSize) {
        toast.error(`${file.name} est trop volumineux. Taille maximale: 5MB.`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      uploadFiles(validFiles);
    }
  };

  const uploadFiles = async (files: File[]) => {
    setIsUploading(true);
    
    try {
      const uploadPromises = files.map(async (file) => {
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('vehicle-images')
          .upload(fileName, file);

        if (error) {
          console.error('Upload error:', error);
          throw error;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('vehicle-images')
          .getPublicUrl(data.path);

        return urlData.publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      
      // Add new URLs to existing ones
      onChange([...value, ...uploadedUrls]);
      
      toast.success(`${files.length} image(s) téléchargée(s) avec succès !`);
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Erreur lors du téléchargement des images');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Enhanced drag and drop functions for reordering images
  const handleImageDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', '');
  };

  const handleImageDragOver = (e: React.DragEvent, hoverIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedIndex !== null && draggedIndex !== hoverIndex) {
      setDropZoneIndex(hoverIndex);
    }
  };

  const handleImageDragLeave = (e: React.DragEvent) => {
    // Only clear drop zone if we're leaving the container entirely
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDropZoneIndex(null);
    }
  };

  const handleImageDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDropZoneIndex(null);
      return;
    }

    const newImages = [...value];
    const draggedItem = newImages[draggedIndex];
    
    // Remove the dragged item
    newImages.splice(draggedIndex, 1);
    
    // Insert it at the new position
    newImages.splice(dropIndex, 0, draggedItem);
    
    onChange(newImages);
    setDraggedIndex(null);
    setDropZoneIndex(null);
  };

  const handleImageDragEnd = () => {
    setDraggedIndex(null);
    setDropZoneIndex(null);
  };

  const handleRemove = async (indexToRemove: number) => {
    const urlToRemove = value[indexToRemove];
    
    try {
      // Extract filename from URL for deletion
      if (urlToRemove.includes('vehicle-images')) {
        const fileName = urlToRemove.split('/').pop();
        if (fileName) {
          await supabase.storage
            .from('vehicle-images')
            .remove([fileName]);
        }
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }

    const newUrls = value.filter((_, index) => index !== indexToRemove);
    onChange(newUrls);
  };

  const handleRemoveAll = async () => {
    try {
      // Delete all files from storage
      const filesToDelete = value
        .filter(url => url.includes('vehicle-images'))
        .map(url => url.split('/').pop())
        .filter(Boolean);

      if (filesToDelete.length > 0) {
        await supabase.storage
          .from('vehicle-images')
          .remove(filesToDelete);
      }
    } catch (error) {
      console.error('Error deleting files:', error);
    }

    onChange([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label>{label}</Label>
          {value.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              Glissez-déposez les images pour les réorganiser. La première image s'affichera sur la carte.
            </p>
          )}
        </div>
        {value.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemoveAll}
            className="text-red-600 hover:text-red-700"
          >
            Supprimer tout
          </Button>
        )}
      </div>
      
      {/* Existing Images Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {value.map((url, index) => (
            <div 
              key={`${url}-${index}`}
              className="relative"
            >
              {/* Drop zone indicator */}
              {dropZoneIndex === index && draggedIndex !== index && (
                <div className="absolute -left-1 top-0 bottom-0 w-1 bg-primary rounded-full z-20 animate-pulse" />
              )}
              
              <div 
                className={`relative group cursor-move transition-all duration-200 ${
                  draggedIndex === index ? 'opacity-30 scale-95 rotate-2' : ''
                } ${dropZoneIndex === index && draggedIndex !== index ? 'ml-2' : ''}`}
                draggable
                onDragStart={(e) => handleImageDragStart(e, index)}
                onDragOver={(e) => handleImageDragOver(e, index)}
                onDragLeave={handleImageDragLeave}
                onDrop={(e) => handleImageDrop(e, index)}
                onDragEnd={handleImageDragEnd}
              >
                {/* Drag handle - repositioned to middle left */}
                <div className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="h-3 w-3 text-white" />
                </div>
                
                {/* Primary image indicator */}
                {index === 0 && (
                  <div className="absolute top-1 left-1 z-10 bg-primary text-white text-xs px-2 py-1 rounded">
                    Principal
                  </div>
                )}
                
                <AspectRatio ratio={4/3}>
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded border"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </AspectRatio>
                
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemove(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragOver ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'}
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.heic,.webp"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={isUploading}
          multiple
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            {value.length > 0 ? (
              <Plus className="h-8 w-8 text-gray-400" />
            ) : (
              <Upload className="h-12 w-12 text-gray-400" />
            )}
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900">
              {isUploading ? 'Téléchargement...' : 
               value.length > 0 ? 'Ajouter d\'autres images' : 'Téléchargez des images'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Glissez et déposez ou cliquez pour sélectionner
            </p>
            <p className="text-xs text-gray-400 mt-1">
              JPG, JPEG, PNG, HEIC, WEBP (max. 5MB chacune)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
