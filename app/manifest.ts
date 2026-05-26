import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Passmark - JAMB, WAEC & NECO Exam Prep",
    short_name: "Passmark",
    description:
      "Nigeria's smartest exam prep app for JAMB past questions, WAEC past questions, NECO practice, CBT mocks and AI tutoring.",
    start_url: "/",
    display: "standalone",
    background_color: "#061F13",
    theme_color: "#006036",
    categories: ["education", "productivity"],
    lang: "en-NG",
  };
}
