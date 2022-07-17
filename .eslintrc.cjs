module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "svelte3",
    "@typescript-eslint"
  ],
  "overrides": [
    {
      "files": ['*.svelte'],
      "processor": "svelte3/svelte3",
    }
  ],
  "settings": {
    'svelte3/typescript': () => require('typescript'),
  },
  "rules": {
    '@typescript-eslint/no-explicit-any': ['off'],
  }
}
