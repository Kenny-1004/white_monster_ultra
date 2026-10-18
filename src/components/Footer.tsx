const year = new Date().getFullYear();

export default function Footer() {
	const cols = [
		{ h: "Product", l: ["Zero Ultra", "Nutrition", "Ingredients", "FAQ"] },
		{ h: "Company", l: ["About", "Careers", "Press", "Contact"] },
		{ h: "Follow", l: ["Instagram", "TikTok", "YouTube", "X"] },
	];

	return (
		<footer
			style={{
				borderTop: "1px solid var(--line)",
				padding: "76px 0 40px",
				background: "#ffffff",
			}}
		>
			<div
				className="wrap footer-grid"
				style={{
					display: "grid",
					gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
					gap: 40,
				}}
			>
				<div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 12,
						}}
					>
						<img
							src="/monster-claw.webp"
							alt="Monster"
							width={30}
							height={46}
							style={{ height: 46, width: "auto" }}
						/>
						<div className="display" style={{ fontSize: 22 }}>
							White Monster{" "}
							<span className="chrome-text">Ultra</span>
						</div>
					</div>
					<p
						className="serif"
						style={{
							color: "var(--ink-faint)",
							fontSize: 13,
							letterSpacing: "0.16em",
							marginTop: 18,
							textTransform: "uppercase",
						}}
					>
						Zero Calories{" "}
						<span style={{ color: "var(--ice)" }}>+</span> Zero
						Sugar
					</p>
				</div>
				{cols.map((c) => (
					<div key={c.h}>
						<div
							className="serif"
							style={{
								fontSize: 12,
								fontWeight: 700,
								letterSpacing: "0.22em",
								textTransform: "uppercase",
								marginBottom: 20,
							}}
						>
							{c.h}
						</div>
						{c.l.map((x) => (
							<a
								key={x}
								href="#"
								className="footer-link"
								style={{
									display: "block",
									fontSize: 14,
									color: "var(--ink-dim)",
									marginBottom: 12,
								}}
							>
								{x}
							</a>
						))}
					</div>
				))}
			</div>
			<div
				className="wrap"
				style={{
					marginTop: 56,
					paddingTop: 24,
					borderTop: "1px solid var(--line)",
					display: "flex",
					justifyContent: "space-between",
					flexWrap: "wrap",
					gap: 12,
					fontSize: 12,
					color: "var(--ink-faint)",
				}}
			>
				<span>
					© {year} White Monster Ultra concept. Fan-made landing page,
					not affiliated with Monster Energy.
				</span>
				<span>
					Not recommended for children, pregnant or nursing women, or
					people sensitive to caffeine.
				</span>
			</div>
			<style>{`
        .footer-link { transition: color .25s; }
        .footer-link:hover { color: var(--ink) !important; }
        @media (max-width: 760px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
		</footer>
	);
}
