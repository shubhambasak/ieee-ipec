import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useState } from "react";
import OptimizedImage from "./OptimizedImage";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EventGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  images: string[];
}

const EventGalleryModal = ({ isOpen, onClose, eventTitle, images }: EventGalleryModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full p-0 glass-strong border-highlight">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold">{eventTitle} - Gallery</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video bg-muted rounded-b-lg overflow-hidden">
          <OptimizedImage
            src={images[currentImageIndex]}
            alt={`${eventTitle} - Image ${currentImageIndex + 1}`}
            aspectRatio="auto"
            className="w-full h-full"
            priority
          />
          
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 glass-strong p-3 rounded-full hover:bg-card/90 transition-all duration-300 border border-border/50 shadow-lg hover:scale-110 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 glass-strong p-3 rounded-full hover:bg-card/90 transition-all duration-300 border border-border/50 shadow-lg hover:scale-110 z-10"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-subtle px-3 py-2 rounded-full backdrop-blur-md border border-border/30 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? "bg-primary w-8" : "bg-foreground/30 w-2 hover:bg-foreground/50"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="p-4 text-center text-sm text-muted-foreground">
          Image {currentImageIndex + 1} of {images.length}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventGalleryModal;

