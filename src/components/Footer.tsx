import { Linkedin, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-border/50">
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg border border-primary/20">
              <span className="text-primary-foreground font-bold text-xl">IEEE</span>
            </div>
            <div>
              <p className="font-semibold">IEEE Society @ IPEC</p>
              <p className="text-sm text-muted-foreground">© 2025 All rights reserved</p>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://linkedin.com/company/ieee-ipec"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full glass-subtle hover:glass-strong transition-all duration-300 border border-border/30 hover:border-primary/30 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} className="text-foreground/70 hover:text-primary transition-colors" />
            </a>
            <a
              href="https://www.instagram.com/ieeeipec/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full glass-subtle hover:glass-strong transition-all duration-300 border border-border/30 hover:border-primary/30 hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram size={20} className="text-foreground/70 hover:text-primary transition-colors" />
            </a>
            <a
              href="https://twitter.com/ieee_ipec"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full glass-subtle hover:glass-strong transition-all duration-300 border border-border/30 hover:border-primary/30 hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter size={20} className="text-foreground/70 hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
