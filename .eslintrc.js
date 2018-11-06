module.exports = {
  "env": {
    "browser": true,
  },
  "extends": [ 
      "airbnb",
    ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 8,
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
