"use client";

import { useEffect, useRef } from "react";
import { Instrument_Serif } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const signatureFont = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-passmark-signature",
});

const LETTERS = [
  { char: "D", isPass: true  },
  { char: "o", isPass: true  },
  { char: "w", isPass: true  },
  { char: "n", isPass: true  },
  { char: "l", isPass: true  },
  { char: "o", isPass: true  },
  { char: "a", isPass: true  },
  { char: "d", isPass: true  },
  { char: " ", isPass: true  },
  { char: "t", isPass: false },
  { char: "h", isPass: false },
  { char: "e", isPass: false },
  { char: " ", isPass: false },
  { char: "P", isPass: true  },
  { char: "a", isPass: true  },
  { char: "s", isPass: true  },
  { char: "s", isPass: true  },
  { char: "m", isPass: true  },
  { char: "a", isPass: true  },
  { char: "r", isPass: true  },
  { char: "k", isPass: true  },
  { char: " ", isPass: true  },
  { char: "a", isPass: false },
  { char: "p", isPass: false },
  { char: "p", isPass: false },
  { char: " ", isPass: false },
  { char: "t", isPass: true  },
  { char: "o", isPass: true  },
  { char: "d", isPass: true  },
  { char: "a", isPass: true  },
  { char: "y.", isPass: true  },
];

const GREEN     = { r: 26,  g: 122, b: 74 };
const GREEN_DIM = { r: 6,   g: 30,  b: 18 };
const GOLD      = { r: 245, g: 166, b: 35 };
const GOLD_DIM  = { r: 60,  g: 40,  b: 8  };

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

const NON_SPACE_TOTAL = LETTERS.filter(l => l.char !== " ").length;

export default function PassmarkScroll() {
  const sectionRef    = useRef<HTMLElement>(null);
  const stickyRef     = useRef<HTMLDivElement>(null);
  const trackRef      = useRef<HTMLDivElement>(null);
  const lettersRef    = useRef<(HTMLSpanElement | null)[]>([]);
  const canvasRef     = useRef<HTMLCanvasElement>(null);

  /* ── Grain ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const draw = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const img = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 28;
      }
      ctx.putImageData(img, 0, 0);
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  /* ── Scroll mechanic ── */
  useEffect(() => {
    const section = sectionRef.current;
    const sticky  = stickyRef.current;
    const track   = trackRef.current;
    if (!section || !sticky || !track) return;

    // The active animation window is 0–0.85, leaving 0.15 (15% of scroll)
    // as a hold at the end before the section exits — acts as the delay.
    const ANIM_END = 0.85;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.4,
        pin: sticky,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Remap progress so animation completes at ANIM_END, then holds
          const raw = self.progress;
          const p   = Math.min(1, raw / ANIM_END);

          /* ── Horizontal track translate ── */
          const maxX = track.scrollWidth - window.innerWidth;
          gsap.set(track, { x: -Math.max(0, maxX) * p });

          /* ── Per-letter colour + scale reveal ── */
          let nonSpaceIndex = 0;
          lettersRef.current.forEach((el, i) => {
            if (!el) return;
            const { isPass, char } = LETTERS[i];
            if (char === " ") return;

            const threshold = nonSpaceIndex / NON_SPACE_TOTAL;
            const window_   = 1 / NON_SPACE_TOTAL;
            const localP    = Math.max(0, Math.min(1, (p - threshold) / window_));
            nonSpaceIndex++;

            const from = isPass ? GREEN_DIM : GOLD_DIM;
            const to   = isPass ? GREEN     : GOLD;
            const r    = lerp(from.r, to.r, localP);
            const g    = lerp(from.g, to.g, localP);
            const b    = lerp(from.b, to.b, localP);

            el.style.color      = `rgb(${r},${g},${b})`;
            el.style.opacity    = String(0.12 + localP * 0.88);
            el.style.transform  = `scaleY(${0.80 + localP * 0.20})`;
            el.style.textShadow = "none";
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hide scrollbar globally for this experience */}
      <style>{`
        html { scrollbar-width: none; }
        html::-webkit-scrollbar { display: none; }
      `}</style>

      <section
        ref={sectionRef}
        className={`${signatureFont.variable} relative`}
        style={{ height: "1800vh", background: "#061206" }}
      >
        <div
          ref={stickyRef}
          className="sticky top-0 flex h-screen w-full flex-col items-center justify-center"
          style={{
            background: "#061206",
            overflow:   "hidden",
          }}
        >
          {/* Grain */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.22]"
            style={{ mixBlendMode: "overlay" }}
          />

          {/* Green ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 65% at 50% 50%, rgba(26,122,74,0.14) 0%, transparent 70%)",
            }}
          />

          {/* Gold top edge */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 25% at 50% 0%, rgba(245,166,35,0.05) 0%, transparent 60%)",
            }}
          />

          {/* Letter track — py gives vertical room so ascenders/descenders aren't clipped */}
          <div
            className="relative z-10 w-full"
            style={{ overflow: "visible", paddingBlock: "8vh" }}
          >
            <div
              ref={trackRef}
              className="flex items-baseline will-change-transform"
              style={{
                width:        "max-content",
                paddingLeft:  "8vw",
                paddingRight: "20vw",
                gap:          "0",
              }}
            >
              {LETTERS.map(({ char, isPass }, i) => (
                <span
                  key={i}
                  ref={(el) => { lettersRef.current[i] = el; }}
                  className="inline-block select-none will-change-transform"
                  style={{
                    fontFamily:       "var(--font-passmark-signature), serif",
                    fontStyle:        "italic",
                    fontWeight:       400,
                    fontSize:         "clamp(100px, 16vw, 240px)",
                    lineHeight:       1.1,
                    letterSpacing:    "-0.01em",
                    width:            char === " " ? "clamp(30px, 5vw, 70px)" : undefined,
                    color:            isPass
                      ? `rgb(${GREEN_DIM.r},${GREEN_DIM.g},${GREEN_DIM.b})`
                      : `rgb(${GOLD_DIM.r},${GOLD_DIM.g},${GOLD_DIM.b})`,
                    opacity:          0.12,
                    transformOrigin:  "bottom center",
                    transform:        "scaleY(0.80)",
                    transition:       "none",
                    textShadow:       "none",
                    WebkitTextStroke: isPass
                      ? "1px rgba(26,122,74,0.18)"
                      : "1px rgba(245,166,35,0.18)",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}