import { X, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface AnnouncementBannerProps {
  message: string;
  type?: "info" | "warning" | "success";
  dismissible?: boolean;
  actionText?: string;
  onAction?: () => void;
}

const AnnouncementBanner = ({
  message,
  type = "info",
  dismissible = true,
  actionText,
  onAction,
}: AnnouncementBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if banner was previously dismissed
    const dismissed = localStorage.getItem("announcement-dismissed");
    if (dismissed === "true") {
      setIsDismissed(true);
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("announcement-dismissed", "true");
    setTimeout(() => setIsDismissed(true), 300);
  };

  if (isDismissed) return null;

  const typeStyles = {
    info: "bg-primary/10 border-primary/30 text-primary",
    warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400",
    success: "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400",
  };

  return (
    <div
      className={`relative glass-subtle border-b border-border/50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-medium flex-1">{message}</p>
          </div>
          <div className="flex items-center gap-2">
            {actionText && onAction && (
              <Button
                size="sm"
                variant="outline"
                onClick={onAction}
                className="glass-subtle border-border/50 text-xs"
              >
                {actionText}
              </Button>
            )}
            {dismissible && (
              <button
                onClick={handleDismiss}
                className="p-1 rounded-md hover:bg-card/50 transition-colors"
                aria-label="Dismiss announcement"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;

