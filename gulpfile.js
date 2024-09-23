const { src, dest, watch, parallel, series } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const typograf = require('gulp-typograf');
const fileInclude = require('gulp-file-include');
const imagemin = require("gulp-imagemin");
const del = require("del");

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function htmlInclude() {
    return src('./app/*.html')
        .pipe(fileInclude({
            prefix: '@',
            basepath: '@file'
        }))
        .pipe(typograf({
            locale: ['ru', 'en-US', 'uk']
        }))
        .pipe(dest('./app'))
        .pipe(browserSync.stream());
}

function styles() {
    return src("./app/scss/main.scss")
        .pipe(scss({ outputStyle: "compressed" }))
        .pipe(concat("main.min.css"))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest("app/css"))
        .pipe(browserSync.stream())
}

function criticalStyles() {
    return src("./app/scss/critical.scss")
    .pipe(scss({outputStyle: "compressed"}))
    .pipe(concat("critical.min.css"))
     .pipe(autoprefixer({
         overrideBrowserslist: ['last 10 versions']
        //  grid: true
     }))
    .pipe(dest("app/css"))
    .pipe(browserSync.stream())
}

function stylesSecondary() {
    src([
        "node_modules/normalize.css/normalize.css"
    ])
        .pipe(concat("libs.scss"))
        .pipe(dest("app/scss"))
        .pipe(browserSync.stream())
        
    return src(['./app/scss/libs.scss'])
    .pipe(scss({ outputStyle: "compressed" }))
        .pipe(concat("libs.min.css"))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest("app/css"))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
        "app/js/main.js"
    ])
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(dest("app/js"))
        .pipe(browserSync.stream())
}

function images() {
    return src("app/images/**/*")
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest("dist/images"))
}


function build() {
    return src([
        "app/css/main.min.css",
        "app/fonts/**/*",
        "app/images/**/*",
        "app/js/main.min.js",
        "app/*.html",
    ],
        {
            base: "app"
        })
        .pipe(dest("dist"))
}

function cleanDist() {
    return del("dist")
}

function watching() {
    watch(["app/scss/**/*.scss"], styles);
    watch(["app/scss/critical.scss"], criticalStyles);
    watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
    watch(["app/*.html"]).on("change", browserSync.reload)
}


exports.styles = styles;
exports.criticalStyles = criticalStyles;
exports.stylesSecondary = stylesSecondary;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.htmlInclude = htmlInclude;

exports.build = series(cleanDist, images, build);
exports.default = parallel(htmlInclude, styles, stylesSecondary, criticalStyles, browsersync, watching);