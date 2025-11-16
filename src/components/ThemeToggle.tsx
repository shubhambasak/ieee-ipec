import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync HTML class with theme changes
  useEffect(() => {
    if (!mounted || typeof document === "undefined") return;
    
    const html = document.documentElement;
    const currentTheme = resolvedTheme || theme;
    
    // Remove both classes first
    html.classList.remove("dark", "light");
    
    // Add the appropriate class
    if (currentTheme === "dark") {
      html.classList.add("dark");
    } else {
      // For light mode, we don't need to add "light" class as it's the default
      // But we ensure "dark" is removed
    }
  }, [theme, resolvedTheme, mounted]);

  const toggleTheme = () => {
    if (!mounted) return;
    
    const currentTheme = resolvedTheme || theme || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    // Set the theme - next-themes will handle persistence and class management
    setTheme(newTheme);
  };

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg hover:bg-card/50 backdrop-blur-sm transition-all duration-300"
        aria-label="Toggle theme"
        disabled
        type="button"
      >
        <Sun size={20} />
      </button>
    );
  }

  const currentTheme = resolvedTheme || theme || "light";
  const isDark = currentTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-card/50 backdrop-blur-sm transition-all duration-300 ease-out hover:scale-110 active:scale-95 focus-ring"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      type="button"
    >
      <div className="transition-transform duration-500 ease-in-out hover:rotate-12">
        {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-400" />}
      </div>
    </button>
  );
}
