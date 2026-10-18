import { MotionConfig, motion, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeStrip from "./components/MarqueeStrip";
import Features from "./components/Features";
import ProductShowcase from "./components/ProductShowcase";
import Nutrition from "./components/Nutrition";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Skip to content</a>
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, var(--silver-3), var(--ink) 60%, var(--ice))",
          transformOrigin: "0%",
          scaleX: progress,
          zIndex: 200,
        }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <MarqueeStrip />
        <Features />
        <ProductShowcase />
        <Nutrition />
        <CallToAction />
      </main>
      <Footer />
    </MotionConfig>
  );
}
