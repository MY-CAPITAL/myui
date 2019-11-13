import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import myuiConfig from './rollup/myui'
import extensionConfig from './rollup/extension'
import utilsConfig from './rollup/utils'

const production = process.env.production

if (!production) {
  myuiConfig.plugins.push(serve('doc'))
  myuiConfig.plugins.push(livereload({
    watch: 'doc',
    delay: 100,
    port: 35730
  }))
  myuiConfig.output = {
    format: 'iife',
    file: 'doc/js/myui.js',
    name: 'myui',
    globals: {
      vue: 'Vue'
    },
    preferConst: true,
    exports: 'named'
  }

  extensionConfig.output = {
    format: 'iife',
    file: 'doc/js/myui.extension.js',
    name: 'myuiEx',
    globals: {
      vue: 'Vue'
    },
    preferConst: true,
    exports: 'named'
  }
}

export default production ? [myuiConfig, extensionConfig, utilsConfig] : [myuiConfig, extensionConfig]

