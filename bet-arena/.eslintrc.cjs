module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier', // Prettier kurallarıyla çakışan ESLint kurallarını kapatır. EN SONA EKLENMELİ.
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  settings: {
    react: {
      version: 'detect', // Yüklü React versiyonunu otomatik algılar.
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // Modern React'te (Vite ile) 'import React' zorunlu değil.
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_' }
    ], // Kullanılmayan değişkenler için uyarı ver.
  },
}