import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import CanImage from "./CanImage";
import Filigree from "./Filigree";

export default function CallToAction() {
	const ref = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});
	const textX1 = useTransform(scrollYProgress, [0, 1], ["4%", "-28%"]);
	const textX2 = useTransform(scrollYProgress, [0, 1], ["-28%", "4%"]);
	const canLeftY = useTransform(scrollYProgress, [0, 1], [160, -160]);
	const canRightY = useTransform(scrollYProgress, [0, 1], [260, -240]);
	const filiY = useTransform(scrollYProgress, [0, 1], [80, -120]);

	return (
		<section
			id="find-it"
			ref={ref}
			style={{
				position: "relative",
				padding: "170px 0",
				overflow: "hidden",
				background:
					"radial-gradient(70% 70% at 50% 50%, #ffffff 0%, #f1f1ef 70%, #e7e7e4 100%)",
			}}
		>
			<div
				style={{
					position: "absolute",
					inset: 0,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					gap: 6,
					pointerEvents: "none",
				}}
			>
				<motion.div
					className="display"
					style={{
						x: textX1,
						fontSize: "16vw",
						whiteSpace: "nowrap",
						color: "rgba(13,13,13,0.035)",
					}}
				>
					Zero Sugar Zero Sugar
				</motion.div>
				<motion.div
					className="display"
					style={{
						x: textX2,
						fontSize: "16vw",
						whiteSpace: "nowrap",
						color: "transparent",
						WebkitTextStroke: "1px rgba(13,13,13,0.08)",
					}}
				>
					Zero Ultra Zero Ultra
				</motion.div>
			</div>

			<motion.div
				style={{
					position: "absolute",
					left: "50%",
					top: "50%",
					width: 700,
					marginLeft: -350,
					marginTop: -450,
					y: filiY,
					opacity: 0.35,
				}}
			>
				<Filigree />
			</motion.div>

			<motion.div
				className="cta-can cta-can-left"
				style={{ y: canLeftY, rotate: -16 }}
			>
				<CanImage />
			</motion.div>
			<motion.div
				className="cta-can cta-can-right"
				style={{ y: canRightY, rotate: 13 }}
			>
				<CanImage />
			</motion.div>

			<div
				className="wrap"
				style={{ position: "relative", zIndex: 2, textAlign: "center" }}
			>
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
					initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
					whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
					viewport={{ once: true }}
					transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
					style={{
						fontSize: "clamp(48px, 8.4vw, 116px)",
						marginTop: 18,
					}}
				>
					Unleash <span className="chrome-text">Ultra</span>
				</motion.h2>
				<motion.p
					initial={{ opacity: 0, y: 14 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2, duration: 0.6 }}
					style={{
						color: "var(--ink-dim)",
						fontSize: 17,
						maxWidth: 460,
						margin: "24px auto 0",
						lineHeight: 1.7,
					}}
				>
					Grab one ice-cold at your nearest store, or keep the fridge
					stocked with a 12-pack delivered to your door.
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: 14 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3, duration: 0.6 }}
					style={{
						marginTop: 42,
						display: "flex",
						gap: 14,
						justifyContent: "center",
						flexWrap: "wrap",
					}}
				>
					<motion.a
						href="#"
						className="btn btn-dark"
						whileHover={{ scale: 1.04 }}
						whileTap={{ scale: 0.97 }}
					>
						Shop 12-Pack
					</motion.a>
					<motion.a
						href="#"
						className="btn btn-ghost"
						whileHover={{ scale: 1.04 }}
						whileTap={{ scale: 0.97 }}
					>
						Store Locator
					</motion.a>
				</motion.div>
			</div>

			<style>{`
        .cta-can { position: absolute; top: 14%; width: 170px; z-index: 1; pointer-events: none; }
        .cta-can img { width: 100%; }
        .cta-can-left { left: 5%; }
        .cta-can-right { right: 5%; top: 24%; }
        @media (max-width: 900px) { .cta-can { width: 96px; opacity: 0.35; } .cta-can-left { left: -4%; } .cta-can-right { right: -4%; } }
      `}</style>
		</section>
	);
}
