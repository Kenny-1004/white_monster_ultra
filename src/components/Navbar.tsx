import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

const links = [
  { label: "Product", href: "#product" },
  { label: "Nutrition", href: "#nutrition" },
  { label: "Flavor", href: "#flavor" },
  { label: "Find It", href: "#find-it" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 40));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="site-header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: solid ? "rgba(250,250,248,0.78)" : "transparent",
        backdropFilter: solid ? "blur(16px) saturate(1.4)" : "none",
        WebkitBackdropFilter: solid ? "blur(16px) saturate(1.4)" : "none",
        borderBottom: solid ? "1px solid var(--line)" : "1px solid transparent",
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}
    >
      <div
        className="wrap"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 76 }}
      >
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/claw.svg" alt="" width={28} height={28} style={{ borderRadius: 7, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }} />
          <span className="display brand" style={{ fontSize: 15, letterSpacing: "0.02em" }}>
            <span className="brand-long">White </span>Monster <span className="chrome-text">Ultra</span>
          </span>
        </a>

        <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {links.map((l) => (
            <a key={l.label} href={l.href} className="nav-link serif">
              {l.label}
            </a>
          ))}
        </nav>

        <motion.a
          href="#find-it"
          className="btn btn-dark nav-cta"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{ padding: "11px 22px", fontSize: 11 }}
        >
          Shop Now
        </motion.a>
      </div>
      <style>{`
        .site-header .brand { white-space: nowrap; }
        .nav-link {
          font-size: 13px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ink-dim); position: relative; transition: color .3s;
        }
        .nav-link::after {
          content: ""; position: absolute; left: 0; right: 0; bottom: -6px; height: 1px;
          background: var(--ink); transform: scaleX(0); transform-origin: right; transition: transform .4s cubic-bezier(.16,1,.3,1);
        }
        .nav-link:hover { color: var(--ink); }
        .nav-link:hover::after { transform: scaleX(1); transform-origin: left; }
        @media (max-width: 800px) { .nav-links { display: none !important; } }
        @media (max-width: 720px) { .site-header .brand { font-size: 12px !important; } .nav-cta { padding: 10px 16px !important; } }
        @media (max-width: 380px) { .site-header .brand .brand-long { display: none; } }
      `}</style>
    </motion.header>
  );
}
