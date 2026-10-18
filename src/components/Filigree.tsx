import { motion, type MotionValue } from "motion/react";

type Props = {
	className?: string;
	style?: React.CSSProperties;
	flip?: boolean;
	draw?: MotionValue<number>;
};

type Stroke = { d: string; w: number; leaf?: boolean };

const strokes: Stroke[] = [
	{
		w: 2.2,
		d: "M40 510 C 70 430, 40 360, 110 320 S 230 260, 210 180 S 140 90, 220 40",
	},
	{
		w: 1.2,
		d: "M52 505 C 84 428, 56 364, 120 328 S 240 266, 222 182 S 156 96, 228 52",
	},
	{
		w: 2,
		d: "M220 40 C 262 18, 300 44, 290 78 C 282 104, 250 106, 244 88 C 240 74, 254 66, 262 74",
	},
	{ w: 1, d: "M230 50 C 262 34, 288 54, 280 78" },
	{
		w: 2,
		d: "M210 180 C 260 170, 320 190, 330 240 C 338 280, 300 298, 282 276 C 268 258, 284 240, 298 250",
	},
	{ w: 1, d: "M222 190 C 266 184, 312 204, 318 244" },
	{
		w: 2,
		d: "M110 320 C 60 300, 20 320, 18 360 C 16 392, 48 404, 60 386 C 70 370, 56 356, 44 364",
	},
	{ w: 1, d: "M100 326 C 60 312, 30 332, 30 360" },
	{
		w: 1.6,
		leaf: true,
		d: "M160 300 C 190 260, 240 250, 270 268 C 240 270, 210 284, 196 304 C 222 290, 252 292, 266 306 C 230 306, 196 318, 160 300 Z",
	},
	{
		w: 1.6,
		leaf: true,
		d: "M170 140 C 140 110, 96 108, 74 128 C 102 126, 128 136, 140 154 C 116 144, 90 148, 78 162 C 112 160, 144 166, 170 140 Z",
	},
	{
		w: 1.6,
		leaf: true,
		d: "M90 420 C 130 410, 170 430, 178 462 C 154 444, 126 440, 108 446 C 134 452, 152 470, 154 490 C 128 466, 100 452, 90 420 Z",
	},
	{
		w: 1.2,
		d: "M150 240 C 130 220, 132 196, 152 192 C 166 190, 170 206, 160 210",
	},
	{ w: 1.2, d: "M250 120 C 280 120, 300 100, 292 82" },
	{ w: 1.2, d: "M76 470 C 50 470, 34 450, 44 432 C 52 420, 68 426, 64 438" },
	{
		w: 1.2,
		d: "M300 330 C 330 340, 360 330, 362 304 C 364 284, 342 280, 338 294",
	},
	{ w: 1, d: "M210 180 C 236 210, 270 220, 300 330" },
];

const beads: [number, number, number][] = [
	[262, 74, 3],
	[298, 250, 3],
	[44, 364, 3],
	[160, 210, 2.4],
	[338, 294, 2.4],
	[64, 438, 2.4],
];

// Baroque scrollwork echoing the engraved swirls on the Ultra can.
// Pass `draw` (0..1) to stroke the lines in, e.g. from scroll progress.
export default function Filigree({
	className = "",
	style,
	flip = false,
	draw,
}: Props) {
	return (
		<svg
			className={className}
			style={{
				transform: flip ? "scaleX(-1)" : undefined,
				color: "var(--filigree)",
				...style,
			}}
			viewBox="0 0 400 520"
			fill="none"
			aria-hidden="true"
		>
			<g
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				{strokes.map((s, i) => (
					<motion.path
						key={i}
						d={s.d}
						strokeWidth={s.w}
						fill={s.leaf ? "currentColor" : "none"}
						fillOpacity={s.leaf ? 0.18 : undefined}
						style={draw ? { pathLength: draw } : undefined}
					/>
				))}
				{beads.map(([cx, cy, r]) => (
					<motion.circle
						key={`${cx}-${cy}`}
						cx={cx}
						cy={cy}
						r={r}
						fill="currentColor"
						style={draw ? { opacity: draw } : undefined}
					/>
				))}
			</g>
		</svg>
	);
}
