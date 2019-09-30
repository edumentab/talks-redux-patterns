module.exports = {
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'prettier',
    'react',
    'react-hooks',
    'local'
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/prop-types': 0,
    'local/jsx-no-length-truthiness': 'error',
    'local/use-dispatch-with-sender': 'error'
  },
  extends: ['plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
