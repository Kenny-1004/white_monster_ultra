import {
	AnimatePresence,
	motion,
	useScroll,
	useMotionValueEvent,
} from "motion/react";
import { useEffect, useState } from "react";
import Filigree from "./Filigree";

const links = [
	{ label: "Product", href: "#product" },
	{ label: "Flavor", href: "#flavor" },
	{ label: "Nutrition", href: "#nutrition" },
	{ label: "Find It", href: "#find-it" },
];

const ease = [0.16, 1, 0.3, 1] as const;

function useActiveSection(ids: string[]) {
	const [active, setActive] = useState<string | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const e of entries)
					if (e.isIntersecting) setActive(e.target.id);
			},
			{ rootMargin: "-45% 0px -50% 0px" },
		);
		ids.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});
		return () => observer.disconnect();
	}, [ids]);

	return active;
}

const sectionIds = links.map((l) => l.href.slice(1));

export default function Navbar() {
	const [solid, setSolid] = useState(false);
	const [open, setOpen] = useState(false);
	const active = useActiveSection(sectionIds);
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 40));

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) =>
			e.key === "Escape" && setOpen(false);
		document.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<>
			<motion.header
				initial={{ y: -80, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8, ease }}
				className="site-header"
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					zIndex: 100,
					background:
						solid && !open
							? "rgba(250,250,248,0.78)"
							: "transparent",
					backdropFilter:
						solid && !open ? "blur(16px) saturate(1.4)" : "none",
					WebkitBackdropFilter:
						solid && !open ? "blur(16px) saturate(1.4)" : "none",
					borderBottom:
						solid && !open
							? "1px solid var(--line)"
							: "1px solid transparent",
					transition: "background 0.4s ease, border-color 0.4s ease",
				}}
			>
				<div
					className="wrap"
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						height: 76,
					}}
				>
					<a
						href="#hero"
						aria-label="White Monster Ultra, back to top"
						onClick={() => setOpen(false)}
						style={{
							display: "flex",
							alignItems: "center",
							gap: 10,
						}}
					>
						<img
							src="/monster-claw.webp"
							alt=""
							width={24}
							height={36}
							style={{ height: 36, width: "auto" }}
						/>
						<span
							className="display brand"
							style={{ fontSize: 15, letterSpacing: "0.02em" }}
						>
							<span className="brand-long">White </span>Monster{" "}
							<span className="chrome-text">Ultra</span>
						</span>
					</a>

					<nav
						className="nav-links"
						aria-label="Primary"
						style={{
							display: "flex",
							alignItems: "center",
							gap: 36,
						}}
					>
						{links.map((l) => {
							const isActive = active === l.href.slice(1);
							return (
								<a
									key={l.label}
									href={l.href}
									className={`nav-link serif${isActive ? " is-active" : ""}`}
									aria-current={isActive ? "true" : undefined}
								>
									{l.label}
								</a>
							);
						})}
					</nav>

					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 10,
						}}
					>
						<motion.a
							href="#find-it"
							className="btn btn-dark nav-cta"
							whileHover={{ scale: 1.04 }}
							whileTap={{ scale: 0.97 }}
							style={{ padding: "11px 22px", fontSize: 11 }}
						>
							Shop Now
						</motion.a>
						<button
							type="button"
							className="nav-burger"
							aria-label={open ? "Close menu" : "Open menu"}
							aria-expanded={open}
							aria-controls="mobile-menu"
							onClick={() => setOpen((o) => !o)}
						>
							<motion.span
								animate={
									open
										? { rotate: 45, y: 4 }
										: { rotate: 0, y: 0 }
								}
								transition={{ duration: 0.35, ease }}
							/>
							<motion.span
								animate={
									open
										? { rotate: -45, y: -4 }
										: { rotate: 0, y: 0 }
								}
								transition={{ duration: 0.35, ease }}
							/>
						</button>
					</div>
				</div>
			</motion.header>

			<AnimatePresence>
				{open && (
					<motion.div
						id="mobile-menu"
						role="dialog"
						aria-modal="true"
						aria-label="Menu"
						initial={{ clipPath: "inset(0 0 100% 0)" }}
						animate={{ clipPath: "inset(0 0 0% 0)" }}
						exit={{ clipPath: "inset(0 0 100% 0)" }}
						transition={{ duration: 0.6, ease }}
						style={{
							position: "fixed",
							inset: 0,
							zIndex: 90,
							background:
								"radial-gradient(90% 70% at 50% 30%, #ffffff, #ededeb)",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							padding: "100px 28px 40px",
							overflow: "hidden",
						}}
					>
						<div
							style={{
								position: "absolute",
								right: "-30%",
								bottom: "-10%",
								width: "110%",
								opacity: 0.5,
								pointerEvents: "none",
							}}
						>
							<Filigree flip />
						</div>
						<nav
							aria-label="Mobile"
							style={{
								display: "flex",
								flexDirection: "column",
								gap: 6,
								position: "relative",
							}}
						>
							{links.map((l, i) => (
								<div
									key={l.label}
									style={{ overflow: "hidden" }}
								>
									<motion.a
										href={l.href}
										onClick={() => setOpen(false)}
										className="display"
										initial={{ y: "100%" }}
										animate={{ y: "0%" }}
										exit={{ y: "100%" }}
										transition={{
											delay: 0.15 + i * 0.06,
											duration: 0.6,
											ease,
										}}
										style={{
											display: "flex",
											alignItems: "baseline",
											gap: 14,
											fontSize: "clamp(30px, 9vw, 64px)",
											padding: "4px 0",
										}}
									>
										<span
											className="serif"
											style={{
												fontSize: 13,
												color: "var(--ice-ink)",
												letterSpacing: "0.2em",
											}}
										>
											0{i + 1}
										</span>
										{l.label}
									</motion.a>
								</div>
							))}
						</nav>
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{ delay: 0.45, duration: 0.5 }}
							style={{ marginTop: 40, position: "relative" }}
						>
							<a
								href="#find-it"
								onClick={() => setOpen(false)}
								className="btn btn-dark"
							>
								Shop 12-Pack
							</a>
							<p
								className="serif"
								style={{
									marginTop: 28,
									fontSize: 12,
									letterSpacing: "0.24em",
									color: "var(--ink-faint)",
									textTransform: "uppercase",
								}}
							>
								Zero Calories{" "}
								<span style={{ color: "var(--ice)" }}>+</span>{" "}
								Zero Sugar
							</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<style>{`
        .site-header .brand { white-space: nowrap; }
        .nav-link {
          font-size: 13px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ink-dim); position: relative; transition: color .3s;
        }
        .nav-link::after {
          content: ""; position: absolute; left: 0; right: 0; bottom: -6px; height: 1px;
          background: var(--ink); transform: scaleX(0); transform-origin: right; transition: transform .4s cubic-bezier(.16,1,.3,1);
        }
        .nav-link:hover, .nav-link.is-active { color: var(--ink); }
        .nav-link:hover::after, .nav-link.is-active::after { transform: scaleX(1); transform-origin: left; }
        .nav-burger {
          display: none; width: 44px; height: 44px; border-radius: 999px; border: 1px solid rgba(13,13,13,0.15);
          background: rgba(255,255,255,0.7); cursor: pointer; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
        }
        .nav-burger span { display: block; width: 18px; height: 1.5px; background: var(--ink); border-radius: 2px; }
        @media (max-width: 800px) { .nav-links { display: none !important; } .nav-burger { display: flex; } }
        @media (max-width: 720px) { .site-header .brand { font-size: 12px !important; } .nav-cta { padding: 10px 16px !important; } }
        @media (max-width: 480px) { .nav-cta { display: none !important; } }
        @media (max-width: 340px) { .site-header .brand .brand-long { display: none; } }
      `}</style>
		</>
	);
}
