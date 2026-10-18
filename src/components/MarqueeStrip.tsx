import { motion } from "motion/react";

const items = [
  "ZERO SUGAR",
  "ZERO CALORIES",
  "FULL FLAVOR",
  "140MG CAFFEINE",
  "B-VITAMINS",
  "ZERO COMPROMISE",
];

export default function MarqueeStrip() {
  const loop = [...items, ...items];

  return (
    <div
      style={{
        background: "var(--acid)",
        overflow: "hidden",
        padding: "16px 0",
        transform: "rotate(-1.2deg) scale(1.02)",
        position: "relative",
        zIndex: 3,
      }}
    >
      <motion.div
        style={{ display: "flex", gap: 48, whiteSpace: "nowrap", width: "max-content" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "Teko, sans-serif",
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: "0.06em",
              color: "#0a0a0a",
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            {item}
            <span style={{ fontSize: 16 }}>●</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
