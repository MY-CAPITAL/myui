const {src, dest, watch} = require('gulp')
const less = require('gulp-less')

function css(cb) {
  src([
    'src/less/myui.less',
    'src/less/myui.extension.less'
  ])
    .pipe(less({
      strictMath: 'on'
    }))
    .pipe(dest('doc/css'))

  cb()
}

exports.default = function () {
  watch('src/less/**/*', css)
}
