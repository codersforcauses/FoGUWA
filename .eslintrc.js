module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true,
    jest: true,
    serviceworker: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:nuxt/base',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'vue/html-quotes': ['error', 'double'],
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 20,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ]
  }
}
