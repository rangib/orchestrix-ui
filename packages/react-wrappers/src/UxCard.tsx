import React, { useEffect, useRef, forwardRef } from 'react';

export interface UxCardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const UxCard = forwardRef<HTMLElement, UxCardProps>(
  ({ 
    variant = 'default', 
    padding = 'md', 
    children, 
    header, 
    footer, 
    className, 
    ...props 
  }, ref) => {
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

    return React.createElement(
      'ux-card',
      {
        ref: elementRef,
        variant,
        padding,
        class: className,
        ...props,
      },
      header && React.createElement('div', { slot: 'header' }, header),
      children,
      footer && React.createElement('div', { slot: 'footer' }, footer)
    );
  }
);

UxCard.displayName = 'UxCard';