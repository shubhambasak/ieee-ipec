import { Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TeamMemberModal from "./TeamMemberModal";
import OptimizedImage from "./OptimizedImage";

interface TeamMemberCardProps {
  name: string;
  designation: string;
  photoUrl: string;
  linkedinUrl: string;
  email?: string;
  bio?: string;
}

const TeamMemberCard = ({ name, designation, photoUrl, linkedinUrl, email, bio }: TeamMemberCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="glass-strong rounded-2xl p-6 layer-3 border-highlight card-interactive focus-ring text-center cursor-pointer"
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View ${name}'s profile`}
      >
        <div className="mb-4 flex justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
            <OptimizedImage
              src={photoUrl}
              alt={`${name} - ${designation}`}
              aspectRatio="square"
              className="w-full h-full"
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-primary font-medium mb-4">{designation}</p>
        <div className="flex gap-2">
          {linkedinUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 glass-subtle"
              onClick={(e) => {
                e.stopPropagation();
                window.open(linkedinUrl, "_blank");
              }}
            >
              <Linkedin size={16} className="mr-2" />
              LinkedIn
            </Button>
          )}
          {email && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 glass-subtle"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `mailto:${email}`;
              }}
            >
              <Mail size={16} className="mr-2" />
              Email
            </Button>
          )}
        </div>
      </div>

      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={name}
        designation={designation}
        photoUrl={photoUrl}
        linkedinUrl={linkedinUrl}
        email={email}
        bio={bio}
      />
    </>
  );
};

export default TeamMemberCard;
