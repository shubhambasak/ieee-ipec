import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";

interface Sponsor {
  name: string;
  logo: string;
  website?: string;
}

interface SponsorCarouselProps {
  sponsors: Sponsor[];
  title?: string;
}

const SponsorCarousel = ({ sponsors, title = "Our Partners & Sponsors" }: SponsorCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || sponsors.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sponsors.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, sponsors.length]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % sponsors.length);
    setIsAutoPlaying(false);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + sponsors.length) % sponsors.length);
    setIsAutoPlaying(false);
  };

  if (sponsors.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="glass-strong rounded-3xl p-8 layer-3 border-highlight overflow-hidden">
            <div className="flex items-center justify-center min-h-[200px]">
              {sponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className={`absolute transition-all duration-500 ease-in-out ${
                    index === currentIndex
                      ? "opacity-100 scale-100 translate-x-0"
                      : index < currentIndex
                      ? "opacity-0 -translate-x-full scale-90"
                      : "opacity-0 translate-x-full scale-90"
                  }`}
                >
                  <a
                    href={sponsor.website || "#"}
                    target={sponsor.website ? "_blank" : undefined}
                    rel={sponsor.website ? "noopener noreferrer" : undefined}
                    className="block hover:scale-105 transition-transform duration-300"
                  >
                    <OptimizedImage
                      src={sponsor.logo}
                      alt={sponsor.name}
                      aspectRatio="auto"
                      className="max-w-xs max-h-32 object-contain"
                      priority={index === currentIndex}
                    />
                  </a>
                </div>
              ))}
            </div>

            {sponsors.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 glass-strong p-3 rounded-full hover:bg-card/90 transition-all duration-300 border border-border/50 shadow-lg hover:scale-110 z-10"
                  aria-label="Previous sponsor"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 glass-strong p-3 rounded-full hover:bg-card/90 transition-all duration-300 border border-border/50 shadow-lg hover:scale-110 z-10"
                  aria-label="Next sponsor"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {sponsors.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentIndex(index);
                        setIsAutoPlaying(false);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex ? "bg-primary w-8" : "bg-foreground/30 w-2 hover:bg-foreground/50"
                      }`}
                      aria-label={`Go to sponsor ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorCarousel;

