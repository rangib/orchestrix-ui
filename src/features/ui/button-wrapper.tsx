"use client";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { isFeatureEnabled } from "@/lib/feature-flags";
import { UxButton } from "@/components/stencil-components";
import { cn } from "./lib";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const ButtonLinkVariant = cn(
  buttonVariants({ variant: "ghost" }),
  "p-0 w-full h-12 w-12 flex items-center justify-center "
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// Map React Button variants to Stencil variants
const mapVariantToStencil = (variant: string | null | undefined): 'primary' | 'secondary' | 'outline' | 'ghost' => {
  switch (variant) {
    case 'default':
      return 'primary';
    case 'destructive':
      return 'secondary';
    case 'outline':
      return 'outline';
    case 'secondary':
      return 'secondary';
    case 'ghost':
      return 'ghost';
    case 'link':
      return 'ghost';
    default:
      return 'primary';
  }
};

// Map React Button sizes to Stencil sizes
const mapSizeToStencil = (size: string | null | undefined): 'sm' | 'md' | 'lg' => {
  switch (size) {
    case 'sm':
      return 'sm';
    case 'default':
      return 'md';
    case 'lg':
      return 'lg';
    case 'icon':
      return 'sm';
    default:
      return 'md';
  }
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, disabled, onClick, children, ...props }, ref) => {
    // Use Stencil components when feature flag is enabled
    if (isFeatureEnabled('USE_STENCIL_COMPONENTS')) {
      return (
        <UxButton
          variant={mapVariantToStencil(variant)}
          size={mapSizeToStencil(size)}
          disabled={disabled}
          onClick={onClick as () => void}
          className={className}
          {...props}
        >
          {children}
        </UxButton>
      );
    }

    // Fallback to original React component
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, ButtonLinkVariant, buttonVariants };