import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Linkedin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import OptimizedImage from "./OptimizedImage";

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  designation: string;
  photoUrl: string;
  linkedinUrl?: string;
  email?: string;
  bio?: string;
}

const TeamMemberModal = ({
  isOpen,
  onClose,
  name,
  designation,
  photoUrl,
  linkedinUrl,
  email,
  bio,
}: TeamMemberModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-highlight max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <OptimizedImage
                src={photoUrl}
                alt={name}
                aspectRatio="square"
                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl"
                priority
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-primary mb-2">{designation}</h3>
              {bio && <p className="text-muted-foreground">{bio}</p>}
              <div className="flex gap-3 mt-4">
                {email && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass-subtle"
                    onClick={() => window.location.href = `mailto:${email}`}
                  >
                    <Mail size={16} className="mr-2" />
                    Email
                  </Button>
                )}
                {linkedinUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass-subtle"
                    onClick={() => window.open(linkedinUrl, "_blank")}
                  >
                    <Linkedin size={16} className="mr-2" />
                    LinkedIn
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberModal;

