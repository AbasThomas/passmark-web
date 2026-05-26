"use client";

import { useEffect, useState } from "react";

interface MarqueeStripProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  bgColor?: string;
  textColor?: string;
  pauseOnHover?: boolean;
}

export default function MarqueeStrip({
  items,
  direction = "left",
  speed = 30,
  bgColor = "#1A7A4A",
  textColor = "#ffffff",
  pauseOnHover = true,
}: MarqueeStripProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const duplicated = [...items, ...items, ...items];

  // Animation name based on direction
  const animName = direction === "right" ? "marqueeScrollRight" : "marqueeScrollLeft";

  return (
    <div
      className="w-full overflow-hidden py-4"
      style={{ background: bgColor }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        className="flex gap-0 whitespace-nowrap"
        style={
          prefersReducedMotion
            ? {}
            : {
                // Use separate longhand properties — NO shorthand `animation`
                // to avoid React's shorthand/longhand conflict warning
                animationName: animName,
                animationDuration: `${speed}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationPlayState: isPaused ? "paused" : "running",
                willChange: "transform",
              }
        }
      >
        {duplicated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-6 text-sm font-semibold tracking-[0.15em] uppercase"
            style={{
              color: textColor,
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            {item}
            <span style={{ color: textColor, opacity: 0.4 }}>·</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marqueeScrollRight {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}