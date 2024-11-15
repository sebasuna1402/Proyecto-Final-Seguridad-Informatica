import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['/.js'],
    languageOptions: {
      sourceType: 'module',
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
    },
  },
  {
    files: ['**/.mjs'],
    languageOptions: {
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },
  pluginJs.configs.recommended,
];