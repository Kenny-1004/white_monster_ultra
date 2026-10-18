import { animate, motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const facts = [
  { label: "Calories", value: "10" },
  { label: "Total Sugars", value: "0g" },
  { label: "Total Carbohydrate", value: "3g" },
  { label: "Sodium", value: "170mg" },
  { label: "Caffeine", value: "140mg" },
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
      duration: 1.6,
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const zeroY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const zeroScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.15]);

  return (
    <section ref={ref} className="section-pad" style={{ overflow: "hidden" }}>
      <div
        className="wrap nutrition-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative" }}>
          <motion.div
            className="display"
            style={{
              y: zeroY,
              scale: zeroScale,
              fontSize: "clamp(220px, 32vw, 420px)",
              lineHeight: 0.8,
              color: "transparent",
              WebkitTextStroke: "2px rgba(182,255,60,0.85)",
              userSelect: "none",
            }}
          >
            0g
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 18, color: "var(--ink-dim)", maxWidth: 380, lineHeight: 1.7, marginTop: 24 }}
          >
            Not low sugar. Not less sugar. <strong style={{ color: "var(--ink)" }}>Zero.</strong> The
            number that matters most is the one that isn't there.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "var(--chrome-1)",
            color: "#0a0a0a",
            borderRadius: 20,
            padding: "36px 34px",
            boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
          }}
        >
          <div className="display" style={{ fontSize: 40 }}>Nutrition Facts</div>
          <div style={{ fontSize: 13, color: "#555", marginTop: 2 }}>Serving size 1 can (16 fl oz / 473 mL)</div>
          <div style={{ height: 10, background: "#0a0a0a", margin: "16px 0 10px" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 10, borderBottom: "4px solid #0a0a0a" }}>
            <span style={{ fontWeight: 800, fontSize: 22 }}>Calories</span>
            <span className="display" style={{ fontSize: 52 }}>
              <Counter to={10} />
            </span>
          </div>

          {facts.slice(1).map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "11px 0",
                borderBottom: "1px solid #d6d6d6",
                fontSize: 15,
                fontWeight: f.label === "Total Sugars" ? 800 : 500,
                color: f.label === "Total Sugars" ? "#0a0a0a" : "#333",
              }}
            >
              <span>{f.label}</span>
              <span>
                {f.label === "Total Sugars" ? (
                  <span style={{ background: "var(--acid)", padding: "2px 8px", borderRadius: 4 }}>0g</span>
                ) : (
                  f.value
                )}
              </span>
            </motion.div>
          ))}
          <p style={{ fontSize: 11, color: "#777", marginTop: 14, lineHeight: 1.5 }}>
            Values shown are illustrative for this concept page. Refer to the can for official nutrition information.
          </p>
        </motion.div>
      </div>

      <div className="wrap" style={{ marginTop: 100 }}>
        <div
          className="stat-row"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          {[
            { n: 0, s: "g", l: "Sugar per can" },
            { n: 140, s: "mg", l: "Caffeine boost" },
            { n: 473, s: "ml", l: "Of pure Ultra" },
          ].map((s, i) => (
            <div
              key={s.l}
              style={{
                padding: "40px 20px",
                textAlign: "center",
                borderLeft: i ? "1px solid var(--line)" : "none",
              }}
            >
              <div className="display" style={{ fontSize: 64, color: "var(--ink)" }}>
                <Counter to={s.n} suffix={s.s} />
              </div>
              <div style={{ fontSize: 12, letterSpacing: "0.16em", color: "var(--ink-faint)", textTransform: "uppercase" }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .nutrition-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .stat-row { grid-template-columns: 1fr !important; }
          .stat-row > div { border-left: none !important; border-top: 1px solid var(--line); }
          .stat-row > div:first-child { border-top: none; }
        }
      `}</style>
    </section>
  );
}
