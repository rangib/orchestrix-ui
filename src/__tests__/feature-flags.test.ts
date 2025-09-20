import { beforeEach, describe, expect, it } from 'vitest'

describe('feature-flags', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    process.env = { ...OLD_ENV }
    delete require.cache[require.resolve('@/lib/feature-flags')]
  })

  it('parses USE_STENCIL_COMPONENTS true', async () => {
    process.env.USE_STENCIL_COMPONENTS = 'true'
    const { isFeatureEnabled } = await import('@/lib/feature-flags')
    expect(isFeatureEnabled('USE_STENCIL_COMPONENTS')).toBe(true)
  })

  it('parses USE_STENCIL_COMPONENTS false', async () => {
    process.env.USE_STENCIL_COMPONENTS = 'false'
    const { isFeatureEnabled } = await import('@/lib/feature-flags')
    expect(isFeatureEnabled('USE_STENCIL_COMPONENTS')).toBe(false)
  })

  it('returns false if env missing', async () => {
    delete process.env.USE_STENCIL_COMPONENTS
    const { isFeatureEnabled } = await import('@/lib/feature-flags')
    expect(isFeatureEnabled('USE_STENCIL_COMPONENTS')).toBe(false)
  })
})
