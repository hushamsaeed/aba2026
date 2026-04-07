import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  label,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", "mb-12 md:mb-20", className)}>
      {label && (
        <p className="text-editorial text-aba-gold mb-4 text-xs">{label}</p>
      )}
      <h2 className="text-display text-3xl md:text-5xl lg:text-6xl text-white">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-4 text-white/50 text-sm leading-relaxed max-w-2xl",
          centered && "mx-auto"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
