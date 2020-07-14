"use strict";
const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const reload = browserSync.reload;

const env = process.env.NODE_ENV;

const {DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config');

sass.compiler = require('node-sass');

task( 'clean', () => {
    return src(`${DIST_PATH}/**/*`, { read: false }).pipe( rm() );
});

task("copy:html", () => {
    return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({stream: true}));
});

task("png_icons", () => {
    return src(`${SRC_PATH}/img/icons/*.png`)
    .pipe(dest(`${DIST_PATH}/img/icons`))
    .pipe(reload({stream: true}));
});

task("images", () => {
    return src(`${SRC_PATH}/img/content/*.*`)
        .pipe(dest(`${DIST_PATH}/img/content`))
        .pipe(reload({stream: true}));
});

task("video", () => {
    return src(`${SRC_PATH}/video/*.*`)
        .pipe(dest(`${DIST_PATH}/video`))
        .pipe(reload({stream: true}));
});

task("fonts", () => {
    return src(`${SRC_PATH}/fonts/*.*`)
    .pipe(dest(`${DIST_PATH}/fonts`))
    .pipe(reload({stream: true}));
});

task("styles", () => {
    return src([...STYLES_LIBS, `${SRC_PATH}/scss/main.scss`])
        .pipe(gulpif(env === "dev", sourcemaps.init()))
        .pipe(concat('main.min.scss'))
        .pipe(sassGlob({
            ignorePaths: [
                'main.scss'
            ]
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(env === "dev", autoprefixer({
            cascade: false
        })))
        .pipe(gulpif(env === "prod", gcmq()))
        .pipe(gulpif(env === "prod", cleanCSS()))
        .pipe(gulpif(env === "dev",sourcemaps.write()))
        .pipe(dest(DIST_PATH))
        .pipe(reload({stream: true}));
});


task('scripts', () => {
    return src([...JS_LIBS, `${SRC_PATH}/js/*.js`])
        .pipe(gulpif(env === "prod", sourcemaps.init()))
        .pipe(concat('main.min.js', {newLine: ";"}))
        .pipe(gulpif(env === "dev", babel({
            presets: ['@babel/env']
        })))
        .pipe(gulpif(env === "dev", uglify()))
        .pipe(gulpif(env === "dev", sourcemaps.write()))
        .pipe(dest(DIST_PATH))
        .pipe(reload({stream: true}));
});

task("icons", () => {
    return src(`${SRC_PATH}/img/icons/*.svg`)
        .pipe(svgo({
            plugins: [
                {
                    removeAttrs: {
                        attrs: "(fill|stroke|style|width|height|data.*)"
                    }
                }
            ]
        })
    ).pipe(svgSprite({
        mode: {
            symbol: {
                sprite: "../sprite.svg"
            }
        }
    }))
    .pipe(dest(`${DIST_PATH}/img/icons`));
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: `./${DIST_PATH}`
        },
        open: false
    });
});

task("watch", () => {
    watch(`./${SRC_PATH}/scss/**/*.scss`, series("styles"));
    watch(`./${SRC_PATH}/*.html`, series("copy:html"));
    watch(`./${SRC_PATH}/js/*.js`, series("scripts"));
    watch(`./${SRC_PATH}/img/icons/*.svg`, series("icons"));
    watch(`./${SRC_PATH}/img/icons/*.png`, series("png_icons"));
    watch(`./${SRC_PATH}/img/content/*.*`, series("images"));
    watch(`./${SRC_PATH}/fonts/*.*`, series("fonts"));
    watch(`./${SRC_PATH}/video/*.*`, series("video"));
});

task(
    "default",
    series(
        "clean", 
    parallel("copy:html", "styles", "scripts", 
            "icons", "png_icons",  "images",
            "fonts", "video"), 
    parallel("watch", "server")));

task(
    "build",
    series(
        "clean", 
    parallel("copy:html", "styles", "scripts", 
            "icons", "png_icons",  "images",
            "fonts", "video")));