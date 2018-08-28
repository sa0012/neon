'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'
const BUILD_TYPE = process.env.BUILD_TYPE

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')

let webpackConfig = null

if (BUILD_TYPE === 'demo') {
  webpackConfig = require('./webpack.demo.conf')
} else if (BUILD_TYPE === 'libdev') {
  webpackConfig = require('./webpack.lib.dev.conf')
} else if (BUILD_TYPE === 'libprod') {
  webpackConfig = require('./webpack.lib.prod.conf')
} else if (BUILD_TYPE === 'src') {
  webpackConfig = require('./webpack.src.conf')
}


const spinner = ora(`building for ${BUILD_TYPE}...`)
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
