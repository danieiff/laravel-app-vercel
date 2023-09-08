module.exports = {
	env: { esnext: true, node: true },
	extends: [
		// add more generic rulesets here, such as:
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	root: true,
	rules: {
		// override/add rules settings here, such as:
		// 'vue/no-unused-vars': 'error'
	},
	ignorePatterns: ['/node_modules/', '/dist/']
}

