import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import CanGraphic from "./CanGraphic";

export default function CallToAction() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const textX1 = useTransform(scrollYProgress, [0, 1], ["5%", "-25%"]);
  const textX2 = useTransform(scrollYProgress, [0, 1], ["-25%", "5%"]);
  const canLeftY = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const canRightY = useTransform(scrollYProgress, [0, 1], [220, -220]);

  return (
    <section
      id="find-it"
      ref={ref}
      style={{
        position: "relative",
        padding: "160px 0",
        overflow: "hidden",
        background: "#050505",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10, pointerEvents: "none" }}>
        <motion.div className="display" style={{ x: textX1, fontSize: "18vw", whiteSpace: "nowrap", color: "rgba(255,255,255,0.035)" }}>
          ZERO SUGAR ZERO SUGAR
        </motion.div>
        <motion.div className="display" style={{ x: textX2, fontSize: "18vw", whiteSpace: "nowrap", color: "transparent", WebkitTextStroke: "1px rgba(182,255,60,0.12)" }}>
          ULTRA WHITE ULTRA WHITE
        </motion.div>
      </div>

      <motion.div className="cta-can cta-can-left" style={{ y: canLeftY, rotate: -18 }}>
        <CanGraphic />
      </motion.div>
      <motion.div className="cta-can cta-can-right" style={{ y: canRightY, rotate: 14 }}>
        <CanGraphic />
      </motion.div>

      <div className="wrap" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Available Everywhere
        </motion.p>
        <motion.h2
          className="display"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: "clamp(52px, 9vw, 120px)", marginTop: 14 }}
        >
          Unleash <span style={{ color: "var(--acid)" }}>Ultra</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ color: "var(--ink-dim)", fontSize: 17, maxWidth: 460, margin: "22px auto 0", lineHeight: 1.7 }}
        >
          Grab a cold one at your nearest store, or stock the fridge with a 12-pack delivered to your door.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ marginTop: 40, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{ background: "var(--acid)", color: "#0a0a0a", fontWeight: 800, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", padding: "18px 36px", borderRadius: 999 }}
          >
            Shop 12-Pack
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.5)" }}
            whileTap={{ scale: 0.97 }}
            style={{ border: "1px solid rgba(255,255,255,0.2)", color: "var(--ink)", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", padding: "18px 36px", borderRadius: 999 }}
          >
            Store Locator
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        .cta-can { position: absolute; top: 18%; width: 200px; opacity: 0.9; z-index: 1; pointer-events: none; }
        .cta-can-left { left: 4%; }
        .cta-can-right { right: 4%; top: 28%; }
        @media (max-width: 900px) { .cta-can { width: 120px; opacity: 0.35; } }
      `}</style>
    </section>
  );
}
