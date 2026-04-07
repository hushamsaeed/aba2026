interface WavesDividerProps {
  color?: string;
  className?: string;
  flip?: boolean;
}

export function WavesDivider({
  color = "#f8f4f0",
  className = "",
  flip = false,
}: WavesDividerProps) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-16 md:h-24 ${flip ? "rotate-180" : ""}`}
        preserveAspectRatio="none"
      >
        <path
          d="M0 60C160 20 320 80 480 60C640 40 800 80 960 60C1120 40 1280 80 1440 60V120H0V60Z"
          fill={color}
        />
        <path
          d="M0 80C200 50 400 90 600 70C800 50 1000 90 1200 70C1320 58 1380 65 1440 80V120H0V80Z"
          fill={color}
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
