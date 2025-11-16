import Layout from "@/components/Layout";
import EventCard from "@/components/EventCard";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPastEvents, formatEventDate } from "@/lib/events";
import OptimizedImage from "@/components/OptimizedImage";
import EventSearchFilter from "@/components/EventSearchFilter";

const PastEvents = () => {
  const allEvents = getPastEvents();
  const [filteredEvents, setFilteredEvents] = useState(allEvents);
  
  // Use event images for slideshow
  const slideshowImages = allEvents
    .slice(0, 5)
    .map((event) => event.imageUrl);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Past Events</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Celebrating our journey of innovation and learning
          </p>
        </div>

        {/* Search and Filter */}
        <EventSearchFilter
          events={allEvents}
          onFilteredEventsChange={setFilteredEvents}
        />

        {/* Slideshow */}
        <div className="relative max-w-5xl mx-auto mb-16 rounded-3xl overflow-hidden layer-4 border-highlight animate-fade-in-up">
          <div className="aspect-[21/9] overflow-hidden">
            <OptimizedImage
              src={slideshowImages[currentSlide]}
              alt="Event slideshow"
              aspectRatio="auto"
              className="w-full h-full"
              priority={currentSlide === 0}
            />
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 glass-strong p-3 rounded-full hover:bg-card/90 transition-all duration-300 border border-border/50 shadow-lg hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 glass-strong p-3 rounded-full hover:bg-card/90 transition-all duration-300 border border-border/50 shadow-lg hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 glass-subtle px-3 py-2 rounded-full backdrop-blur-md border border-border/30">
            {slideshowImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-primary w-8" : "bg-foreground/30 w-2 hover:bg-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No events found matching your criteria.</p>
            </div>
          ) : (
            filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className="animate-fade-in-up animate-delay-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
            <EventCard
              title={event.title}
                date={formatEventDate(event.date)}
              description={event.description}
              imageUrl={event.imageUrl}
              buttonText="View Gallery"
                priority={index < 3}
                galleryImages={event.galleryImages || [
                  event.imageUrl,
                  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
                  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
                ]}
            />
            </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PastEvents;
