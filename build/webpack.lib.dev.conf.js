const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')

delete baseWebpackConfig.entry
delete baseWebpackConfig.output

module.exports = merge(baseWebpackConfig, {
  entry: {
    'neon': path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    library: 'neon',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './style.css',
      disable: false,
      allChunks: true
    })
    // ,
    // new UglifyJsPlugin({
    //   parallel: true,
    //   sourceMap: true
    // }),
    // new CompressionPlugin({
    //   asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.(js|css)$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // })
  ]
})