import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", "mb-10 md:mb-14", className)}>
      <h2
        className={cn(
          "font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
          light ? "text-white" : "text-deep-blue"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-lg md:text-xl max-w-2xl",
            centered && "mx-auto",
            light ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-4 h-1 w-20 rounded-full bg-aba-gold",
          centered && "mx-auto"
        )}
      />
    </div>
  );
}
