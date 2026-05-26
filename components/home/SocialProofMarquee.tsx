import MarqueeStrip from "@/components/MarqueeStrip";

export default function SocialProofMarquee() {
  const items = [
    "WAEC 2026",
    "JAMB Ready",
    "Pass AI in Pidgin",
    "Offline Mode",
    "Pass League",
    "100K+ Students",
    "1978–2026 Questions",
    "CBT Simulation",
    "No Data Needed",
  ];

  return (
    <MarqueeStrip
      items={items}
      direction="left"
      speed={28}
      bgColor="#1A7A4A"
      textColor="#ffffff"
      pauseOnHover={false}
    />
  );
}
