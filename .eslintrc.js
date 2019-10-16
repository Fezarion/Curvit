module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    "indent": ["error", 4],
    "linebreak-style": ["error", "windows"],
    "quotes": [2, "double", {
      "avoidEscape": true
    }],
    "comma-dangle": ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    "object-curly-spacing": ["error", "always"],
    "max-len": ["error", { "ignoreStrings": true, "ignoreComments": true }],
    "valid-jsdoc": ["off"]
  }
};