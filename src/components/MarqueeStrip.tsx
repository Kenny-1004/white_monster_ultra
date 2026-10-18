import { motion } from "motion/react";

const items = ["Zero Calories", "Zero Sugar", "Light & Crisp", "Full Energy Blend", "B-Vitamins", "Zero Ultra"];

export default function MarqueeStrip() {
  const loop = [...items, ...items];

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #151517, #0b0b0c)",
        overflow: "hidden",
        padding: "20px 0",
        position: "relative",
        zIndex: 3,
        borderTop: "1px solid #2a2a2d",
        borderBottom: "1px solid #2a2a2d",
      }}
    >
      <motion.div
        style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className="serif"
            style={{
              fontWeight: 600,
              fontSize: 22,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#e7e8ea",
              display: "flex",
              alignItems: "center",
            }}
          >
            {item}
            <span style={{ color: "var(--ice)", margin: "0 34px", fontSize: 26, fontFamily: "Inter" }}>+</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
