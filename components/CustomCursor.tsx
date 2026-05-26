"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type CursorMode = "default" | "link" | "explore";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, select, textarea";
const FEATURE_SELECTOR = ".bento-card, .card-study-block, .gamif-card, .problem-tile";

function isDarkElement(element: Element | null) {
  let current = element;

  while (current && current !== document.documentElement) {
    const background = window.getComputedStyle(current).backgroundColor;
    const match = background.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);

    if (match) {
      const alpha = match[4] ? Number(match[4]) : 1;

      if (alpha > 0.1) {
        const r = Number(match[1]);
        const g = Number(match[2]);
        const b = Number(match[3]);
        const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

        return luminance < 0.36;
      }
    }

    current = current.parentElement;
  }

  return false;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const magneticTarget = useRef<HTMLElement | null>(null);
  const animationFrame = useRef<number | null>(null);
  
  const [mode, setMode] = useState<CursorMode>("default");
  const [hoverText, setHoverText] = useState("EXPLORE →");
  const [useBlendMode, setUseBlendMode] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    if (!pointerQuery.matches) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!cursor || !ring || !dot) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateHoverState = (target: Element | null) => {
      const featureCard = target?.closest(FEATURE_SELECTOR);
      const interactive = target?.closest(INTERACTIVE_SELECTOR);

      if (featureCard) {
        magneticTarget.current = null;
        setMode("explore");
        
        // Context-aware dynamic labels
        if (target?.closest(".features-serif")) {
          setHoverText("SCROLL →");
        } else if (target?.closest(".problem-serif")) {
          setHoverText("SOLVE →");
        } else if (target?.closest(".gamif-card") || target?.closest("section:nth-of-type(6)")) {
          setHoverText("LEVEL UP →");
        } else {
          setHoverText("EXPLORE →");
        }
      } else if (interactive instanceof HTMLElement) {
        magneticTarget.current = interactive;
        setMode("link");
      } else {
        magneticTarget.current = null;
        setMode("default");
      }

      setUseBlendMode(isDarkElement(target));
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = { x: event.clientX, y: event.clientY };
      updateHoverState(document.elementFromPoint(event.clientX, event.clientY));
    };

    const handleMouseDown = () => {
      gsap.to(dot, { scale: 0.5, duration: 0.15 });
      gsap.to(ring, { scale: 0.85, duration: 0.15 });
    };

    const handleMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.2, ease: "power2.out" });
      gsap.to(ring, { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    const animate = () => {
      const target = magneticTarget.current;
      let targetX = mousePos.current.x;
      let targetY = mousePos.current.y;

      if (target) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        targetX += (centerX - targetX) * 0.35;
        targetY += (centerY - targetY) * 0.35;
      }

      if (prefersReducedMotion) {
        cursorPos.current = { x: targetX, y: targetY };
      } else {
        // Delicate smooth trailing interpolation
        cursorPos.current.x += (targetX - cursorPos.current.x) * 0.18;
        cursorPos.current.y += (targetY - cursorPos.current.y) * 0.18;
      }

      cursor.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`;
      animationFrame.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const isExpanded = mode === "link" || mode === "explore";

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`custom-cursor fixed left-0 top-0 z-[9999] pointer-events-none items-center justify-center transition-[width,height] duration-300 ease-out ${
        useBlendMode ? "mix-blend-difference" : "mix-blend-normal"
      }`}
      style={{
        width: mode === "explore" ? 100 : isExpanded ? 46 : 22,
        height: mode === "explore" ? 32 : isExpanded ? 46 : 22,
      }}
    >
      {/* Outer Trailing Ring */}
      <div
        ref={ringRef}
        className="absolute inset-0 rounded-full transition-all duration-300 ease-out flex items-center justify-center overflow-hidden"
        style={{
          border: mode === "explore" 
            ? "none" 
            : mode === "link" 
            ? "1.5px solid #006036" 
            : "1px solid rgba(26, 122, 74, 0.35)",
          backgroundColor: mode === "explore" ? "#006036" : "transparent",
        }}
      >
        {mode === "explore" ? (
          <span className="text-[9px] font-bold tracking-[0.2em] text-white uppercase whitespace-nowrap select-none font-sans">
            {hoverText}
          </span>
        ) : null}
      </div>

      {/* Inner Solid Core Dot */}
      <div
        ref={dotRef}
        className="w-2 h-2 rounded-full transition-all duration-200 ease-out z-10"
        style={{
          backgroundColor: "#006036",
          opacity: mode === "explore" ? 0 : mode === "link" ? 0 : 1,
          transform: mode === "default" ? "scale(1)" : "scale(0)",
        }}
      />
    </div>
  );
}
