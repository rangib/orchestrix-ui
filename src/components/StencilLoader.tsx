'use client';

import { useEffect } from 'react';
import { isFeatureEnabled } from '@/lib/feature-flags';

export function StencilLoader({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (isFeatureEnabled('USE_STENCIL_COMPONENTS')) {
      // Load Stencil components using modern ES module pattern
      const moduleScript = document.createElement('script');
      moduleScript.src = '/orchestrix-components/orchestrix-components.esm.js';
      moduleScript.type = 'module';
      
      const noModuleScript = document.createElement('script');
      noModuleScript.src = '/orchestrix-components/orchestrix-components.js';
      noModuleScript.setAttribute('nomodule', '');
      
      if (!document.head.querySelector('script[src*="orchestrix-components"]')) {
        document.head.appendChild(moduleScript);
        document.head.appendChild(noModuleScript);
        console.log('🚀 Stencil components loaded');
      }
    }
  }, []);

  return <>{children}</>;
}