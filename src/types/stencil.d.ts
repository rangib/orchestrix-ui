// Type declarations for Stencil web components
declare namespace JSX {
  interface IntrinsicElements {
    'ux-button': {
      variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
      size?: 'sm' | 'md' | 'lg';
      disabled?: boolean;
      loading?: boolean;
      children?: React.ReactNode;
    };
    'ux-input': {
      type?: 'text' | 'email' | 'password' | 'number';
      placeholder?: string;
      value?: string;
      label?: string;
      disabled?: boolean;
      required?: boolean;
      children?: React.ReactNode;
    };
    'ux-icon': {
      name: string;
      size?: 'sm' | 'md' | 'lg' | 'xl';
      color?: string;
      children?: React.ReactNode;
    };
    'ux-card': {
      variant?: 'default' | 'elevated' | 'outlined';
      padding?: 'sm' | 'md' | 'lg';
      children?: React.ReactNode;
    };
  }
}