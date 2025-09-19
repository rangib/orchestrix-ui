"use client";
import * as React from "react";
import { isFeatureEnabled } from "@/lib/feature-flags";
import { UxInput } from "@/components/stencil-components";
import { cn } from "@/ui/lib";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onChange, onFocus, onBlur, ...props }, ref) => {
    // Use Stencil components when feature flag is enabled
    if (isFeatureEnabled('USE_STENCIL_COMPONENTS')) {
      // Convert React onChange to Stencil onChange format
      const handleChange = onChange ? (value: string) => {
        const syntheticEvent = {
          target: { value },
          currentTarget: { value }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      } : undefined;

      return (
        <UxInput
          type={type as any}
          onChange={handleChange}
          onFocus={onFocus as () => void}
          onBlur={onBlur as () => void}
          className={className}
          {...props}
        />
      );
    }

    // Fallback to original React component
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };