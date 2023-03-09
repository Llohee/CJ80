module.exports ={
	"env": {
    "es6": true,
    "node": true
	},
	"extends": [
    "eslint:recommended"
  ],
  "plugins": [],
  "parser": "@babel/eslint-parser",
	"parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "allowImportExportEverywhere": true
	},
	"rules": {
    "no-console": 1,
    "no-unused-vars": 1,
    "no-trailing-spaces": 1,
    "no-multi-spaces": 1,
    "no-multiple-empty-lines": 1,
    "space-before-blocks": ["error", "always"],
    "object-curly-spacing": [1, "always"],
		"indent": ["warn", 2],
    "linebreak-style": 0,
    "semi": [1, "never"],
		"quotes": ["error", "single"],
    "no-unexpected-multiline": "warn",
    "keyword-spacing": 1,
    "comma-dangle": 1,
    "comma-spacing": 1,
    "arrow-spacing": 1
	}
}