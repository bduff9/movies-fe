module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		jest: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true,
			warnOnUnsupportedTypeScriptVersion: false,
		},
		ecmaVersion: 7,
		sourceType: 'module',
	},
	plugins: [
		'css-modules',
		'graphql',
		'import',
		'prettierx',
		'react',
		'react-hooks',
		'@typescript-eslint',
	],
	settings: {
		prettierx: {
			usePrettierrc: false,
		},
		react: {
			version: 'detect',
		},
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:css-modules/recommended',
		'plugin:import/errors',
		'plugin:import/typescript',
		'plugin:import/warnings',
		'plugin:react/recommended',
		'plugin:prettierx/@typescript-eslint',
		'plugin:prettierx/standardx',
		'plugin:prettierx/react',
		'plugin:you-dont-need-momentjs/recommended',
	],
	rules: {
		'prettierx/options': [
			2,
			{
				alignObjectProperties: false,
				jsxSingleQuote: false,
				semi: true,
				singleQuote: true,
				spaceBeforeFunctionParen: true,
				trailingComma: 'all',
				useTabs: true,
			},
		],
		'linebreak-style': 'off',
		'no-console': 'off',
		'no-constant-condition': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				varsIgnorePattern: 'UU',
				args: 'none',
			},
		],
		quotes: 'off',
		'import/named': 2,
		'import/order': [
			'error',
			{
				alphabetize: { caseInsensitive: true, order: 'asc' },
				'newlines-between': 'always',
			},
		],
		'one-var': ['error', 'never'],
		'no-var': 'error',
		'padding-line-between-statements': [
			'error',
			{
				blankLine: 'always',
				prev: '*',
				next: 'return',
			},
			{
				blankLine: 'always',
				prev: ['const', 'let', 'var'],
				next: '*',
			},
			{
				blankLine: 'any',
				prev: ['const', 'let', 'var'],
				next: ['const', 'let', 'var'],
			},
			{
				blankLine: 'always',
				prev: ['block', 'block-like', 'if'],
				next: '*',
			},
			{
				blankLine: 'always',
				prev: '*',
				next: ['block', 'block-like', 'if'],
			},
			{
				blankLine: 'any',
				prev: 'export',
				next: '*',
			},
			{
				blankLine: 'any',
				prev: '*',
				next: 'export',
			},
		],
		'react/no-danger': 'off',
		'react/no-find-dom-node': 'off',
		'react/jsx-filename-extension': [
			1,
			{
				extensions: ['.tsx', '.jsx'],
			},
		],
		'react/prop-types': [0],
		'react/boolean-prop-naming': ['error'],
		'react/jsx-curly-brace-presence': [
			'error',
			{ props: 'never', children: 'never' },
		],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'graphql/template-strings': [
			'error',
			{
				env: 'apollo',
				schemaJsonFilepath: './graphql/graphql.schema.json',
			},
		],
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/prefer-interface': 'off',
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/ban-ts-comment': 'warn',
		'@typescript-eslint/explicit-function-return-type': 'error',
		'prefer-template': 'error',
	},
};
