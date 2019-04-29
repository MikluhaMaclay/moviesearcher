const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
  devtool: 'inline-source-map',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './build',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            options: {
              emitWarning: true
            },
            loader: 'eslint-loader'
          }
        ],
      },

      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
