import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.ts'],
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
      exclude: [
        'commitlint.config.mjs',
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
        '**/*/index.ts',
        'vitest.config.mts',
        'tsup.config.ts',
      ],
    },
  },
})
