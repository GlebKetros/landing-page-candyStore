const {src, dest, series, parallel, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const browserSync = require('browser-sync').create()
const del = require('del')
const imagemin = require('gulp-imagemin')
const autoprefixer = require('gulp-autoprefixer');

function html() {
    return src('./src/**/*.html')
        .pipe(dest('./dist'))
        .pipe(browserSync.stream())
}

function scss() {
    return src('src/scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
          }))
        .pipe(dest('./dist/css'))
        .pipe(browserSync.stream())
}

function script() {
    return src('./src/js/**/*.js')
        .pipe(dest('./dist/js'))
        .pipe(browserSync.stream())
}

function images() {
    return src('./src/images/**/**.*')
        .pipe(imagemin())
        .pipe(dest('./dist/images'))     
}

function watcher() {
    watch('./src/**/*.html', html)
    watch('src/scss/*.scss', scss)
    watch('src/images', images)
    watch('src/js/**.js', script)   
}

function server() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    })
}

function clear() {
    return del('./dist')
}




exports.default = series(
    clear,
    parallel(html, scss, script, images),
    parallel(watcher, server)
)