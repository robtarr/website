'use strict';

const url = require('./src/js/url');

const domain = url.domain();
const protocol = url.protocol();

module.exports = {
  entry: ['./src/index.jsx', './src/js/animator.js', './src/js/robtarr.js'],
  output: {
    filename: 'bundle.js',
    path: './assets',
    publicPath: protocol + '//' + domain + '/assets',
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'jsx-loader?insertPragma=React.DOM&harmony',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  node: {
    fs: 'empty',
  },
}
