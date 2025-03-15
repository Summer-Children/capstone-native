import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier/recommended'

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/consistent-type-definitions': 'off',
            '@typescript-eslint/consistent-type-assertions': 'off',
            '@typescript-eslint/prefer-function-type': 'off',
            '@typescript-eslint/prefer-readonly': 'error',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-redundant-type-constituents': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/explicit-member-accessibility': 'error',
            '@typescript-eslint/no-misused-promises': 'off',
            'no-async-promise-executor': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/restrict-template-expressions': [
                'error',
                {
                    allowNumber: true,
                    allowBoolean: true,
                    allowAny: false,
                    allowNullish: true,
                    allowRegExp: false,
                    allowArray: true
                }
            ]
        }
    },
    {
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        }
    },
    {
        files: ['**/*.js'],
        ...tseslint.configs.disableTypeChecked
    },
    prettier
]
