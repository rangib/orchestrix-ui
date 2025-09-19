import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    globals: true,
    include: ['**/__tests__/**/*.test.{ts,tsx,js,jsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'cobertura', 'json-summary'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/test/**',
        '**/__tests__/**'
      ]
    },
    outputFile: {
      junit: './test-results.xml'
    },
    reporter: ['default', 'junit']
  }
})
