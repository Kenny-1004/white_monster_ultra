import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef } from "react";
import Filigree from "./Filigree";

const features = [
	{
		stat: "0g",
		label: "Sugar",
		title: "Zero Sugar",
		copy: "All the Monster energy blend, with not a single gram of sugar.",
	},
	{
		stat: "10",
		label: "Calories",
		title: "Barely There",
		copy: "A light, crisp body that keeps up without slowing you down.",
	},
	{
		stat: "150",
		label: "mg Caffeine",
		title: "Full Energy",
		copy: "The same energy blend Monster is known for, in a cleaner can.",
	},
	{
		stat: "B",
		label: "Vitamin Complex",
		title: "B-Vitamins",
		copy: "Niacin, B6 and B12 to support everyday energy metabolism.",
	},
];

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 56 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
	}),
};

export default function Features() {
	const ref = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});
	const filiY = useTransform(scrollYProgress, [0, 1], [120, -160]);

	return (
		<section
			id="product"
			ref={ref}
			className="section-pad"
			style={{ overflow: "hidden" }}
		>
			<motion.div
				style={{
					position: "absolute",
					right: "-8%",
					top: "4%",
					width: 460,
					y: filiY,
					opacity: 0.5,
				}}
			>
				<Filigree flip />
			</motion.div>

			<div className="wrap" style={{ position: "relative" }}>
				<motion.p
					className="eyebrow"
					initial={{ opacity: 0, y: 14 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6 }}
					style={{ textAlign: "center" }}
				>
					Why Ultra
				</motion.p>
				<motion.h2
					className="display"
					initial={{ opacity: 0, y: 28 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					style={{
						fontSize: "clamp(32px, 4.8vw, 58px)",
						textAlign: "center",
						marginTop: 16,
						maxWidth: 820,
						marginInline: "auto",
					}}
				>
					Built to keep up.{" "}
					<span className="chrome-text">Not weigh you down.</span>
				</motion.h2>

				<div
					className="feature-grid"
					style={{
						marginTop: 72,
						display: "grid",
						gridTemplateColumns: "repeat(4, 1fr)",
						gap: 20,
					}}
				>
					{features.map((f, i) => (
						<motion.div
							key={f.title}
							custom={i}
							variants={cardVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-80px" }}
							whileHover={{ y: -10 }}
							className="feature-card"
						>
							<div
								className="display chrome-text"
								style={{ fontSize: 52, lineHeight: 1 }}
							>
								{f.stat}
							</div>
							<div
								className="serif"
								style={{
									fontSize: 11,
									fontWeight: 700,
									letterSpacing: "0.22em",
									color: "var(--ice-ink)",
									textTransform: "uppercase",
									marginTop: 8,
									marginBottom: 26,
								}}
							>
								{f.label}
							</div>
							<div
								style={{
									height: 1,
									background:
										"linear-gradient(90deg, var(--silver-3), transparent)",
									marginBottom: 22,
								}}
							/>
							<h3
								style={{
									fontSize: 18,
									fontWeight: 700,
									marginBottom: 10,
								}}
							>
								{f.title}
							</h3>
							<p
								style={{
									fontSize: 14,
									lineHeight: 1.65,
									color: "var(--ink-dim)",
								}}
							>
								{f.copy}
							</p>
						</motion.div>
					))}
				</div>
			</div>

			<style>{`
        .feature-card {
          background: linear-gradient(160deg, #ffffff 0%, #f7f7f6 60%, #eeeeec 100%);
          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 20px;
          padding: 34px 28px;
          box-shadow: 0 1px 0 rgba(13,13,13,0.04), 0 20px 40px -18px rgba(13,13,13,0.18), inset 0 0 0 1px rgba(13,13,13,0.05);
          transition: box-shadow .4s ease;
        }
        .feature-card:hover {
          box-shadow: 0 1px 0 rgba(13,13,13,0.04), 0 34px 60px -20px rgba(13,13,13,0.28), inset 0 0 0 1px rgba(140,196,232,0.6);
        }
        @media (max-width: 980px) { .feature-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .feature-grid { grid-template-columns: 1fr !important; } }
      `}</style>
		</section>
	);
}
