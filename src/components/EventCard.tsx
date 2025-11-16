import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import { useState } from "react";
import EventGalleryModal from "./EventGalleryModal";
import RegistrationForm from "./RegistrationForm";

interface EventCardProps {
  title: string;
  date?: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  onButtonClick?: () => void;
  priority?: boolean;
  galleryImages?: string[];
  isUpcoming?: boolean;
}

const EventCard = ({ 
  title, 
  date, 
  description, 
  imageUrl, 
  buttonText, 
  onButtonClick,
  priority = false,
  galleryImages = [],
  isUpcoming = false
}: EventCardProps) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (isUpcoming) {
      setIsRegistrationOpen(true);
    } else if (galleryImages.length > 0) {
      setIsGalleryOpen(true);
    }
  };

  return (
    <>
      <div className="glass-strong rounded-2xl overflow-hidden layer-3 glass-hover border-highlight card-interactive focus-ring">
        <div className="relative overflow-hidden">
          <OptimizedImage
            src={imageUrl}
            alt={title}
            aspectRatio="video"
            priority={priority}
            className="hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
        </div>
        <div className="p-6 bg-card/50 backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          {date && (
            <div className="flex items-center text-primary mb-3">
              <Calendar size={16} className="mr-2" />
              <span className="text-sm font-medium">{date}</span>
            </div>
          )}
          <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
          <Button
            variant="outline"
            className="w-full glass-subtle border-border/50"
            onClick={handleButtonClick}
          >
            {buttonText}
          </Button>
        </div>
      </div>

      {galleryImages.length > 0 && (
        <EventGalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          eventTitle={title}
          images={galleryImages}
        />
      )}

      {isUpcoming && (
        <RegistrationForm
          isOpen={isRegistrationOpen}
          onClose={() => setIsRegistrationOpen(false)}
          eventTitle={title}
        />
      )}
    </>
  );
};

export default EventCard;
