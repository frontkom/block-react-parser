export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'package-lock.json']
  },
  {
    files: ['src/**/*.js', 'src/**/*.jsx', 'test/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        test: 'readonly',
        assert: 'readonly',
        React: 'readonly'
      }
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react/no-array-index-key': 'off'
    }
  }
];
