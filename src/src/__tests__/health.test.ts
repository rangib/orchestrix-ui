import { describe, it, expect } from 'vitest'

describe('health endpoint', () => {
  it('returns ok', async () => {
    const res = await fetch('/api/health')
    const json = await res.json()
    expect(json).toHaveProperty('status', 'ok')
  })
})
