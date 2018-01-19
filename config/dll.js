const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'axios', 'redux', 'react-redux', 'react-router', 'jquery', 'dom-to-image', 'moment', 'classnames', 'prop-types', 'lodash'] // 这里是哪些module需要抽出来
  },
  output: {
    path: path.join(__dirname, 'dllbundle/'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
};