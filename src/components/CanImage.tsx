type Props = {
	className?: string;
	style?: React.CSSProperties;
	eager?: boolean;
	sizes?: string;
};

export default function CanImage({
	className = "",
	style,
	eager = false,
	sizes = "(max-width: 900px) 45vw, 280px",
}: Props) {
	return (
		<img
			src="/white-monster-ultra.webp"
			srcSet="/white-monster-ultra-320.webp 320w, /white-monster-ultra.webp 603w"
			sizes={sizes}
			alt="White Monster Energy Zero Ultra can"
			width={603}
			height={1400}
			loading={eager ? "eager" : "lazy"}
			fetchPriority={eager ? "high" : undefined}
			decoding="async"
			draggable={false}
			className={`can-img ${className}`}
			style={style}
		/>
	);
}
