import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.js',
  output: [{
    format: 'iife',
    file: 'dist/myui.js',
    name: 'myui',
    globals: {
      vue: 'Vue'
    },
    preferConst: true,
    exports: 'named'
  }, {
    format: 'esm',
    file: 'dist/myui.esm.js',
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
