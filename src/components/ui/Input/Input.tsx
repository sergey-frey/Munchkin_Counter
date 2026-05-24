import clsx from "clsx";
import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, ...props }, ref) => {
    return (
      <input
        className={clsx("input", className)}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    );
  },
);
