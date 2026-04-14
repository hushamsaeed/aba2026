import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <label className="font-[family-name:var(--font-body)] text-[13px] font-semibold tracking-[0.5px] text-text">
          {label}
        </label>
        <textarea
          ref={ref}
          className={cn(
            "w-full bg-white px-4 py-3 min-h-[140px] resize-y",
            "font-[family-name:var(--font-body)] text-[14px] text-text",
            "border border-border",
            "placeholder:text-[#9A9590]",
            "transition-colors duration-200",
            "focus:outline-none focus:border-gold focus:border-2",
            "disabled:bg-border-light disabled:text-text-secondary disabled:cursor-not-allowed",
            error && "border-red-600 border-2",
          )}
          {...props}
        />
        {error && (
          <p className="font-[family-name:var(--font-body)] text-[12px] text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);

FormTextarea.displayName = "FormTextarea";
