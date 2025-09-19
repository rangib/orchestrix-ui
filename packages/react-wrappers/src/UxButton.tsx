import React, { useEffect, useRef, forwardRef } from 'react';

export interface UxButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const UxButton = forwardRef<HTMLElement, UxButtonProps>(
  ({ variant = 'primary', size = 'md', disabled = false, loading = false, onClick, children, className, ...props }, ref) => {
    const elementRef = useRef<any>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (element && onClick) {
        const handleClick = () => onClick();
        element.addEventListener('buttonClick', handleClick);
        return () => element.removeEventListener('buttonClick', handleClick);
      }
    }, [onClick]);

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
      'ux-button',
      {
        ref: elementRef,
        variant,
        size,
        disabled,
        loading,
        class: className,
        ...props,
      },
      children
    );
  }
);

UxButton.displayName = 'UxButton';