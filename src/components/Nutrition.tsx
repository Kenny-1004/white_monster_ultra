import { animate, motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const facts = [
  { label: "Total Sugars", value: "0g", highlight: true },
  { label: "Total Carbohydrate", value: "3g" },
  { label: "Sodium", value: "190mg" },
  { label: "Caffeine", value: "150mg" },
  { label: "Niacin (B3)", value: "100% DV" },
  { label: "Vitamin B6", value: "100% DV" },
  { label: "Vitamin B12", value: "100% DV" },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export default function Nutrition() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const zeroY = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const zeroScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.12]);
  const panelY = useTransform(scrollYProgress, [0, 1], [60, -40]);

  return (
    <section id="nutrition" ref={ref} className="section-pad" style={{ overflow: "hidden", background: "var(--bg-sunk)" }}>
      <div className="wrap nutrition-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <motion.p className="eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            The Number That Matters
          </motion.p>
          <motion.div
            className="display"
            aria-label="Zero grams of sugar"
            style={{
              y: zeroY,
              scale: zeroScale,
              fontSize: "clamp(200px, 30vw, 400px)",
              lineHeight: 0.85,
              color: "transparent",
              WebkitTextStroke: "2px var(--silver-3)",
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(214,216,218,0.4))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              userSelect: "none",
              transformOrigin: "left center",
            }}
          >
            0g
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 18, color: "var(--ink-dim)", maxWidth: 400, lineHeight: 1.7, marginTop: 24 }}
          >
            Not low sugar. Not less sugar. <strong style={{ color: "var(--ink)" }}>Zero.</strong> The
            best number on the can is the one that isn't there.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: panelY }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 22,
              padding: "38px 36px",
              boxShadow: "0 40px 80px -30px rgba(13,13,13,0.3), inset 0 0 0 1px rgba(13,13,13,0.06)",
            }}
          >
            <div className="display" style={{ fontSize: 34 }}>Nutrition Facts</div>
            <div style={{ fontSize: 13, color: "var(--ink-faint)", marginTop: 6 }}>Serving size 1 can (16 fl oz / 473 mL)</div>
            <div style={{ height: 8, background: "var(--ink)", margin: "18px 0 10px" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 10, borderBottom: "4px solid var(--ink)" }}>
              <span style={{ fontWeight: 800, fontSize: 20 }}>Calories</span>
              <span className="display" style={{ fontSize: 50 }}>
                <Counter to={10} />
              </span>
            </div>

            {facts.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--line)",
                  fontSize: 15,
                  fontWeight: f.highlight ? 800 : 500,
                  color: f.highlight ? "var(--ink)" : "var(--ink-dim)",
                }}
              >
                <span>{f.label}</span>
                {f.highlight ? (
                  <span style={{ background: "var(--ink)", color: "#fff", padding: "2px 10px", borderRadius: 999, fontSize: 13 }}>0g</span>
                ) : (
                  <span>{f.value}</span>
                )}
              </motion.div>
            ))}
            <p style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 16, lineHeight: 1.5 }}>
              Values are approximate for this concept page. Always check the can for official nutrition information.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="wrap" style={{ marginTop: 110 }}>
        <div className="stat-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          {[
            { n: 0, s: "g", l: "Sugar per can" },
            { n: 150, s: "mg", l: "Caffeine" },
            { n: 473, s: "ml", l: "Of pure Ultra" },
          ].map((s, i) => (
            <div key={s.l} style={{ padding: "44px 20px", textAlign: "center", borderLeft: i ? "1px solid var(--line)" : "none" }}>
              <div className="display chrome-text" style={{ fontSize: 60 }}>
                <Counter to={s.n} suffix={s.s} />
              </div>
              <div className="serif" style={{ fontSize: 12, letterSpacing: "0.24em", color: "var(--ink-faint)", textTransform: "uppercase", marginTop: 8 }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .nutrition-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
        @media (max-width: 600px) {
          .stat-row { grid-template-columns: 1fr !important; }
          .stat-row > div { border-left: none !important; border-top: 1px solid var(--line); }
          .stat-row > div:first-child { border-top: none; }
        }
      `}</style>
    </section>
  );
}
