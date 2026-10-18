import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import CanImage from "./CanImage";
import Filigree from "./Filigree";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const canY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const canScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const filiFarY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const filiNearY = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const filiRot = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 110, damping: 18 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 110, damping: 18 });
  const sheenX = useSpring(useTransform(mx, [-0.5, 0.5], ["-30%", "30%"]), { stiffness: 80, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
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
        background: "radial-gradient(90% 80% at 68% 45%, #ffffff 0%, #f4f4f2 55%, #e6e6e3 100%)",
      }}
    >
      {/* far filigree layer */}
      <motion.div style={{ position: "absolute", top: "-6%", left: "-8%", width: 520, y: filiFarY, opacity: 0.55 }}>
        <Filigree />
      </motion.div>
      <motion.div style={{ position: "absolute", bottom: "-18%", right: "-6%", width: 560, y: filiFarY, opacity: 0.45 }}>
        <Filigree flip />
      </motion.div>

      {/* ghost wordmark */}
      <motion.div
        aria-hidden
        className="display hero-ghost"
        style={{
          position: "absolute",
          right: "-2%",
          top: "50%",
          marginTop: "-14vw",
          y: ghostY,
          fontSize: "28vw",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(13,13,13,0.06)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        Ultra
      </motion.div>

      <div
        className="wrap hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          alignItems: "center",
          gap: 24,
          position: "relative",
          zIndex: 2,
          paddingTop: 96,
        }}
      >
        <motion.div style={{ y: textY, opacity: fade }} className="hero-copy">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease }}
          >
            Zero Calories <span style={{ color: "var(--ice)" }}>+</span> Zero Sugar
          </motion.p>

                <h1 className="display" style={{ fontSize: "clamp(46px, 7.4vw, 104px)", marginTop: 18 }}>
            {["All the", "energy.", "Zero", "sugar."].map((line, i) => (
              <span key={line} style={{ display: "block", overflow: "hidden", paddingBottom: "0.04em" }}>
                <motion.span
                  className={i >= 2 ? "chrome-text" : undefined}
                  style={{ display: "block" }}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.25 + i * 0.09, duration: 1, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>


          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease }}
            style={{ marginTop: 28, maxWidth: 420, fontSize: 17, lineHeight: 1.7, color: "var(--ink-dim)" }}
          >
            Monster Energy Zero Ultra. Light, crisp and refreshing, with the
            full Monster energy blend and nothing that weighs you down.
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease }}
            style={{ marginTop: 40, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}
          >
            <motion.a href="#find-it" className="btn btn-dark" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              Find Your Can
            </motion.a>
            <motion.a href="#nutrition" className="btn btn-ghost" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              Nutrition
            </motion.a>
          </motion.div>
        </motion.div>

        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          {/* near filigree layer, behind the can */}
          <motion.div
            style={{ position: "absolute", width: "135%", top: "-4%", left: "-18%", y: filiNearY, rotate: filiRot, opacity: 0.8, zIndex: 0 }}
          >
            <Filigree />
          </motion.div>

          <motion.div
            style={{
              y: canY,
              scale: canScale,
              rotateX: rotX,
              rotateY: rotY,
              transformPerspective: 1000,
              position: "relative",
              zIndex: 1,
            }}
            initial={{ opacity: 0, y: 80, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.3, duration: 1.2, ease }}
          >
            <div style={{ position: "relative" }}>
              <CanImage eager className="hero-can" />
              {/* moving specular sheen, masked to the can */}
              <motion.div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  x: sheenX,
                  background: "linear-gradient(100deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%)",
                  WebkitMaskImage: "url(/white-monster-ultra.png)",
                  maskImage: "url(/white-monster-ultra.png)",
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                  mixBlendMode: "soft-light",
                  pointerEvents: "none",
                }}
              />
            </div>
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: "10%",
                right: "10%",
                bottom: -18,
                height: 36,
                background: "radial-gradient(closest-side, rgba(0,0,0,0.22), transparent)",
                filter: "blur(4px)",
              }}
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 34,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 2,
        }}
      >
        <span className="serif" style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--ink-faint)" }}>SCROLL</span>
        <motion.div
          animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{ width: 1, height: 32, background: "var(--ink-faint)" }}
        />
      </motion.div>

      <style>{`
        .hero-can { width: auto; height: min(72vh, 640px); max-height: 640px; }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; padding-top: 110px !important; }
          .hero-copy { order: 2; margin-top: 36px; }
          .hero-copy p { margin-left: auto; margin-right: auto; }
          .hero-ctas { justify-content: center; }
          .hero-can { height: 52vh; }
          .scroll-cue { display: none !important; }
          #hero { padding-bottom: 70px; }
        }
      `}</style>
    </section>
  );
}
