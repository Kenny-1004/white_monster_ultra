type Props = {
  className?: string;
  style?: React.CSSProperties;
  flip?: boolean;
};

// Baroque scrollwork echoing the engraved swirls on the Ultra can.
export default function Filigree({ className = "", style, flip = false }: Props) {
  return (
    <svg
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined, color: "var(--filigree)", ...style }}
      viewBox="0 0 400 520"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* main stem */}
        <path strokeWidth="2.2" d="M40 510 C 70 430, 40 360, 110 320 S 230 260, 210 180 S 140 90, 220 40" />
        <path strokeWidth="1.2" d="M52 505 C 84 428, 56 364, 120 328 S 240 266, 222 182 S 156 96, 228 52" />

        {/* top volute */}
        <path strokeWidth="2" d="M220 40 C 262 18, 300 44, 290 78 C 282 104, 250 106, 244 88 C 240 74, 254 66, 262 74" />
        <path strokeWidth="1" d="M230 50 C 262 34, 288 54, 280 78" />

        {/* mid volute, right */}
        <path strokeWidth="2" d="M210 180 C 260 170, 320 190, 330 240 C 338 280, 300 298, 282 276 C 268 258, 284 240, 298 250" />
        <path strokeWidth="1" d="M222 190 C 266 184, 312 204, 318 244" />

        {/* lower volute, left */}
        <path strokeWidth="2" d="M110 320 C 60 300, 20 320, 18 360 C 16 392, 48 404, 60 386 C 70 370, 56 356, 44 364" />
        <path strokeWidth="1" d="M100 326 C 60 312, 30 332, 30 360" />

        {/* acanthus leaves */}
        <path strokeWidth="1.6" fill="currentColor" fillOpacity="0.18"
          d="M160 300 C 190 260, 240 250, 270 268 C 240 270, 210 284, 196 304 C 222 290, 252 292, 266 306 C 230 306, 196 318, 160 300 Z" />
        <path strokeWidth="1.6" fill="currentColor" fillOpacity="0.18"
          d="M170 140 C 140 110, 96 108, 74 128 C 102 126, 128 136, 140 154 C 116 144, 90 148, 78 162 C 112 160, 144 166, 170 140 Z" />
        <path strokeWidth="1.6" fill="currentColor" fillOpacity="0.18"
          d="M90 420 C 130 410, 170 430, 178 462 C 154 444, 126 440, 108 446 C 134 452, 152 470, 154 490 C 128 466, 100 452, 90 420 Z" />

        {/* tendrils */}
        <path strokeWidth="1.2" d="M150 240 C 130 220, 132 196, 152 192 C 166 190, 170 206, 160 210" />
        <path strokeWidth="1.2" d="M250 120 C 280 120, 300 100, 292 82" />
        <path strokeWidth="1.2" d="M76 470 C 50 470, 34 450, 44 432 C 52 420, 68 426, 64 438" />
        <path strokeWidth="1.2" d="M300 330 C 330 340, 360 330, 362 304 C 364 284, 342 280, 338 294" />
        <path strokeWidth="1" d="M210 180 C 236 210, 270 220, 300 330" />

        {/* bead accents */}
        <circle cx="262" cy="74" r="3" fill="currentColor" />
        <circle cx="298" cy="250" r="3" fill="currentColor" />
        <circle cx="44" cy="364" r="3" fill="currentColor" />
        <circle cx="160" cy="210" r="2.4" fill="currentColor" />
        <circle cx="338" cy="294" r="2.4" fill="currentColor" />
        <circle cx="64" cy="438" r="2.4" fill="currentColor" />
      </g>
    </svg>
  );
}
