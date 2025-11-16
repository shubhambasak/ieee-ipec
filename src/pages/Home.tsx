import { Button } from "@/components/ui/button";
import InfoCard from "@/components/InfoCard";
import Layout from "@/components/Layout";
import SponsorCarousel from "@/components/SponsorCarousel";
import { Users, Award, Lightbulb, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sponsors = [
  {
    name: "TechCorp",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=200&fit=crop",
    website: "https://example.com",
  },
  {
    name: "InnovateLab",
    logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
    website: "https://example.com",
  },
  {
    name: "FutureTech",
    logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop",
    website: "https://example.com",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const chapters = [
    {
      icon: <Users size={40} />,
      title: "Student Chapter",
      description: "A vibrant community of students passionate about technology, innovation, and professional development.",
      linkTo: "/team",
    },
    {
      icon: <Award size={40} />,
      title: "WIE Chapter",
      description: "Women in Engineering Chapter - Empowering women in technology and promoting diversity in engineering.",
      linkTo: "/team",
    },
    {
      icon: <Lightbulb size={40} />,
      title: "Organizational Chapter",
      description: "Fostering collaboration, organizing events, and creating opportunities for members to grow and learn together.",
      linkTo: "/upcoming-events",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-secondary to-primary/5 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              IEEE Society @ IPEC
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up animate-delay-200">
              Empowering students through technology, innovation, and collaboration
            </p>
            <div className="animate-fade-in-up animate-delay-300">
            <Button
              size="lg"
              className="font-semibold px-8 py-6 text-lg rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-primary/20"
              onClick={() => navigate("/register")}
            >
              Join IEEE @ IPEC
            </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About IEEE IPEC Section */}
      <section className="w-full py-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="glass-strong rounded-3xl p-8 md:p-12 layer-3 border-highlight">
              <div className="text-center">
                <div className="flex justify-center mb-6 animate-scale-in">
                  <div className="text-primary p-4 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/20">
                <Building size={48} />
              </div>
            </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up animate-delay-100">About IEEE IPEC</h2>
                <p className="text-lg text-muted-foreground animate-fade-in-up animate-delay-200">
              The premier technical professional organization dedicated to advancing technology for the benefit of humanity at IPEC. 
              We bring together students, faculty, and industry professionals to foster innovation, share knowledge, and create 
              meaningful opportunities for growth in the field of engineering and technology.
            </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Chapters</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the different chapters that make up our vibrant community
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {chapters.map((chapter, index) => (
            <div
              key={index}
              className="animate-fade-in-up animate-delay-300"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <InfoCard
              icon={chapter.icon}
              title={chapter.title}
              description={chapter.description}
              linkTo={chapter.linkTo}
            />
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-6">
          <div
            onClick={() => navigate("/upcoming-events")}
            className="glass-strong rounded-2xl p-8 layer-3 glass-hover border-highlight cursor-pointer group text-center"
          >
            <h3 className="text-2xl font-bold mb-3 transition-transform group-hover:scale-105">
              Check Out Our New Events
            </h3>
            <p className="text-muted-foreground">
              Discover upcoming workshops, seminars, and networking opportunities.
            </p>
          </div>

          <div
            onClick={() => navigate("/past-events")}
            className="glass-strong rounded-2xl p-8 layer-3 glass-hover border-highlight cursor-pointer group text-center"
          >
            <h3 className="text-2xl font-bold mb-3 transition-transform group-hover:scale-105">
              Check Out Our Previous Events
            </h3>
            <p className="text-muted-foreground">
              Know about our biography at IPEC through our event history.
            </p>
          </div>

          <div
            onClick={() => navigate("/team")}
            className="glass-strong rounded-2xl p-8 layer-3 glass-hover border-highlight cursor-pointer group text-center"
          >
            <h3 className="text-2xl font-bold mb-3 transition-transform group-hover:scale-105">
              Check Out the Team
            </h3>
            <p className="text-muted-foreground">
              Meet the team that's behind the success of IEEE @ IPEC.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary/10 to-secondary/50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto glass-strong rounded-3xl p-8 md:p-12 layer-4 border-highlight-strong">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-muted-foreground mb-6">
            Join our community of innovators, leaders, and tech enthusiasts. Be part of something bigger.
          </p>
          <Button
            variant="outline"
            size="lg"
              className="font-semibold glass-subtle border-primary/30 hover:bg-primary/10"
            onClick={() => navigate("/contact")}
          >
            Get in Touch
          </Button>
          </div>
        </div>
      </section>

      {/* Sponsors & Partners */}
      <SponsorCarousel sponsors={sponsors} />
    </Layout>
  );
};

export default Home;
