import js from '@eslint/js';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginJest from 'eslint-plugin-jest';

export default [
  {
    plugins:{
      prettier:prettierPlugin
    }
  },
  {
    ignores:['node_modules', 'dist',]
  },
  js.configs.recommended,
  {
    languageOptions:{
      globals :{
        ...globals.browser,
        ...globals.es2021
      }
    }
  },
  {
    files:['**/*.js'],
    rules:{
      ...eslintConfigPrettier.rules,
      'prettier/prettier': 'error', 
      'no-var': 'error',
      'no-unused-vars': 'error',
      'no-undef': 'off',
      'no-console': 'off',
    }
  },
  {
    // update this to match your test files
    files: ['**/*.spec.js', '**/*.test.js'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },

]
