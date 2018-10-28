const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/dist/',
          },
        },
      ],
    },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.EnvironmentPlugin(
      [
        'FIREBASE_API_KEY',
        'FIREBASE_AUTH_DOMAIN',
        'FIREBASE_DATABASE_URL',
        'FIREBASE_PROJECT_ID',
        'FIREBASE_STORAGE_BUCKET',
        'FIREBASE_MESSAGING_SENDER_ID',
      ],
    ),
  ],
};
