const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { babel } = require('@rollup/plugin-babel')
const json = require('@rollup/plugin-json')
const alias = require('@rollup/plugin-alias')
const postcss = require('@homegrown/rollup-plugin-postcss-modules').default
const autoprefixer = require('autoprefixer')
const image = require('@rollup/plugin-image')
const svg = require('rollup-plugin-svg-to-symbol')
const path = require('path')
const { defineConfig } = require('rollup')

const extensions = ['.js', '.jsx', '.ts', '.tsx']
const projectRootDir = path.resolve(__dirname)
module.exports = defineConfig({
  plugins: [
    commonjs(),
    nodeResolve({
      extensions
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions
    }),
    json(),
    alias({
      entries: [
        {
          find: '@',
          replacement: path.resolve(projectRootDir, 'src')
        }
      ]
    }),
    image({
      // https://www.npmjs.com/package/@rollup/plugin-url
      limit: Infinity, // Default: base64 inline, enable extract image file by set a number;
      destDir: 'deploy', // Specify the local directory to settle extracted image files
      publicPath: 'https://cdn.com/assets/', // Specify the server path
      exclude: 'src/svg/**/*.svg'
    }),
    svg({
      extractId({ name }) {
        return `icon-${name}`
      },
      include: 'src/svg/**/*.svg'
    }),
    postcss({
      plugins: [autoprefixer()],
      writeDefinitions: false
    })
  ]
})
