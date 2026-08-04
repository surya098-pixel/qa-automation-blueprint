// ESLint v9+ flat config
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default [
  {
    ignores: [
      'node_modules/',
      'playwright-report/',
      'test-results/',
      'allure-results/',
      'allure-report/',
    ],
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    plugins: { playwright },
    rules: {
      ...playwright.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'playwright/expect-expect': 'off',
    },
  },
];
