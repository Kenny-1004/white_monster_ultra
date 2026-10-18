export default function Footer() {
  const cols = [
    { h: "Product", l: ["White Ultra", "Nutrition", "Ingredients", "FAQ"] },
    { h: "Company", l: ["About", "Careers", "Press", "Contact"] },
    { h: "Follow", l: ["Instagram", "TikTok", "YouTube", "X"] },
  ];

  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "72px 0 40px", background: "var(--bg)" }}>
      <div className="wrap footer-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 40 }}>
        <div>
          <div className="display" style={{ fontSize: 34 }}>
            White Monster <span style={{ color: "var(--acid)" }}>Ultra</span>
          </div>
          <p style={{ color: "var(--ink-faint)", fontSize: 14, marginTop: 12, maxWidth: 280, lineHeight: 1.6 }}>
            Zero sugar. Full flavor. Built for the ones who never slow down.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 18 }}>{c.h}</div>
            {c.l.map((x) => (
              <a key={x} href="#" className="footer-link" style={{ display: "block", fontSize: 14, color: "var(--ink-dim)", marginBottom: 12 }}>
                {x}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="wrap" style={{ marginTop: 56, paddingTop: 24, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: 12, color: "var(--ink-faint)" }}>
        <span>© {new Date().getFullYear()} White Monster Ultra concept. Fan-made landing page.</span>
        <span>Not recommended for children, pregnant or nursing women, or persons sensitive to caffeine.</span>
      </div>
      <style>{`
        .footer-link:hover { color: var(--acid) !important; }
        @media (max-width: 760px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </footer>
  );
}
