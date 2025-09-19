// Feature flags configuration
export const featureFlags = {
  USE_STENCIL_COMPONENTS: process.env.USE_STENCIL_COMPONENTS === 'true' || false,
  ENABLE_OTEL_TRACING: process.env.ENABLE_OTEL_TRACING === 'true' || false,
  ENABLE_APIM_ROUTING: process.env.ENABLE_APIM_ROUTING === 'true' || false,
} as const;

export type FeatureFlag = keyof typeof featureFlags;

export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return featureFlags[flag];
}