import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, options, placeholder, className, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <label className="font-[family-name:var(--font-body)] text-[13px] font-semibold tracking-[0.5px] text-text">
          {label}
        </label>
        <select
          ref={ref}
          className={cn(
            "h-12 w-full bg-white px-4 appearance-none",
            "font-[family-name:var(--font-body)] text-[14px] text-text",
            "border border-border",
            "transition-colors duration-200",
            "focus:outline-none focus:border-gold focus:border-2",
            "disabled:bg-border-light disabled:text-text-secondary disabled:cursor-not-allowed",
            error && "border-red-600 border-2",
            "bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%234A4A4A%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:20px]",
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="font-[family-name:var(--font-body)] text-[12px] text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);

FormSelect.displayName = "FormSelect";
