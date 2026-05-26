                                                                  "use client";

                                                                  import { useEffect, useRef } from "react";
                                                                  import { Instrument_Serif } from "next/font/google";
                                                                  import { gsap } from "gsap";

                                                                  const instrumentSerif = Instrument_Serif({
                                                                    weight: "400",
                                                                    style: ["normal", "italic"],
                                                                    subsets: ["latin"],
                                                                    display: "swap",
                                                                    variable: "--font-instrument-serif",
                                                                  });

                                                                  function SplitText({ text, className }: { text: string; className?: string }) {
                                                                    return (
                                                                      <span className={className}>
                                                                        {text.split("").map((char, i) => (
                                                                          <span
                                                                            key={i}
                                                                            className="hero-letter inline-block"
                                                                            style={{ display: char === " " ? "inline" : "inline-block" }}
                                                                          >
                                                                            {char === " " ? "\u00A0" : char}
                                                                          </span>
                                                                        ))}
                                                                      </span>
                                                                    );
                                                                  }

                                                                  export default function HeroSection() {
                                                                    const sectionRef = useRef<HTMLElement>(null);
                                                                    const canvasRef = useRef<HTMLCanvasElement>(null);

                                                                    useEffect(() => {
                                                                      const canvas = canvasRef.current;
                                                                      if (!canvas) return;

                                                                      const ctx = canvas.getContext("2d");
                                                                      if (!ctx) return;

                                                                      const draw = () => {
                                                                        canvas.width = window.innerWidth;
                                                                        canvas.height = window.innerHeight;

                                                                        const img = ctx.createImageData(canvas.width, canvas.height);
                                                                        for (let i = 0; i < img.data.length; i += 4) {
                                                                          const v = Math.random() * 255;
                                                                          img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
                                                                          img.data[i + 3] = 40; // opacity
                                                                        }
                                                                        ctx.putImageData(img, 0, 0);
                                                                      };

                                                                      draw();

                                                                      window.addEventListener("resize", draw);
                                                                      return () => window.removeEventListener("resize", draw);
                                                                    }, []);

                                                                    useEffect(() => {
                                                                      const prefersReducedMotion = window.matchMedia(
                                                                        "(prefers-reduced-motion: reduce)"
                                                                      ).matches;

                                                                      const ctx = gsap.context(() => {
                                                                        if (!prefersReducedMotion) {
                                                                          gsap.fromTo(
                                                                            ".hero-letter",
                                                                            { opacity: 0, y: -48, rotateX: -90 },
                                                                            {
                                                                              opacity: 1,
                                                                              y: 0,
                                                                              rotateX: 0,
                                                                              duration: 0.55,
                                                                              stagger: 0.028,
                                                                              ease: "power3.out",
                                                                            }
                                                                          );
                                                                        } else {
                                                                          gsap.set(".hero-letter", { opacity: 1, y: 0, x: 0, scale: 1 });
                                                                        }
                                                                      }, sectionRef);

                                                                      return () => ctx.revert();
                                                                    }, []);

                                                                    return (
                                                                      <section
                                                                        ref={sectionRef}
                                                                        className={`${instrumentSerif.variable} relative min-h-screen overflow-hidden flex items-center justify-center`}
                                                                        style={{ background: "#061206" }}
                                                                      >
                                                                        {/* Layer 1: radial glow */}
                                                                        <div
                                                                          aria-hidden="true"
                                                                          className="absolute inset-0 z-0 pointer-events-none"
                                                                          style={{
                                                                            background:
                                                                              "radial-gradient(ellipse at 30% 50%, rgba(0,200,80,0.18) 0%, transparent 65%)",
                                                                          }}
                                                                        />

                                                                        {/* Layer 2: canvas grain */}
                                                                        <canvas
                                                                          ref={canvasRef}
                                                                          aria-hidden="true"
                                                                          className="absolute inset-0 z-0 pointer-events-none"
                                                                          style={{
                                                                            // mixBlendMode: "overlay",
                                                                            opacity: 0.4,
                                                                          }}
                                                                        />

                                                                        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-10 flex flex-col items-center justify-center text-center min-h-screen">
                                                                          <div className="w-full">
                                                                            <h1 className="hero-title space-y-1 leading-none text-center font-normal">
                                                                              <div className="text-[clamp(40px,6vw,72px)] leading-[1.05] text-[150px] tracking-tight text-white">
                                                                                <SplitText text="Hit Your" />                         
                                                                              </div>
                                                                              <div className="text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-tight">
                                                                                <SplitText className="italic text-[#F5A623] text-[150px]" text="Passmark." />
                                                                              </div>
                                                                            </h1>
                                                                          </div>
                                                                        </div>

                                                                        <style>{`
                                                                          .hero-title,
                                                                          .hero-title * {
                                                                            font-family: var(--font-instrument-serif), serif;
                                                                            font-weight: 400;
                                                                          }
                                                                        `}</style>
                                                                      </section>
                                                                    );
                                                                  }