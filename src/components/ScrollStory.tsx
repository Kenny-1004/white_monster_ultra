import {
	motion,
	useScroll,
	useSpring,
	useTransform,
	type MotionValue,
} from "motion/react";
import { useRef } from "react";
import CanImage from "./CanImage";
import Filigree from "./Filigree";

const chapters = [
	{
		title: "Crisp Citrus",
		copy: "A bright, clean top note that cuts right through the grind.",
		stat: "0g",
		statLabel: "Sugar",
		side: "left",
	},
	{
		title: "Light Body",
		copy: "No syrupy weight. Every sip stays cold, clean and refreshing.",
		stat: "10",
		statLabel: "Calories",
		side: "right",
	},
	{
		title: "Full Energy",
		copy: "The Monster energy blend you know, finished smooth, can after can.",
		stat: "150mg",
		statLabel: "Caffeine",
		side: "left",
	},
] as const;

const N = chapters.length;
const ring = "ZERO CALORIES + ZERO SUGAR + ZERO CALORIES + ZERO SUGAR + ";

function Chapter({
	index,
	progress,
}: {
	index: number;
	progress: MotionValue<number>;
}) {
	const c = chapters[index];
	const start = index / N;
	const end = (index + 1) / N;
	const fadeIn = index === 0 ? [-1, 0] : [start - 0.04, start + 0.04];
	const fadeOut = index === N - 1 ? [1.5, 2] : [end - 0.04, end + 0.04];

	const opacity = useTransform(
		progress,
		[fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]],
		[0, 1, 1, 0],
	);
	const y = useTransform(
		progress,
		[fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]],
		[60, 0, 0, -60],
	);
	const blur = useTransform(
		progress,
		[fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]],
		[8, 0, 0, 8],
	);
	const filter = useTransform(blur, (b) => `blur(${b}px)`);

	return (
		<motion.div
			className={`story-chapter story-${c.side}`}
			style={{ opacity, y, filter }}
			aria-hidden={false}
		>
			<div
				className="serif"
				style={{
					fontSize: 13,
					letterSpacing: "0.32em",
					color: "var(--ice-ink)",
				}}
			>
				0{index + 1} / 0{N}
			</div>
			<h3
				className="display"
				style={{ fontSize: "clamp(40px, 5.2vw, 76px)", marginTop: 14 }}
			>
				{c.title}
			</h3>
			<p
				style={{
					marginTop: 18,
					fontSize: 17,
					lineHeight: 1.7,
					color: "var(--ink-dim)",
					maxWidth: 360,
				}}
			>
				{c.copy}
			</p>
			<div
				style={{
					marginTop: 30,
					display: "flex",
					alignItems: "baseline",
					gap: 12,
				}}
			>
				<span className="display chrome-text" style={{ fontSize: 54 }}>
					{c.stat}
				</span>
				<span
					className="serif"
					style={{
						fontSize: 12,
						letterSpacing: "0.24em",
						textTransform: "uppercase",
						color: "var(--ink-faint)",
					}}
				>
					{c.statLabel}
				</span>
			</div>
		</motion.div>
	);
}

function ProgressTick({
	index,
	progress,
}: {
	index: number;
	progress: MotionValue<number>;
}) {
	const fill = useTransform(progress, [index / N, (index + 1) / N], [0, 1]);
	return (
		<div
			style={{
				width: 2,
				height: 54,
				background: "var(--line)",
				borderRadius: 2,
				overflow: "hidden",
			}}
		>
			<motion.div
				style={{
					width: "100%",
					height: "100%",
					background: "var(--ink)",
					scaleY: fill,
					originY: 0,
				}}
			/>
		</div>
	);
}

export default function ScrollStory() {
	const ref = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end end"],
	});
	const p = useSpring(scrollYProgress, {
		stiffness: 140,
		damping: 30,
		mass: 0.4,
	});

	const canRotate = useTransform(p, [0, 0.33, 0.66, 1], [-10, 6, -6, 0]);
	const canScale = useTransform(p, [0, 0.5, 1], [0.92, 1.02, 0.96]);
	const canX = useTransform(p, [0, 0.33, 0.66, 1], ["6%", "-6%", "6%", "6%"]);
	const ringRotate = useTransform(p, [0, 1], [0, 160]);
	const ringScale = useTransform(p, [0, 0.5, 1], [0.86, 1.04, 0.94]);
	const draw = useTransform(p, [0, 0.7], [0, 1]);
	const ghostNum = useTransform(
		p,
		(v) => `0${Math.min(N, Math.floor(v * N) + 1)}`,
	);

	return (
		<section
			id="flavor"
			ref={ref}
			className="story"
			aria-label="The taste of Ultra, in three notes"
		>
			<div className="story-sticky">
				<div className="story-bg" aria-hidden>
					<div
						style={{
							position: "absolute",
							left: "-4%",
							top: "6%",
							width: 440,
							opacity: 0.75,
						}}
					>
						<Filigree draw={draw} />
					</div>
					<div
						style={{
							position: "absolute",
							right: "-4%",
							bottom: "2%",
							width: 460,
							opacity: 0.75,
						}}
					>
						<Filigree flip draw={draw} />
					</div>
					<motion.div className="display story-ghost">
						{ghostNum}
					</motion.div>
				</div>

				<div className="story-stage">
					<motion.svg
						viewBox="0 0 500 500"
						className="story-ring"
						style={{ rotate: ringRotate, scale: ringScale }}
						aria-hidden
					>
						<defs>
							<path
								id="storyRing"
								d="M250,250 m-210,0 a210,210 0 1,1 420,0 a210,210 0 1,1 -420,0"
							/>
						</defs>
						<circle
							cx="250"
							cy="250"
							r="236"
							fill="none"
							stroke="var(--silver-2)"
							strokeWidth="1"
						/>
						<circle
							cx="250"
							cy="250"
							r="184"
							fill="none"
							stroke="var(--silver-2)"
							strokeWidth="1"
						/>
						<text
							fontFamily="Cinzel, serif"
							fontSize="22"
							fontWeight="600"
							letterSpacing="7"
							fill="var(--silver-3)"
						>
							<textPath href="#storyRing">{ring}</textPath>
						</text>
					</motion.svg>

					<motion.div
						className="story-can"
						style={{ rotate: canRotate, scale: canScale, x: canX }}
					>
						<CanImage />
					</motion.div>
				</div>

				<div className="wrap story-copy">
					{chapters.map((_, i) => (
						<Chapter key={i} index={i} progress={p} />
					))}
				</div>

				<div className="story-ticks" aria-hidden>
					{chapters.map((_, i) => (
						<ProgressTick key={i} index={i} progress={p} />
					))}
				</div>
			</div>

			<style>{`
        .story { position: relative; height: 340vh; background: linear-gradient(180deg, var(--bg) 0%, #ffffff 30%, #ffffff 70%, var(--bg) 100%); }
        .story-sticky { position: sticky; top: 0; height: 100vh; height: 100svh; overflow: hidden; }
        .story-bg { position: absolute; inset: 0; pointer-events: none; }
        .story-ghost {
          position: absolute; right: 4%; top: 50%; transform: translateY(-50%);
          font-size: 38vw; line-height: 1; color: transparent; -webkit-text-stroke: 1.5px rgba(13,13,13,0.05);
        }
        .story-stage { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 1; }
        .story-ring { position: absolute; width: min(640px, 92vw); height: auto; }
        .story-can { position: relative; }
        .story-can img { height: min(64vh, 580px); width: auto; }
        .story-copy { position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: 0 auto; z-index: 2; pointer-events: none; }
        .story-chapter { position: absolute; top: 50%; margin-top: -150px; width: min(400px, 36vw); }
        .story-left { left: 32px; }
        .story-right { right: 32px; text-align: right; }
        .story-right p { margin-left: auto; }
        .story-right > div:last-child { justify-content: flex-end; }
        .story-ticks { position: absolute; right: 28px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 10px; z-index: 3; }
        @media (max-width: 900px) {
          .story { height: 300vh; }
          .story-stage { align-items: flex-start; padding-top: 140px; }
          .story-can img { height: 40vh; }
          .story-ring { top: 120px; width: min(480px, 96vw); }
          .story-chapter, .story-right, .story-left {
            left: 22px; right: 22px; width: auto; top: auto; bottom: 7vh; margin-top: 0; text-align: center;
          }
          .story-chapter p { margin-left: auto; margin-right: auto; font-size: 15px !important; }
          .story-chapter > div:last-child { justify-content: center !important; }
          .story-chapter h3 { font-size: 36px !important; margin-top: 8px !important; }
          .story-chapter p { margin-top: 10px !important; }
          .story-chapter > div:last-child { margin-top: 14px !important; }
          .story-chapter .chrome-text { font-size: 40px !important; }
          .story-ticks { right: 12px; top: 40%; }
        }
      `}</style>
		</section>
	);
}
