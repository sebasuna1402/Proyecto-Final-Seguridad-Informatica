import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['*.js'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2021,
      globals: { ...globals.node, ...globals.mocha },
    },
    rules: {
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'linebreak-style': 'off',
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'no-console': 'off',
      'comma-spacing': ['error', {          
        before: false,
        after: true,
      }],
      'arrow-spacing': ['error', {          
        before: true,
        after: true,
      }],
      'no-unused-vars': ['warn'],
      'no-undef': 'off',  // Desactiva no-undef para variables de Node.js
    },
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2021,
      globals: { ...globals.node },
    },
  },
  {
    files: ['test/*.js'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2021,
      globals: { ...globals.node, ...globals.mocha },
    },
    rules: {
      'no-undef': 'off',
    },
  },
  {
    files: ['unalib/dashboard.js'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2021,
      globals: { ...globals.node },
    },
    rules: {
      'no-undef': 'off',
      'no-unsafe-finally': 'off', // Desactiva `no-unsafe-finally` en dashboard.js
    },
  },
  pluginJs.configs.recommended,
];
