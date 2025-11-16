import Layout from "@/components/Layout";
import TeamMemberCard from "@/components/TeamMemberCard";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

interface TeamMember {
  name: string;
  designation: string;
  photoUrl: string;
  linkedinUrl: string;
  email: string;
  bio: string;
}

const Team = () => {
  const [showAlumni, setShowAlumni] = useState(false);
  
  const defaultCurrentTeam: TeamMember[] = [
    {
      name: "Kunal Sharma",
      designation: "Chairperson",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
      linkedinUrl: "https://linkedin.com/in/kunal-sharma",
      email: "chairperson@ieeeipec.org",
      bio: "Leading IEEE @ IPEC with passion for technology and innovation.",
    },
    {
      name: "Ansh Sharma",
      designation: "Co-chair",
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
      linkedinUrl: "https://linkedin.com/in/ansh-sharma",
      email: "cochair@ieeeipec.org",
      bio: "Co-leading initiatives and fostering innovation in our community.",
    },
    {
      name: "Riddhi Jain",
      designation: "Vice Chair",
      photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces",
      linkedinUrl: "https://linkedin.com/in/riddhi-jain",
      email: "vicechair@ieeeipec.org",
      bio: "Supporting leadership and driving technical excellence.",
    },
    {
      name: "Rishabh Wasan",
      designation: "Secretary",
      photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces",
      linkedinUrl: "https://linkedin.com/in/rishabh-wasan",
      email: "secretary@ieeeipec.org",
      bio: "Managing communications and organizational activities.",
    },
    {
      name: "Vyom Dharni",
      designation: "Treasurer",
      photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
      linkedinUrl: "https://linkedin.com/in/vyom-dharni",
      email: "treasurer@ieeeipec.org",
      bio: "Overseeing financial management and budgeting.",
    },
    {
      name: "Adnan Khan",
      designation: "Web Master",
      photoUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=faces",
      linkedinUrl: "https://linkedin.com/in/adnan-khan",
      email: "webmaster@ieeeipec.org",
      bio: "Maintaining our digital presence and web infrastructure.",
    },
  ];

  const [currentTeam, setCurrentTeam] = useState<TeamMember[]>(defaultCurrentTeam);
  const [alumniTeam, setAlumniTeam] = useState<TeamMember[]>([
    {
      name: "Priya Malhotra",
      designation: "Former Chairperson",
      photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces",
      linkedinUrl: "https://linkedin.com/in/priya-malhotra",
      email: "priya.malhotra@ieeeipec.org",
      bio: "Former chairperson who led IEEE @ IPEC to new heights.",
    },
    {
      name: "Arjun Mehta",
      designation: "Former Vice Chair",
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
      linkedinUrl: "https://linkedin.com/in/arjun-mehta",
      email: "arjun.mehta@ieeeipec.org",
      bio: "Former vice chair with expertise in technical leadership.",
    },
    {
      name: "Neha Kapoor",
      designation: "Former Secretary",
      photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
      linkedinUrl: "https://linkedin.com/in/neha-kapoor",
      email: "neha.kapoor@ieeeipec.org",
      bio: "Former secretary who excelled in organizational management.",
    },
    {
      name: "Rahul Singh",
      designation: "Former Treasurer",
      photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces",
      linkedinUrl: "https://linkedin.com/in/rahul-singh",
      email: "rahul.singh@ieeeipec.org",
      bio: "Former treasurer with strong financial acumen.",
    },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("ieee-team");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (Array.isArray(data) && data.length > 0) {
          setCurrentTeam(data);
        }
      } catch (e) {
        console.error("Failed to load team from storage:", e);
      }
    }
  }, []);

  const displayedMembers = showAlumni ? alumniTeam : currentTeam;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated individuals leading IEEE Society @ IPEC
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <Label htmlFor="team-toggle" className="text-base font-medium cursor-pointer">
            Current Team
          </Label>
          <Switch
            id="team-toggle"
            checked={showAlumni}
            onCheckedChange={setShowAlumni}
          />
          <Label htmlFor="team-toggle" className="text-base font-medium cursor-pointer">
            Alumni
          </Label>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displayedMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              name={member.name}
              designation={member.designation}
              photoUrl={member.photoUrl}
              linkedinUrl={member.linkedinUrl}
              email={member.email}
              bio={member.bio}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Team;
