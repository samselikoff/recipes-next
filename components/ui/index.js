export function AspectRatio({ children, ratio }) {
  return (
    <div className="relative" style={{ paddingBottom: `${ratio * 100}%` }}>
      <div className="absolute w-full h-full">{children}</div>
    </div>
  );
}
