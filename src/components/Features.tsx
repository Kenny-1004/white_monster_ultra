import { motion, type Variants } from "motion/react";

const features = [
  {
    title: "Zero Sugar",
    copy: "Full Monster flavor, re-engineered with zero sugar and zero compromise on taste.",
    stat: "0g",
    label: "SUGAR",
  },
  {
    title: "Dialed Caffeine",
    copy: "140mg of caffeine calibrated for sustained focus — no crash, no jitters.",
    stat: "140",
    label: "MG CAFFEINE",
  },
  {
    title: "Light Body",
    copy: "A crisper, lighter profile than the original — built for everyday intensity.",
    stat: "10",
    label: "CALORIES",
  },
  {
    title: "B-Vitamin Complex",
    copy: "A full spectrum of B-Vitamins to support energy metabolism, all day.",
    stat: "100%",
    label: "DAILY B-VITAMINS",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Features() {
  return (
    <section id="ingredients" className="section-pad">
      <div className="wrap">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center" }}
        >
          Why Zero Sugar Hits Different
        </motion.p>
        <motion.h2
          className="display"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(36px, 5.6vw, 64px)",
            textAlign: "center",
            marginTop: 10,
            maxWidth: 780,
            marginInline: "auto",
          }}
        >
          Engineered to keep up, not weigh you down.
        </motion.h2>

        <div
          style={{
            marginTop: 72,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 22,
          }}
          className="feature-grid"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -8, borderColor: "rgba(182,255,60,0.4)" }}
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--line)",
                borderRadius: 18,
                padding: "32px 26px",
                transition: "border-color 0.3s ease",
              }}
            >
              <div
                className="display"
                style={{
                  fontSize: 44,
                  color: "var(--acid)",
                  lineHeight: 1,
                }}
              >
                {f.stat}
              </div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-faint)",
                  marginTop: 4,
                  marginBottom: 20,
                }}
              >
                {f.label}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--ink-dim)" }}>{f.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .feature-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .feature-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
