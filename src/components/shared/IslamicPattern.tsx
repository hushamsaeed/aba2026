import { cn } from "@/lib/utils";

interface IslamicPatternProps {
  className?: string;
  color?: string;
  opacity?: number;
}

export function IslamicPattern({
  className,
  color = "#bf9436",
  opacity = 0.08,
}: IslamicPatternProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <defs>
          <pattern
            id="islamic-geometric"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* 8-pointed star pattern */}
            <path
              d="M30 0L37.07 22.93L60 30L37.07 37.07L30 60L22.93 37.07L0 30L22.93 22.93Z"
              fill="none"
              stroke={color}
              strokeWidth="0.5"
              opacity={opacity}
            />
            <circle
              cx="30"
              cy="30"
              r="8"
              fill="none"
              stroke={color}
              strokeWidth="0.5"
              opacity={opacity * 0.7}
            />
            <path
              d="M15 15L45 15L45 45L15 45Z"
              fill="none"
              stroke={color}
              strokeWidth="0.3"
              opacity={opacity * 0.5}
              transform="rotate(45 30 30)"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-geometric)" />
      </svg>
    </div>
  );
}
