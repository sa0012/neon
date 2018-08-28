'use strict'
const path = require('path')
const fs = require('fs')
const utils = require('./utils')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function getComponentsEntrys() {
  let componentsEntrys = {}

  const basePath = path.join(__dirname, '../src/components')
  // 得到组件名组成的list
  const componentNameList = fs.readdirSync(basePath)
  if (componentNameList) {
    componentNameList.forEach(name => {
      const componentPath = path.join(basePath, name)
      // 排除非文件夹的内容
      if (fs.statSync(componentPath).isDirectory()) {
        componentsEntrys[name] = componentPath
      }
    })
  }

  return componentsEntrys
}

delete baseWebpackConfig.entry
delete baseWebpackConfig.output

const webpackConfig = merge(baseWebpackConfig, {
  entry: getComponentsEntrys(),
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: false,
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: utils.assetsPath('../[name]/index.js'),
    library: 'neon',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('../[name]/style/index.css')),
    new ExtractTextPlugin(utils.assetsPath('../[name]/style.css'))
  ]
})

module.exports = webpackConfig
