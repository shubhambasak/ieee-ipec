import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  linkTo?: string;
  linkText?: string;
}

const InfoCard = ({ icon, title, description, linkTo, linkText = "Learn More" }: InfoCardProps) => {
  return (
    <div className="glass-strong rounded-2xl p-6 layer-3 glass-hover border-highlight card-interactive focus-ring">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      {linkTo && (
        <Link
          to={linkTo}
          className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-all duration-300 group"
        >
          {linkText}
          <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
};

export default InfoCard;
