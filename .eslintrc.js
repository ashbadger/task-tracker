module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [ 
      "airbnb",
    ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "plugins": [
    "react"
    ],
    "rules": {
      "no-unused-vars": [
        "error",
        {
          "vars": "local",
          "args": "none",
        }
      ],
      "react/jsx-filename-extension": 0,
      "no-unused-expressions": [
        "error",
        {
          "allowTaggedTemplates": true
        },
      ]
    }
};
