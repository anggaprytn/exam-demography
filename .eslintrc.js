module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'react-native/no-inline-styles': 1,
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'prettier/prettier': 'error',
      },
    },
  ],
};
