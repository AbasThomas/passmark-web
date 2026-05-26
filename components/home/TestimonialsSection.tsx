"use client";

import { useEffect, useRef } from "react";
import { Instrument_Serif } from "next/font/google";
import { Star, MessageSquare } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    quote: "Pass AI explained photosynthesis in Pidgin and I finally understood it. Got A1 in Biology.",
    author: "Chidera O.",
    location: "Lagos",
    exam: "WAEC 2025",
    color: "bg-[#F5EFEB]",
    rotation: "-2deg",
  },
  {
    quote: "I went from 180 to 267 in JAMB using Passmark daily drills. The mock exams are exactly like the real thing.",
    author: "Abdullahi M.",
    location: "Kano",
    exam: "JAMB 2025",
    color: "bg-white",
    rotation: "1deg",
  },
  {
    quote: "The offline mode saved me. No data in my area but I passed NECO. Best app for students.",
    author: "Blessing A.",
    location: "Enugu",
    exam: "NECO 2025",
    color: "bg-[#F5EFEB]",
    rotation: "2deg",
  },
  {
    quote: "My daughter went from F9 to C6 in Maths in 6 weeks. I track her progress from the parent dashboard.",
    author: "Mrs. Okonkwo",
    location: "Lagos",
    exam: "Parent",
    color: "bg-white",
    rotation: "-1deg",
  },
  {
    quote: "The mock exam is exactly like the real JAMB. No surprises on exam day. I was so prepared.",
    author: "Tunde A.",
    location: "Lagos",
    exam: "UNILAG Aspirant",
    color: "bg-[#F5EFEB]",
    rotation: "1.5deg",
  },
  {
    quote: "I'm currently #3 in Lagos State on the leaderboard. This app is serious — it keeps me motivated.",
    author: "Kazeem O.",
    location: "Ogun",
    exam: "OAU Aspirant",
    color: "bg-white",
    rotation: "-1.5deg",
  },
];

function StarRow() {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className="text-[#0B2317] fill-[#0B2317]"
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Background grain texture
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const img = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 35; // grain opacity
      }
      ctx.putImageData(img, 0, 0);
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".testimonials-grid",
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${instrumentSerif.variable} relative overflow-hidden bg-[#F5A623] py-24 md:py-32`}
    >
      {/* Canvas grain texture overlay */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        style={{ opacity: 0.45, mixBlendMode: "multiply" }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Header Block */}
        <div className="text-center space-y-6 mb-20 max-w-3xl mx-auto">
      
          <h2 className="testim-display text-[clamp(40px,5vw,64px)] font-bold text-[#0B2317] leading-[1.05] tracking-tight">
            They hit their Passmark. <span className="italic font-normal">You're next.</span>
          </h2>
          <p className="text-lg text-[#0B2317]/80 leading-relaxed font-medium">
            Real stories from Nigerian students who transformed their grades and secured their university admissions using our platform.
          </p>
        </div>


        {/* Masonry / Grid layout for testimonials like sticky notes/cards */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`testimonial-card flex flex-col justify-between ${t.color} border border-[#0B2317] p-8 shadow-[6px_6px_0px_0px_rgba(11,35,23,1)] transition-transform hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_rgba(11,35,23,1)]`}
              style={{ transform: `rotate(${t.rotation})` }}
            >
              <div className="space-y-6">
                <StarRow />
                <h3 className="testim-display text-2xl font-normal text-[#0B2317] leading-snug tracking-tight">
                  "{t.quote}"
                </h3>
              </div>
              <div className="mt-8 pt-6 border-t border-[#0B2317]/20 flex items-end justify-between">
                <div>
                  <p className="text-sm font-bold text-[#0B2317] uppercase tracking-wide">
                    {t.author}
                  </p>
                  <p className="text-xs font-bold text-[#0B2317]/60 mt-1 uppercase tracking-wider">
                    {t.location} · {t.exam}
                  </p>
                </div>
                <div className="bg-[#0B2317] text-[#FAF7F2] text-[9px] font-bold uppercase tracking-widest px-2 py-1">
                  Verified
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testim-display {
          font-family: var(--font-instrument-serif), serif;
        }
      `}</style>
    </section>
  );
}