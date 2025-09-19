import React, { useEffect, useRef } from 'react';

type Props = React.HTMLAttributes<HTMLElement> & {
  variant?: 'primary' | 'secondary';
};

export const UxButton: React.FC<Props> = ({ children, variant = 'primary', ...rest }) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current as any;
    if (el) el.setAttribute('variant', variant);
  }, [variant]);

  return React.createElement('ux-button', { ref, ...rest }, children);
};
