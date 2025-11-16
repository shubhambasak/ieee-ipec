export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  category: "workshop" | "talk" | "competition" | "networking" | "exhibition";
  status: "upcoming" | "past";
  location?: string;
  registrationUrl?: string;
  tags?: string[];
  galleryImages?: string[];
}

// Mock data - In production, this would come from an API
export const events: Event[] = [
  {
    id: "1",
    title: "Web Development Workshop",
    date: "2025-03-15",
    description: "Learn modern web development with React, TypeScript, and Tailwind CSS. Build real-world projects and gain hands-on experience.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    category: "workshop",
    status: "upcoming",
    location: "IPEC Campus",
    tags: ["Web Development", "React", "TypeScript"],
  },
  {
    id: "2",
    title: "Cybersecurity Fundamentals",
    date: "2025-03-22",
    description: "Essential cybersecurity concepts, ethical hacking basics, and best practices for secure software development.",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    category: "workshop",
    status: "upcoming",
    location: "IPEC Campus",
    tags: ["Cybersecurity", "Ethical Hacking"],
  },
  {
    id: "3",
    title: "Tech Talk: Future of AI",
    date: "2025-04-05",
    description: "Industry experts discuss the latest trends in artificial intelligence and its impact on various sectors.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    category: "talk",
    status: "upcoming",
    location: "IPEC Auditorium",
    tags: ["AI", "Machine Learning", "Technology"],
  },
  {
    id: "4",
    title: "Mobile App Development Bootcamp",
    date: "2025-04-12",
    description: "Comprehensive bootcamp covering iOS and Android development using React Native and Flutter.",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    category: "workshop",
    status: "upcoming",
    location: "IPEC Campus",
    tags: ["Mobile Development", "React Native", "Flutter"],
  },
  {
    id: "5",
    title: "Data Science Workshop",
    date: "2025-04-20",
    description: "Introduction to data analysis, visualization, and machine learning using Python and popular libraries.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    category: "workshop",
    status: "upcoming",
    location: "IPEC Campus",
    tags: ["Data Science", "Python", "Machine Learning"],
  },
  {
    id: "6",
    title: "IEEE Annual Tech Fest 2025",
    date: "2025-05-10",
    description: "Three-day fest featuring competitions, workshops, exhibitions, and networking opportunities with industry leaders.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    category: "competition",
    status: "upcoming",
    location: "IPEC Campus",
    tags: ["Tech Fest", "Competition", "Networking"],
  },
  {
    id: "7",
    title: "Tech Innovation Summit 2024",
    date: "2024-11-15",
    description: "A day-long summit featuring keynote speakers, workshops, and networking sessions focused on emerging technologies.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    category: "talk",
    status: "past",
    location: "IPEC Auditorium",
    tags: ["Innovation", "Technology"],
  },
  {
    id: "8",
    title: "Hackathon 2024",
    date: "2024-10-20",
    description: "24-hour coding marathon where students built innovative solutions to real-world problems.",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
    category: "competition",
    status: "past",
    location: "IPEC Campus",
    tags: ["Hackathon", "Coding"],
  },
  {
    id: "9",
    title: "AI/ML Workshop Series",
    date: "2024-09-10",
    description: "Comprehensive workshop series covering machine learning fundamentals and practical implementations.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    category: "workshop",
    status: "past",
    location: "IPEC Campus",
    tags: ["AI", "Machine Learning"],
  },
  {
    id: "10",
    title: "Women in Tech Panel",
    date: "2024-08-25",
    description: "Inspiring panel discussion featuring successful women engineers sharing their career journeys.",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
    category: "talk",
    status: "past",
    location: "IPEC Auditorium",
    tags: ["Women in Tech", "Panel Discussion"],
  },
  {
    id: "11",
    title: "IoT Project Exhibition",
    date: "2024-07-15",
    description: "Student showcase of innovative IoT projects ranging from smart home systems to environmental monitoring.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    category: "exhibition",
    status: "past",
    location: "IPEC Campus",
    tags: ["IoT", "Exhibition"],
  },
  {
    id: "12",
    title: "Career Development Bootcamp",
    date: "2024-06-20",
    description: "Intensive bootcamp covering resume building, interview skills, and professional networking strategies.",
    imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
    category: "workshop",
    status: "past",
    location: "IPEC Campus",
    tags: ["Career Development", "Professional Skills"],
  },
];

const getEventsFromStorage = (): Event[] => {
  if (typeof window === "undefined") return events;
  const saved = localStorage.getItem("ieee-events");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load events from storage:", e);
    }
  }
  return events;
};

export const getUpcomingEvents = (): Event[] => {
  const allEvents = getEventsFromStorage();
  return allEvents.filter((event) => event.status === "upcoming");
};

export const getPastEvents = (): Event[] => {
  const allEvents = getEventsFromStorage();
  return allEvents.filter((event) => event.status === "past");
};

export const getEventById = (id: string): Event | undefined => {
  const allEvents = getEventsFromStorage();
  return allEvents.find((event) => event.id === id);
};

export const getEventsByCategory = (category: Event["category"]): Event[] => {
  const allEvents = getEventsFromStorage();
  return allEvents.filter((event) => event.category === category);
};

export const formatEventDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

