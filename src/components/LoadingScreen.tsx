import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState<"move" | "grow" | "shrink" | "complete">("move");

  useEffect(() => {
    // Phase 1: Move to center (0.8s)
    const timer1 = setTimeout(() => {
      setPhase("grow");
    }, 800);

    // Phase 2: Grow in size (0.6s)
    const timer2 = setTimeout(() => {
      setPhase("shrink");
    }, 1400);

    // Phase 3: Shrink back (0.6s)
    const timer3 = setTimeout(() => {
      setPhase("complete");
    }, 2000);

    // Phase 4: Fade out (0.4s)
    const timer4 = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-background flex items-center justify-center transition-opacity duration-400 ${
        phase === "complete" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        className={`absolute transition-all duration-700 ease-in-out ${
          phase === "move"
            ? "top-20 left-1/2 -translate-x-1/2 scale-100"
            : phase === "grow"
            ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
            : phase === "shrink"
            ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100"
            : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100"
        }`}
      >
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl border-4 border-primary/20">
          <span className="text-primary-foreground font-bold text-2xl">IEEE</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

