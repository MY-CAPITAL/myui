export default {
  input: 'src/utils.js',
  output: [{
    format: 'iife',
    file: 'dist/utils.js',
    name: 'utils',
    exports: 'named',
    strict: false
  }, {
    format: 'esm',
    file: 'dist/utils.esm.js',
    preferConst: true
  }, {
    format: 'cjs',
    file: 'dist/utils.common.js',
    preferConst: true,
    exports: 'named'
  }]
}
