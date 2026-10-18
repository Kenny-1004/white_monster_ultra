import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

const links = ["Product", "Ingredients", "Flavor", "Find It"];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 40);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: solid ? "rgba(8,8,8,0.82)" : "transparent",
        backdropFilter: solid ? "blur(14px)" : "none",
        borderBottom: solid ? "1px solid var(--line)" : "1px solid transparent",
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 76,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="26" height="26" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="12" fill="#0a0a0a" />
            <g fill="none" stroke="#b6ff3c" strokeWidth="7" strokeLinecap="round">
              <path d="M14 10 L24 54" />
              <path d="M27 8 L32 56" />
              <path d="M40 8 L36 56" />
              <path d="M53 10 L40 54" />
            </g>
          </svg>
          <span
            style={{
              fontFamily: "Teko, sans-serif",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            White Monster <span style={{ color: "var(--acid)" }}>Ultra</span>
          </span>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: 36 }} className="nav-links">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(" ", "-")}`}
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: "var(--ink-dim)",
                textTransform: "uppercase",
              }}
            >
              {l}
            </a>
          ))}
        </nav>

        <motion.a
          href="#find-it"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: "var(--acid)",
            color: "#0a0a0a",
            fontWeight: 800,
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "11px 22px",
            borderRadius: 999,
          }}
        >
          Shop Now
        </motion.a>
      </div>
      <style>{`
        header span, header a { white-space: nowrap; }
        @media (max-width: 760px) {
          .nav-links { display: none !important; }
        }
        @media (max-width: 420px) {
          header span { font-size: 18px !important; }
          header a { padding: 10px 16px !important; }
        }
      `}</style>
    </motion.header>
  );
}
