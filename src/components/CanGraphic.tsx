export default function CanGraphic({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 620"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8d9093" />
          <stop offset="14%" stopColor="#f3f4f5" />
          <stop offset="30%" stopColor="#ffffff" />
          <stop offset="48%" stopColor="#e3e5e6" />
          <stop offset="62%" stopColor="#cfd1d3" />
          <stop offset="80%" stopColor="#f6f7f8" />
          <stop offset="100%" stopColor="#787b7e" />
        </linearGradient>
        <linearGradient id="cap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5b5e60" />
          <stop offset="20%" stopColor="#d9dadb" />
          <stop offset="50%" stopColor="#fdfdfd" />
          <stop offset="80%" stopColor="#c6c7c9" />
          <stop offset="100%" stopColor="#4c4e50" />
        </linearGradient>
        <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="48%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="acidGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4ff6b" />
          <stop offset="100%" stopColor="#8fd92a" />
        </linearGradient>
        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="18" stdDeviation="22" floodColor="#000" floodOpacity="0.55" />
        </filter>
      </defs>

      <g filter="url(#softShadow)">
        {/* top rim */}
        <path d="M86 46 Q160 10 234 46 L228 70 Q160 44 92 70 Z" fill="url(#cap)" />
        <ellipse cx="160" cy="48" rx="74" ry="16" fill="url(#cap)" />
        <ellipse cx="160" cy="46" rx="60" ry="10" fill="#101112" opacity="0.85" />
        <ellipse cx="160" cy="44" rx="50" ry="7" fill="#1c1d1e" />

        {/* body */}
        <path
          d="M92 70 L86 540 Q86 578 160 584 Q234 578 234 540 L228 70 Q160 96 92 70 Z"
          fill="url(#body)"
        />
        {/* vertical sheen */}
        <path
          d="M92 70 L86 540 Q86 578 160 584 Q234 578 234 540 L228 70 Q160 96 92 70 Z"
          fill="url(#sheen)"
          opacity="0.55"
        />

        {/* claw marks */}
        <g stroke="url(#acidGrad)" strokeWidth="14" strokeLinecap="round" opacity="0.95">
          <path d="M112 150 L128 460" />
          <path d="M140 140 L150 468" />
          <path d="M168 140 L160 468" />
          <path d="M196 150 L178 460" />
        </g>
        <g stroke="#060606" strokeWidth="2.5" strokeLinecap="round" opacity="0.5">
          <path d="M112 150 L128 460" />
          <path d="M196 150 L178 460" />
        </g>

        {/* wordmark plate */}
        <rect x="98" y="286" width="124" height="148" rx="6" fill="#f4f5f6" opacity="0.94" />
        <rect x="98" y="286" width="124" height="148" rx="6" fill="url(#sheen)" opacity="0.35" />
        <text
          x="160"
          y="330"
          textAnchor="middle"
          fontFamily="Teko, sans-serif"
          fontWeight="700"
          fontSize="42"
          fill="#0a0a0a"
          textLength="108"
          lengthAdjust="spacingAndGlyphs"
        >
          MONSTER
        </text>
        <text
          x="160"
          y="372"
          textAnchor="middle"
          fontFamily="Teko, sans-serif"
          fontWeight="600"
          fontSize="30"
          fill="#0a0a0a"
          letterSpacing="6"
        >
          ULTRA
        </text>
        <rect x="100" y="392" width="120" height="3" fill="#0a0a0a" opacity="0.7" />
        <text
          x="160"
          y="420"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="800"
          fontSize="15"
          fill="#4b4e50"
          textLength="104"
          lengthAdjust="spacingAndGlyphs"
        >
          ZERO SUGAR
        </text>

        {/* bottom rim */}
        <ellipse cx="160" cy="540" rx="74" ry="14" fill="#9a9c9e" />
        <ellipse cx="160" cy="548" rx="74" ry="16" fill="url(#cap)" />
        <ellipse cx="160" cy="552" rx="74" ry="14" fill="#2b2c2d" />
      </g>
    </svg>
  );
}
