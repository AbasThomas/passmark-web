"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import {
  ArrowRight01Icon as ArrowRight,
  CheckmarkCircle02Icon as Check,
} from "hugeicons-react";
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

export default function PricingPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        img.data[i + 3] = 25; // light grain
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
        ".pricing-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pricing-header",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".pricing-cards-container",
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const plans = [
    {
      name: "Basic",
      price: "Free",
      period: "",
      description: "Essential tools to start your journey.",
      features: [
        "Limited past questions",
        "Basic mock exams",
        "Community forum access",
      ],
      cta: "Start Free",
      href: "/signup",
      highlighted: false,
      color: "bg-[#F5EFEB]",
    },
    {
      name: "Pass Pro",
      price: "₦2,500",
      period: "/mo",
      badge: "MOST POPULAR",
      description: "Everything you need to guarantee admission.",
      features: [
        "Unlimited AI Explanations",
        "Full Past Question Bank",
        "Pass League Analytics",
        "Priority Support",
      ],
      cta: "Get Pro",
      href: "/signup",
      highlighted: true,
      color: "bg-[#006036]",
    },
    {
      name: "Pass Family",
      price: "₦30,000",
      period: "/yr",
      description: "Perfect for siblings and study groups.",
      features: [
        "Up to 5 accounts included",
        "All Pass Pro features",
        "Family progress dashboard",
        "Shared subscription billing",
      ],
      cta: "Get Family",
      href: "/signup",
      highlighted: false,
      color: "bg-[#FAF7F2]",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`${instrumentSerif.variable} relative overflow-hidden bg-white py-24 md:py-32`}
    >
      {/* Canvas grain texture overlay */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        style={{ opacity: 0.5, mixBlendMode: "multiply" }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="pricing-header text-center max-w-3xl mx-auto mb-20 space-y-6">
        
          <h2 className="pricing-display text-[clamp(40px,5vw,64px)] font-bold text-[#0B2317] leading-[1.05] tracking-tight">
            Invest in your <span className="italic font-normal">future</span>.
          </h2>
          <p className="text-lg text-[#0B2317]/70 leading-relaxed font-medium">
            Clear, upfront pricing. No hidden fees. Choose the plan that fits your study needs.
          </p>
        </div>

        <div className="pricing-cards-container grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`pricing-card relative flex flex-col p-8 md:p-10 rounded-2xl border ${
                plan.highlighted 
                  ? "border-[#0B2317] bg-[#0B2317] text-[#FAF7F2] shadow-[8px_8px_0px_0px_rgba(0,96,54,1)] md:-translate-y-4" 
                  : "border-[#0B2317]/20 bg-[#FAF7F2] text-[#0B2317] hover:border-[#0B2317] hover:shadow-[6px_6px_0px_0px_rgba(11,35,23,1)]"
              } transition-all duration-300 group`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-8 bg-[#006036] text-[#FAF7F2] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-[#0B2317]">
                  {plan.badge}
                </div>
              )}

              <div className="mb-8">
                <h3 className="pricing-display text-3xl font-normal tracking-tight mb-2">
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.highlighted ? "text-[#FAF7F2]/70" : "text-[#0B2317]/60"}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                  {plan.period && (
                    <span className={`text-sm font-bold uppercase tracking-wider ${plan.highlighted ? "text-[#FAF7F2]/60" : "text-[#0B2317]/50"}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`mt-1 shrink-0 flex items-center justify-center w-5 h-5 rounded-full ${
                        plan.highlighted ? "bg-[#006036]" : "bg-[#0B2317]/10"
                      }`}>
                        <Check size={12} className={plan.highlighted ? "text-white" : "text-[#0B2317]"} strokeWidth={3} />
                      </div>
                      <span className={`text-sm font-medium leading-tight pt-0.5 ${
                        plan.highlighted ? "text-[#FAF7F2]/90" : "text-[#0B2317]/80"
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={plan.href}
                className={`mt-10 block w-full py-4 text-center text-sm font-bold uppercase tracking-widest rounded-xl transition-all ${
                  plan.highlighted
                    ? "bg-[#006036] text-white hover:bg-[#1A7A4A] border border-[#006036] shadow-[0_0_20px_rgba(0,96,54,0.4)]"
                    : "bg-transparent border border-[#0B2317] text-[#0B2317] hover:bg-[#0B2317] hover:text-[#FAF7F2]"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#0B2317] hover:text-[#006036] transition-colors group"
          >
            Compare All Plans
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <style>{`
        .pricing-display {
          font-family: var(--font-instrument-serif), serif;
        }
      `}</style>
    </section>
  );
}
