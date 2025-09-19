import React, { useEffect, useRef, forwardRef } from 'react';

export interface UxInputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}

export const UxInput = forwardRef<HTMLElement, UxInputProps>(
  ({ 
    type = 'text', 
    placeholder = '', 
    value = '', 
    label = '', 
    disabled = false, 
    required = false, 
    onChange, 
    onFocus, 
    onBlur, 
    className, 
    ...props 
  }, ref) => {
    const elementRef = useRef<any>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (element) {
        const handleChange = (e: CustomEvent<string>) => onChange?.(e.detail);
        const handleFocus = () => onFocus?.();
        const handleBlur = () => onBlur?.();

        if (onChange) element.addEventListener('inputChange', handleChange);
        if (onFocus) element.addEventListener('inputFocus', handleFocus);
        if (onBlur) element.addEventListener('inputBlur', handleBlur);

        return () => {
          if (onChange) element.removeEventListener('inputChange', handleChange);
          if (onFocus) element.removeEventListener('inputFocus', handleFocus);
          if (onBlur) element.removeEventListener('inputBlur', handleBlur);
        };
      }
    }, [onChange, onFocus, onBlur]);

    useEffect(() => {
      // Ensure Stencil components are loaded
      const script = document.createElement('script');
      script.src = '/orchestrix-components/orchestrix-components.js';
      script.type = 'module';
      if (!document.head.querySelector('script[src*="orchestrix-components"]')) {
        document.head.appendChild(script);
      }
    }, []);

    return React.createElement('ux-input', {
      ref: elementRef,
      type,
      placeholder,
      value,
      label,
      disabled,
      required,
      class: className,
      ...props,
    });
  }
);

UxInput.displayName = 'UxInput';