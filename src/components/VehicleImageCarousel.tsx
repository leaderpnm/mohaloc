
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useLanguage } from '@/hooks/useLanguage';

interface VehicleImageCarouselProps {
  images: string[];
  vehicleName: string;
}

const VehicleImageCarousel: React.FC<VehicleImageCarouselProps> = ({ images, vehicleName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const { isRTL } = useLanguage();

  if (!images || images.length === 0) {
    return (
      <AspectRatio ratio={4/3} className="bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Aucune image</span>
      </AspectRatio>
    );
  }

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  // Gestion des événements tactiles
  const handleTouchStart = (e: React.TouchEvent) => {
    if (images.length <= 1) return;
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (images.length <= 1) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (images.length <= 1 || touchStartX.current === null) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const touchDiff = touchStartX.current - (touchEndX.current || touchStartX.current);
    const minSwipeDistance = 50;

    if (Math.abs(touchDiff) > minSwipeDistance) {
      if (touchDiff > 0) {
        // Swipe vers la gauche - image suivante
        goToNext();
      } else {
        // Swipe vers la droite - image précédente
        goToPrevious();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const hasMultipleImages = images.length > 1;

  return (
    <AspectRatio ratio={4/3} className="relative overflow-hidden">
      {/* Image principale avec gestion tactile */}
      <div
        className="w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img 
          src={images[currentIndex]} 
          alt={`${vehicleName} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300 select-none"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Pas+d\'image';
          }}
          draggable={false}
        />
      </div>

      {/* Flèches de navigation - visibles en permanence si plusieurs images */}
      {hasMultipleImages && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/80 hover:bg-white/90 transition-all duration-200 shadow-md"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/80 hover:bg-white/90 transition-all duration-200 shadow-md"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Indicateurs de pagination - visibles en permanence si plusieurs images */}
      {hasMultipleImages && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 transition-opacity duration-200">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-white shadow-md' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              onClick={(e) => goToSlide(index, e)}
            />
          ))}
        </div>
      )}

      {/* Compteur d'images - visible en permanence si plusieurs images */}
      {hasMultipleImages && (
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded transition-opacity duration-200">
          {currentIndex + 1}/{images.length}
        </div>
      )}
    </AspectRatio>
  );
};

export default VehicleImageCarousel;
