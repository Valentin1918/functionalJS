'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    './build/functionalJS.js',
  ],
  output: {
    path: path.resolve(__dirname, './build/js'),
    filename: 'functionalJS.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'env'],
            plugins: ['transform-runtime']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    host: '192.168.1.102',
    port: 7771,
    stats: 'errors-only',
    open: true,
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      favicon: 'src/images/js.ico'
    }),
  ],
  devtool: 'inline-source-map',
};
