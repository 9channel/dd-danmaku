const postcss = require('@homegrown/rollup-plugin-postcss-modules').default
exports.default = {
  plugins: [
    postcss({
      writeDefinitions: true
    })
  ]
}
