// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'semi': ['error', 'never'],
      'indent': ['error', 4],
      'curly': ['error', 'all'],
      'max-len': ['error', {
        'code': 120,
        'ignoreComments': true,
        // При объявлении функций - деклатация типа может быть очень длинной, а линтер очень плохо работает с переносами внутри дженериков
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