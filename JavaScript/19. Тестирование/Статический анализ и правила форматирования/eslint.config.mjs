import js from '@eslint/js';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    plugins:{
      prettier:prettierPlugin
    }
  },
  {
    ignores:['node_modules', 'dist', '.prettierrc.js']
  },
  js.configs.recommended,
  {
    languageOptions:{
      globals :{
        ...globals.browser,
        ...globals.es2015
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
  }

]
