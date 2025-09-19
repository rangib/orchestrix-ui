import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'orchestrix-components',
  outputTargets: [
    {
      type: 'dist',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
