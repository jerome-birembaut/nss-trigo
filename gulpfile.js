// Load plugins
var gulp = require('gulp'),
    fs = require('fs'),
    es = require('event-stream'),
    del = require('del'),
    dateformat = require('dateformat'),

    plumber = require('gulp-plumber'),
    sass = require('gulp-compass'),
    minifycss = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    replace = require('gulp-replace');

var pkg = require('./package.json');

//error notification settings for plumber
var plumberErrorHandler = {
    errorHandler: function () {
        this.emit('end');
    }
};

var config = {
    src_dir: "src/",
    dst_dir: "dist/",
    js: [
        "src/js/Rectangle.js",
        "src/js/Vector2D.js",
        "src/js/Line.js",
        "src/js/Triangle.js",
        "src/js/NSSTrigo.js"
    ],
    css: []
};

//--------------------------------------------------------
//
// METHODS
//
//--------------------------------------------------------
var tools = {};
/**
 * Method to copy files to another folder
 * @param src
 * @param dest
 * @returns {*}
 */
tools.copy = function (src, dest) {
    return gulp.src(src)
        .pipe(gulp.dest(dest));
};

tools.jsBuild = function () {
    var javascriptStream = gulp.src(config.js)
        .pipe(plumber(plumberErrorHandler))
        .pipe(concat('nss-trigo' + '.js'))
        .pipe(gulp.dest(config.dst_dir ))
        .pipe(uglify({mangle: false}))
        .pipe(concat('nss-trigo' + '.min' + '.js'))
        .pipe(gulp.dest(config.dst_dir ));
    return javascriptStream;
};

//
// CSS
//
tools.cssBuild = function () {
    var appFiles = gulp.src(config.src_dir + "**/*.scss")
        .pipe(plumber(plumberErrorHandler))
        .pipe(sass({
            style: "nested",
            css: config.dst_dir,
            sass: config.src_dir,
            require: []
        }).on('error', function () {
            this.emit('end');
        }));

    var vendorsFiles = gulp.src(config.css);

    var css = es.merge(appFiles, vendorsFiles)
        .pipe(concat('nss-trigo.css'))
        .pipe(gulp.dest(config.dst_dir+'css/'))
        .pipe(minifycss())
        .pipe(concat('nss-trigo.min.css'))
        .pipe(gulp.dest(config.dst_dir+'css/'));

    return css;
};

//--------------------------------------------------------
//
// TASKS
//
//--------------------------------------------------------
gulp.task('css', function () {
    return tools.cssBuild();
});

gulp.task('js', function () {
    return tools.jsBuild();
});

gulp.task('clean', function (cb) {
    return del([config.dst_dir], cb)
});

gulp.task('watch', function () {
    gulp.watch(config.src_dir + "css/*.scss", ['css']);
    gulp.watch(config.src_dir + 'js/*.js', ['js']);
});

// Default task
gulp.task('dev', ['clean'], function () {
    return gulp.start('css', 'js');
});

gulp.task('default', ['dev'], function () {
    return gulp.start('watch');
});