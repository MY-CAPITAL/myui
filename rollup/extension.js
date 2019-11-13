import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/extension.js',
  output: [{
    format: 'iife',
    file: 'dist/myui.extension.js',
    name: 'myuiEx',
    globals: {
      vue: 'Vue'
    },
    preferConst: true,
    exports: 'named'
  }, {
    format: 'esm',
    file: 'dist/myui.extension.esm.js',
    globals: {
      vue: 'Vue'
    },
    preferConst: true,
    exports: 'named'
  }],
  external: ['vue'],
  plugins: [
    commonjs(),
    vue({
      template: {
        isProduction: true
      }
    })
  ]
}

