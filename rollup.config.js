// rollup.config.js
import { defineConfig } from 'rollup'
import userScriptHeader from 'rollup-plugin-tampermonkey-header'
import path from 'path'
import fs from 'fs'

const userDefinedOptions = {
  metaPath: path.resolve(__dirname, 'src', 'meta.json')
}

const isObject = (arg) => {
  return Object.prototype.toString.call(arg) === '[object Object]'
}
const mergeRollupConfigs = function (object, ...sources) {
  sources.forEach((source) => {
    if (!isObject(source)) {
      return
    }
    Object.entries(source).forEach(([name, value]) => {
      if (name in object) {
        if (value === null || value === undefined) {
          return
        }
        const objectValue = object[name]
        if (Array.isArray(objectValue)) {
          if (name === 'plugins') {
            const pluginNames = objectValue.map((plugin) => plugin.name)
            value.forEach((plugin) => {
              const index = pluginNames.indexOf(plugin.name)
              if (index > -1) {
                Object.assign(objectValue[index], plugin)
              } else {
                objectValue.push(plugin)
              }
            })
          } else {
            object[name] = Array.from(
              new Set([
                ...objectValue,
                ...(typeof value === 'object' ? Object.values(value) : [value])
              ])
            )
          }
        } else if (isObject(objectValue)) {
          Object.assign(object[name], value)
        } else {
          object[name] = value
        }
      } else {
        object[name] = value
      }
    })
  })
  return object
}

const commonConfigs = require('./rollup_configs/default.js')
const rollupConfigsPath = require('path').join(__dirname, 'rollup_configs')
try {
  const files = fs.readdirSync(rollupConfigsPath)
  files.forEach(function (file) {
    if (file === 'default.js') return
    const configs = require('./rollup_configs/' + file).default
    mergeRollupConfigs(commonConfigs, configs)
  })
} catch (err) {
  console.log(err)
}

function devConfigs() {
  let userScriptHeaderContent = []
  const outputFileName = 'main.dev.user'
  const outputFile = `${outputFileName}.js`
  return defineConfig({
    input: { [outputFileName]: 'src/index.ts' },
    output: {
      dir: 'dist',
      format: 'iife',
      sourcemap: 'inline'
    },
    watch: {
      exclude: 'dist'
    },
    plugins: [
      ...commonConfigs.plugins,
      userScriptHeader({
        metaPath: userDefinedOptions.metaPath,
        transformHeaderContent(items) {
          const newItems = items
            .filter(([name]) => !['@supportURL', '@updateURL', '@downloadURL'].includes(name))
            .map(([name, value]) => {
              if (name === '@name') {
                return [name, `${value} Dev`]
              } else {
                return [name, value]
              }
            })
          userScriptHeaderContent = [...newItems]
          return newItems
        },
        outputFile
      }),
      devEntryPlugin(outputFile)
    ]
  })

  function devEntryPlugin(outputFileName) {
    let headerPluginApi
    let devFileContentCache = ''
    return {
      name: 'generate-dev-entry',
      buildStart(options) {
        const { plugins } = options
        const pluginName = 'tampermonkey-header'
        const headerPlugin = plugins.find((plugin) => plugin.name === 'tampermonkey-header')
        if (!headerPlugin) {
          // or handle this silently if it is optional
          throw new Error(`This plugin depends on the "${pluginName}" plugin.`)
        }
        // now you can access the API methods in subsequent hooks
        headerPluginApi = headerPlugin.api
      },
      generateBundle(options) {
        const { dir } = options
        const filePath = path.resolve(__dirname, dir, outputFileName)
        userScriptHeaderContent.push(['@require', filePath])
        const devFileName = 'dev.user.js'
        const devFilePath = path.resolve(__dirname, dir, devFileName)
        const devFileContent =
          headerPluginApi?.generateUserScriptHeader(userScriptHeaderContent) ?? ''

        if (devFileContentCache !== devFileContent) {
          this.emitFile({
            type: 'asset',
            fileName: devFileName,
            source: devFileContent
          })

          if (!devFileContentCache) {
            console.log(
              '\n✅Dev plugin is created. Please paste the path to browser and install in Tampermonkey: \n\x1b[1m\x1b[4m\x1b[36m%s\x1b[0m\n',
              devFilePath
            )
          } else {
            console.log(
              '\n🔥Dev plugin need re-install. Please paste the path to browser and reinstall in Tampermonkey: \n\x1b[1m\x1b[4m\x1b[36m%s\x1b[0m\n',
              devFilePath
            )
          }

          devFileContentCache = devFileContent
        }
      }
    }
  }
}

function prodConfigs() {
  const outputFile = 'dist/ddd.user.js'
  return defineConfig({
    input: 'src/index.ts',
    output: {
      file: outputFile,
      format: 'iife'
    },
    plugins: [
      ...commonConfigs.plugins,
      userScriptHeader({
        metaPath: userDefinedOptions.metaPath,
        outputFile
      })
    ]
  })
}

const isDev = process.env.BUILD === 'development'
export default isDev ? devConfigs() : prodConfigs()
