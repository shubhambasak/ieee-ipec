import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "./ThemeProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnnouncementBanner from "./AnnouncementBanner";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [announcement, setAnnouncement] = useState({
    message: "🎉 IEEE Tech Fest 2025 registration is now open! Join us for an amazing experience.",
    type: "info" as const,
    actionText: "Register Now",
    isActive: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem("ieee-announcement");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.isActive) {
          setAnnouncement(data);
        }
      } catch (e) {
        console.error("Failed to load announcement:", e);
      }
    }
  }, []);

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem={false} 
      storageKey="ieee-theme"
      themes={["light", "dark"]}
    >
      <div className="min-h-screen flex flex-col relative bg-background">
        <div className="ieee-bg-pattern" />
        <div className="relative z-10 flex flex-col min-h-screen bg-background">
          {announcement.isActive && (
            <AnnouncementBanner
              message={announcement.message}
              type={announcement.type}
              actionText={announcement.actionText}
              onAction={() => window.location.href = "/upcoming-events"}
            />
          )}
        <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
