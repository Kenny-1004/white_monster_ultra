import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import CanGraphic from "./CanGraphic";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const canY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const canScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 20 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={ref}
      id="hero"
      onMouseMove={handleMove}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "radial-gradient(120% 90% at 50% 0%, #15150f 0%, #080808 55%, #050505 100%)",
      }}
    >
      {/* backdrop texture */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-10%",
          y: bgY,
          background:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 64px)",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          width: 900,
          height: 900,
          marginLeft: -450,
          y: glowY,
          background:
            "radial-gradient(circle, rgba(182,255,60,0.16) 0%, rgba(182,255,60,0) 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="wrap"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          alignItems: "center",
          gap: 24,
          position: "relative",
          zIndex: 2,
          paddingTop: 96,
        }}
      >
        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            100% Zero Sugar
          </motion.p>

          <h1
            className="display"
            style={{ fontSize: "clamp(56px, 9vw, 112px)", color: "var(--ink)", marginTop: 14 }}
          >
            {["ALL THE ENERGY.", "NONE OF THE", "SUGAR."].map((line, i) => (
              <motion.span
                key={line}
                style={{ display: "block", overflow: "hidden" }}
              >
                <motion.span
                  style={{ display: "block" }}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    delay: 0.25 + i * 0.1,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line === "SUGAR." ? (
                    <>
                      <span style={{ color: "var(--acid)" }}>SUGAR</span>.
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginTop: 26,
              maxWidth: 420,
              fontSize: 17,
              lineHeight: 1.7,
              color: "var(--ink-dim)",
            }}
          >
            White Monster Ultra delivers the full Monster bite in a lighter,
            crisper can — zero sugar, full flavor, engineered for the days
            that don't let up.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: 40, display: "flex", gap: 16, alignItems: "center" }}
          >
            <motion.a
              href="#find-it"
              whileHover={{ scale: 1.04, backgroundColor: "#c8ff5e" }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "var(--acid)",
                color: "#0a0a0a",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "17px 34px",
                borderRadius: 999,
              }}
            >
              Find Your Can
            </motion.a>
            <a
              href="#ingredients"
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "var(--ink)",
                borderBottom: "1px solid var(--line)",
                paddingBottom: 6,
              }}
            >
              See Nutrition ↓
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{
            y: canY,
            scale: canScale,
            rotateX: rotX,
            rotateY: rotY,
            transformPerspective: 900,
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
          initial={{ opacity: 0, y: 60, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 0.3, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <CanGraphic className="hero-can" />
        </motion.div>
      </div>

      <motion.div
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--ink-faint)" }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          style={{ width: 1, height: 28, background: "var(--ink-faint)" }}
        />
      </motion.div>

      <style>{`
        .hero-can { width: min(360px, 78vw); filter: drop-shadow(0 30px 60px rgba(0,0,0,0.6)); }
        @media (max-width: 900px) {
          #hero .wrap { grid-template-columns: 1fr !important; text-align: center; }
          #hero .wrap > div:first-child { order: 2; margin-top: 40px; }
          #hero .wrap > div:first-child > div:last-child { justify-content: center; }
          #hero .wrap p { margin-left: auto; margin-right: auto; }
          .scroll-cue { display: none !important; }
          #hero { padding-bottom: 60px; }
        }
      `}</style>
    </section>
  );
}
