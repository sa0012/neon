// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = (ctx) => ({
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    'postcss-pxtorem': ctx.env !== 'production' ? {
      // If you modify rootValue, you also need to modify rem in static/responsive.js
      rootValue: 100, // 1rem=100px
      propWhiteList: []
    } : false
  }
})
