// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        project: true,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unsafe-assignment": 'off',
      "@typescript-eslint/no-unsafe-member-access": 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      "@typescript-eslint/no-unsafe-call": "off",
      'semi': ['error', 'never'],
      'curly': ['error', 'all'],
      'max-len': ['error', {
        'code': 120,
        'ignoreComments': true,
        'ignorePattern': '^ *(declare|import|export|const)',
        'ignoreRegExpLiterals': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreTrailingComments': true,
        'ignoreUrls': true,
       }],
       'quotes': ['error', 'single'],
       'prettier/prettier': ['error',
        {
          'singleQuote': true,
          'semi': false,
          'trailingComma': 'all',
          'bracketSpacing': true,
          'printWidth': 140,
          'endOfLine': 'auto',
          'tabWidth': 4,
        }
      ],
    },
  },
);