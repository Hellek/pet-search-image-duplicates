module.exports = {
  env: {
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'import',
    '@typescript-eslint',
  ],
  extends: [
    'eslint-config-airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    indent: 'warn',
    'comma-dangle': 'warn',
    'linebreak-style': ['error', 'unix'],
    quotes: 'warn',
    semi: ['warn', 'never'],
    'no-multiple-empty-lines': ['warn', {
      max: 1,
      maxBOF: 0,
    }],
    'space-in-parens': 'warn',
    'no-multi-spaces': 'warn',
    'comma-spacing': 'warn',
    'key-spacing': 'warn',
    'no-trailing-spaces': 'warn',
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true,
    }],
    'arrow-parens': [
      'warn',
      'as-needed',
    ],
    'array-bracket-spacing': 'warn',
    'object-curly-newline': 'warn',
    'object-curly-spacing': 'warn',
    'import/extensions': [ // https://www.npmjs.com/package/eslint-plugin-import
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
      { blankLine: 'any', prev: '*', next: ['if', 'for', 'return'] },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'throw',
          'try',
          'while',
          'do',
          'switch',
          'function',
          'multiline-const',
        ],
      },
      { blankLine: 'always', prev: 'multiline-const', next: '*' },
    ],
  },
}
