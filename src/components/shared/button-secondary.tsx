import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonSecondaryProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  fullWidth?: boolean;
}

export function ButtonSecondary({
  children,
  href,
  onClick,
  disabled,
  type = "button",
  className,
  fullWidth,
}: ButtonSecondaryProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center",
    "px-10 py-4",
    "bg-transparent text-gold",
    "border-2 border-gold",
    "font-[family-name:var(--font-body)] text-[14px] font-semibold uppercase tracking-[1.5px]",
    "transition-colors duration-200",
    "hover:bg-gold-muted",
    "disabled:border-disabled disabled:text-text-secondary disabled:cursor-not-allowed",
    fullWidth && "w-full",
    className,
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
