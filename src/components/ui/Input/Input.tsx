import clsx from "clsx";
import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, ...props }, ref) => {
    return (
      <input
        className={clsx(
          "outline-none p-[6px_12px] border border-primary-500 color-text bg-[color-mix(in_srgb,var(--color-bg)_95%,var(--color-primary-500))]",
          className,
        )}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    );
  },
);
