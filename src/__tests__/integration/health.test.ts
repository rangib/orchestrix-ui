import { describe, it, expect } from 'vitest'

describe('integration: health endpoint', () => {
  it('returns ok status from mocked endpoint', async () => {
    const res = await fetch('http://localhost:3000/api/health')
    const json = await res.json()
    expect(res.status).toBe(200)
    expect(json.status).toBe('ok')
  })
})
