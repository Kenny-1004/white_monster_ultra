import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import CanGraphic from "./CanGraphic";

export default function ProductShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const rotate = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const haloScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.85]);
  const haloOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.9, 0.4]);

  return (
    <section
      id="flavor"
      ref={ref}
      className="section-pad"
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #080808 0%, #0c0c0a 50%, #080808 100%)",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 720,
          height: 720,
          marginLeft: -360,
          marginTop: -360,
          scale: haloScale,
          opacity: haloOpacity,
          background: "radial-gradient(circle, rgba(182,255,60,0.22) 0%, rgba(182,255,60,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="wrap" style={{ textAlign: "center", marginBottom: 20, position: "relative", zIndex: 2 }}>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Crisp. Clean. Ultra.
        </motion.p>
        <motion.h2
          className="display"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: "clamp(36px, 6vw, 72px)", marginTop: 10 }}
        >
          One Can. Zero Hesitation.
        </motion.h2>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        <motion.div style={{ rotate, y, transformPerspective: 1200 }}>
          <CanGraphic className="showcase-can" />
        </motion.div>
      </div>

      <div
        className="wrap"
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 24,
          marginTop: -40,
        }}
      >
        {[
          { h: "Sharp Citrus Edge", p: "A crisp top note that cuts through the grind." },
          { h: "Clean Mid-Palate", p: "No syrupy aftertaste — built for repeat cans." },
          { h: "Smooth Finish", p: "Goes down easy, so the next rep goes down easier." },
        ].map((item, i) => (
          <motion.div
            key={item.h}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: "center", padding: "0 10px" }}
          >
            <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{item.h}</h4>
            <p style={{ fontSize: 14, color: "var(--ink-dim)", lineHeight: 1.6 }}>{item.p}</p>
          </motion.div>
        ))}
      </div>

      <style>{`
        .showcase-can { width: min(300px, 58vw); filter: drop-shadow(0 40px 70px rgba(0,0,0,0.65)); }
        @media (max-width: 760px) {
          #flavor .wrap:last-child { grid-template-columns: 1fr !important; gap: 36px !important; margin-top: 30px !important; }
        }
      `}</style>
    </section>
  );
}
