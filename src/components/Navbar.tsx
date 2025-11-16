import { NavLink } from "@/components/NavLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Team", path: "/team" },
    { name: "Past Events", path: "/past-events" },
    { name: "Upcoming Events", path: "/upcoming-events" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-subtle border-b border-border/50 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg border border-primary/20 transition-transform group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-lg">IEEE</span>
            </div>
            <span className="font-semibold text-lg hidden sm:inline">@ IPEC</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className="px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-card/50 backdrop-blur-sm transition-all duration-300 ease-out border border-transparent hover:border-border/30 hover:scale-105 active:scale-95 focus-ring"
                activeClassName="font-medium bg-card/40 backdrop-blur-sm border border-primary/20 text-primary scale-105"
              >
                {item.name}
              </NavLink>
            ))}
            <div className="ml-2 p-1 rounded-lg hover:bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95">
            <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="p-1 rounded-lg hover:bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95">
            <ThemeToggle />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 focus-ring"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 glass-subtle -mx-4 px-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-card/50 backdrop-blur-sm transition-all duration-300 ease-out border border-transparent hover:border-border/30 mb-1 hover:scale-105 active:scale-95 focus-ring"
                activeClassName="font-medium bg-card/40 backdrop-blur-sm border border-primary/20 text-primary"
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
