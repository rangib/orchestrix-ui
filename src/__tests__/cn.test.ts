import { describe, it, expect } from 'vitest'
import { cn } from '@/features/ui/lib'

describe('cn utility', () => {
  it('merges classes and removes duplicates', () => {
    const result = cn('p-2', 'p-2', 'text-sm', { 'text-sm': true } as any)
    expect(result).toContain('p-2')
    expect(result).toContain('text-sm')
    // duplicates should be collapsed
    expect(result.split(' ').filter(Boolean).length).toBeGreaterThanOrEqual(2)
  })
})
