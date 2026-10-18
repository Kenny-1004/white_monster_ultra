import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import CanImage from "./CanImage";
import Filigree from "./Filigree";

const notes = [
  { h: "Crisp Citrus", p: "A bright, clean top note that cuts right through the grind." },
  { h: "Light Body", p: "No syrupy weight, so every sip stays refreshing." },
  { h: "Smooth Finish", p: "Goes down easy, can after can." },
];

export default function ProductShowcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const rotate = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const ringScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.05, 0.9]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const filiL = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const filiR = useTransform(scrollYProgress, [0, 1], [-100, 160]);

  const ring = "ZERO CALORIES + ZERO SUGAR + ZERO CALORIES + ZERO SUGAR + ";

  return (
    <section
      id="flavor"
      ref={ref}
      className="section-pad"
      style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, var(--bg) 0%, #ffffff 50%, var(--bg) 100%)" }}
    >
      <motion.div style={{ position: "absolute", left: "-6%", top: "16%", width: 480, y: filiL, opacity: 0.6 }}>
        <Filigree />
      </motion.div>
      <motion.div style={{ position: "absolute", right: "-6%", top: "30%", width: 480, y: filiR, opacity: 0.6 }}>
        <Filigree flip />
      </motion.div>

      <div className="wrap" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          The Taste
        </motion.p>
        <motion.h2
          className="display"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: "clamp(34px, 5.6vw, 68px)", marginTop: 16 }}
        >
          Light. Crisp. <span className="chrome-text">Ultra.</span>
        </motion.h2>
      </div>

      <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "center", padding: "50px 0 30px" }}>
        {/* engraved ring echoing the can's top band */}
        <motion.svg
          viewBox="0 0 500 500"
          className="showcase-ring"
          style={{ position: "absolute", top: "50%", left: "50%", x: "-50%", y: "-50%", scale: ringScale, rotate: ringRotate }}
          aria-hidden
        >
          <defs>
            <path id="ringPath" d="M250,250 m-210,0 a210,210 0 1,1 420,0 a210,210 0 1,1 -420,0" />
          </defs>
          <circle cx="250" cy="250" r="235" fill="none" stroke="var(--silver-2)" strokeWidth="1" />
          <circle cx="250" cy="250" r="185" fill="none" stroke="var(--silver-2)" strokeWidth="1" />
          <text fontFamily="Cinzel, serif" fontSize="22" fontWeight="600" letterSpacing="7" fill="var(--silver-3)">
            <textPath href="#ringPath">{ring}</textPath>
          </text>
        </motion.svg>

        <motion.div style={{ rotate, y, position: "relative" }}>
          <CanImage className="showcase-can" />
        </motion.div>
      </div>

      <div className="wrap notes-grid" style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 40 }}>
        {notes.map((item, i) => (
          <motion.div
            key={item.h}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: "center", padding: "0 10px" }}
          >
            <div className="serif" style={{ fontSize: 12, color: "var(--ice-ink)", letterSpacing: "0.3em", marginBottom: 10 }}>0{i + 1}</div>
            <h4 className="display" style={{ fontSize: 20, marginBottom: 10 }}>{item.h}</h4>
            <p style={{ fontSize: 14, color: "var(--ink-dim)", lineHeight: 1.6 }}>{item.p}</p>
          </motion.div>
        ))}
      </div>

      <style>{`
        .showcase-can { width: auto; height: min(62vh, 560px); }
        .showcase-ring { width: min(620px, 120vw); height: auto; }
        @media (max-width: 760px) {
          .notes-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .showcase-can { height: 46vh; }
        }
      `}</style>
    </section>
  );
}
