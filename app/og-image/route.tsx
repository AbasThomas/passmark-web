import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          color: "#F3FFF1",
          background:
            "linear-gradient(135deg, #061F13 0%, #0B3320 58%, #1A7A4A 100%)",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 5, textTransform: "uppercase", color: "#9BF6BA" }}>
          JAMB. WAEC. NECO.
        </div>
        <div style={{ marginTop: 28, fontSize: 92, fontWeight: 900, lineHeight: 0.95 }}>
          Hit Your Passmark
        </div>
        <div style={{ marginTop: 34, maxWidth: 860, fontSize: 34, lineHeight: 1.25, color: "#DDFBD2" }}>
          Past questions, CBT practice, AI explanations and offline study for Nigerian students.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
