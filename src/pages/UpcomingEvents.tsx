import Layout from "@/components/Layout";
import EventCard from "@/components/EventCard";
import { useToast } from "@/hooks/use-toast";
import { getUpcomingEvents, formatEventDate } from "@/lib/events";
import EventSearchFilter from "@/components/EventSearchFilter";
import { useState } from "react";

const UpcomingEvents = () => {
  const { toast } = useToast();
  const allEvents = getUpcomingEvents();
  const [filteredEvents, setFilteredEvents] = useState(allEvents);

  const handleRegister = (eventTitle: string) => {
    toast({
      title: "Registration Initiated",
      description: `You'll be redirected to register for ${eventTitle}`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join us for exciting workshops, talks, and networking opportunities
          </p>
        </div>

        {/* Search and Filter */}
        <EventSearchFilter
          events={allEvents}
          onFilteredEventsChange={setFilteredEvents}
        />

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
                buttonText="Register Now"
                onButtonClick={() => handleRegister(event.title)}
                priority={index < 3}
                isUpcoming={true}
                galleryImages={event.galleryImages}
              />
            </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UpcomingEvents;
