'use client';

import { useEffect } from 'react';
import { isFeatureEnabled } from '@/lib/feature-flags';

export function StencilLoader({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (isFeatureEnabled('USE_STENCIL_COMPONENTS')) {
      // Load Stencil components script
      const script = document.createElement('script');
      script.src = '/orchestrix-components/orchestrix-components.js';
      script.type = 'module';
      
      if (!document.head.querySelector('script[src*="orchestrix-components"]')) {
        document.head.appendChild(script);
        console.log('🚀 Stencil components loaded');
      }
    }
  }, []);

  return <>{children}</>;
}