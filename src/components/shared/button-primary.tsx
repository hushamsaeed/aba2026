import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonPrimaryProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  fullWidth?: boolean;
}

export function ButtonPrimary({
  children,
  href,
  onClick,
  disabled,
  loading,
  type = "button",
  className,
  fullWidth,
}: ButtonPrimaryProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center",
    "px-10 py-4",
    "bg-gold text-navy",
    "font-[family-name:var(--font-body)] text-[14px] font-semibold uppercase tracking-[1.5px]",
    "transition-colors duration-200",
    "hover:bg-gold-hover active:bg-gold-active",
    "disabled:bg-disabled disabled:text-text-secondary disabled:cursor-not-allowed",
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
      disabled={disabled || loading}
      className={baseClasses}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
