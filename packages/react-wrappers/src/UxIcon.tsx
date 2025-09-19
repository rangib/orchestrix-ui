import React, { useEffect, useRef, forwardRef } from 'react';

export interface UxIconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

export const UxIcon = forwardRef<HTMLElement, UxIconProps>(
  ({ name, size = 'md', color = 'currentColor', className, ...props }, ref) => {
    const elementRef = useRef<any>(null);

    useEffect(() => {
      // Ensure Stencil components are loaded
      const script = document.createElement('script');
      script.src = '/orchestrix-components/orchestrix-components.js';
      script.type = 'module';
      if (!document.head.querySelector('script[src*="orchestrix-components"]')) {
        document.head.appendChild(script);
      }
    }, []);

    return React.createElement('ux-icon', {
      ref: elementRef,
      name,
      size,
      color,
      class: className,
      ...props,
    });
  }
);

UxIcon.displayName = 'UxIcon';