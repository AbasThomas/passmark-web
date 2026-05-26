"use client";

import { useState, useEffect, useRef } from "react";
import { Languages, Mic, Sparkles } from "lucide-react";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const mockConversations = {
  osmosis: {
    question: "Explain Osmosis for WAEC biology.",
    english: "Osmosis is the movement of water molecules from a high water concentration to a low water concentration through a semi-permeable membrane. Think of it like a crowded bus balancing out.",
    pidgin: "Osmosis na when water dey move from where e plenty go where e small, through a membrane wey no go allow big molecules pass. Think am like how water dey sink inside dry sponge."
  },
  photosynthesis: {
    question: "Explain Photosynthesis in simple terms.",
    english: "Photosynthesis is the process where green plants use sunlight, carbon dioxide, and water to create their own food (glucose) and release oxygen.",
    pidgin: "Photosynthesis na when green plant dey use sunlight, water, and carbon dioxide cook food for body, and they go release clean breeze wey we dey breathe."
  },
  quadratic: {
    question: "How to solve x² - 5x + 6 = 0.",
    english: "Factor the equation into (x - 2)(x - 3) = 0. Therefore, the solutions are x = 2 and x = 3.",
    pidgin: "Splitting the equation, you get (x - 2)(x - 3) = 0. So your final answer for x na either 2 or 3."
  }
};

export default function PassAIShowcase() {
  const [topic, setTopic] = useState<"osmosis" | "photosynthesis" | "quadratic">("osmosis");
  const [language, setLanguage] = useState<"english" | "pidgin">("english");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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
        img.data[i + 3] = 30; // grain opacity
      }
      ctx.putImageData(img, 0, 0);
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  // Real-time typing simulator
  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);

    const fullText = mockConversations[topic][language];
    let index = 0;

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [topic, language]);

  return (
    <section
      className={`${instrumentSerif.variable} ai-serif relative overflow-hidden bg-[#082216] py-20 md:py-28 text-white`}
    >
      {/* Canvas grain texture overlay */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        style={{ opacity: 0.35, mixBlendMode: "overlay" }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-10">
        
        {/* Textbook open spread */}
        <div className="max-w-[1040px] mx-auto bg-[#FAF6F0] border-4 border-black rounded-3xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-4 divide-black text-[#0B2317] relative">
          
          {/* Vertical Bookmark Ribbon hanging down the center spine */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-4 h-36 bg-[#835500] rounded-b border-x border-b border-black/30 z-20"
          />

          {/* ── LEFT PAGE: Lessons Book ── */}
          <div className="p-8 md:p-10 flex flex-col justify-between space-y-8 relative z-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 border border-black/20 rounded px-2.5 py-1 text-[10px] font-bold text-[#0B2317] bg-[#E8F4E9] uppercase tracking-wider">
                <Sparkles size={10} className="text-[#006036]" />
                Pass AI Module
              </div>

              <h3 className="features-display font-serif text-[clamp(28px,3.2vw,40px)] font-normal text-[#0b2317] leading-tight">
                The AI tutor that <span className="italic text-[#006036]">speaks your language</span>.
              </h3>

              <p className="text-xs md:text-sm text-[#0B2317]/80 leading-relaxed font-medium">
                Type or speak to Pass AI. Get explanations for biology, physics, and mathematics with relatable Nigerian analogies.
              </p>

              {/* Selection list styled as student notebook tags */}
              <div className="space-y-2 pt-2">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#0B2317]/50 block">
                  Select Practice Topic:
                </span>
                <div className="flex flex-col gap-2">
                  {[
                    { id: "osmosis", label: "Biology: Osmosis", type: "Science" },
                    { id: "photosynthesis", label: "Biology: Photosynthesis", type: "Science" },
                    { id: "quadratic", label: "Math: Quadratic Equation", type: "Equations" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setTopic(item.id as any)}
                      className={`w-full text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                        topic === item.id
                          ? "bg-[#006036] text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5 font-semibold"
                          : "bg-[#F5EFEB] text-[#0B2317] border-[#0B2317]/10 hover:border-black/30 font-medium"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{item.label}</span>
                        <span className={`text-[8px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded ${
                          topic === item.id ? "bg-[#1A7A4A] text-white" : "bg-black/5 text-[#0B2317]/60"
                        }`}>
                          {item.type}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Language Selection */}
            <div className="pt-6 border-t border-[#0B2317]/10 space-y-2">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#0B2317]/50 block">
                Choose Explanation Format:
              </span>
              <div className="flex gap-2">
                {(["english", "pidgin"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      language === lang
                        ? "bg-[#835500] text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-[#F5EFEB] text-[#0B2317] border-[#0B2317]/10 hover:border-black/20"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <Languages size={12} />
                      {lang === "english" ? "English Mode" : "Pidgin Mode"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT PAGE: Interactive Exercise Sheet (notebook-grid background) ── */}
          <div className="p-8 md:p-10 bg-[#FDFBF7] notebook-grid flex flex-col justify-between min-h-[400px] relative z-10">
            <div className="space-y-4">
              
              {/* Question Entry */}
              <div className="border-b border-black/10 pb-4">
                <span className="text-[9px] font-bold text-[#835500] uppercase tracking-wider block mb-1">
                  Student Question
                </span>
                <p className="features-display font-serif italic text-lg text-[#0B2317] leading-snug">
                  "{mockConversations[topic].question}"
                </p>
              </div>

              {/* Explainer output */}
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-[#006036] uppercase tracking-wider block">
                  Pass AI Explanation
                </span>
                <div className="text-xs md:text-sm leading-relaxed text-[#0B2317] font-medium font-sans min-h-[140px] max-h-[180px] overflow-y-auto pr-1">
                  {displayedText}
                  {isTyping && (
                    <span className="inline-block w-1.5 h-3.5 bg-[#006036] ml-1 animate-pulse align-middle" />
                  )}
                </div>
              </div>
            </div>

            {/* Audio Wave and Input footer */}
            <div className="border-t border-black/10 pt-4 space-y-3">
              <div className="flex items-center justify-between text-[10px] text-[#0B2317]/60 font-semibold bg-[#F5EFEB] px-3 py-2 rounded-lg border border-[#0B2317]/10">
                <div className="flex items-center gap-2">
                  <Mic size={12} className="text-[#006036] animate-pulse" />
                  <span>Voice Explainer: 00:12</span>
                </div>
                <div className="flex gap-0.5 items-center">
                  {[2, 4, 3, 5, 2, 4, 3, 2, 4, 3].map((h, i) => (
                    <div
                      key={i}
                      className="w-0.5 bg-[#006036] rounded-full"
                      style={{
                        height: `${h * 1.8}px`,
                        opacity: isTyping ? 0.3 + (h / 8) : 0.4
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between bg-white border border-[#0B2317]/20 rounded-lg p-2 text-xs">
                <span className="text-[#0B2317]/40 font-medium">Ask tutor to explain further...</span>
                <div className="w-5.5 h-5.5 bg-[#006036] rounded flex items-center justify-center text-white text-[10px]">
                  ↵
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .ai-serif .ai-display,
        .ai-serif .ai-display * {
          font-family: var(--font-instrument-serif), serif;
          font-weight: 400;
        }
        .ai-serif .features-display,
        .ai-serif .features-display * {
          font-family: var(--font-instrument-serif), serif;
          font-weight: 400;
        }
        .notebook-grid {
          background-size: 24px 24px;
          background-image: 
            linear-gradient(to right, rgba(11, 35, 23, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(11, 35, 23, 0.035) 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
}
