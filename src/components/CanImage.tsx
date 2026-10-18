type Props = {
  className?: string;
  style?: React.CSSProperties;
  eager?: boolean;
};

export default function CanImage({ className = "", style, eager = false }: Props) {
  return (
    <img
      src="/white-monster-ultra.png"
      alt="White Monster Energy Zero Ultra can"
      width={603}
      height={1400}
      loading={eager ? "eager" : "lazy"}
      draggable={false}
      className={`can-img ${className}`}
      style={{ height: "auto", ...style }}
    />
  );
}
