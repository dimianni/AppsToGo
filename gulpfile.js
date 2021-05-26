/*----------------------------------------------------*/
/*	NOTE:
/*
/*  NodeJS has to be installed globally on computer first: https://nodejs.org/en/
/*  Then, Gulp has to installed globally on computer by running this command in terminal: npm i --global gulp-cli
/*  For more info, visit Gulp at: https://gulpjs.com/
------------------------------------------------------*/

const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const del = require('del');


/*----------------------------------------------------*/
/*	Function that:
/*      - Takes JS files
/*      - Concatenates them into one file
/*      - Minimizes the file 
/*      - Puts the file into 'app/js';
/*      - Triggers browser update
/*  NOTE:
/*      There wil be 2 files in JS folder: 'main.js' & 'main.min.js'
/*      'main.js' is used when coding and 'main.min.js' is the final file that is being created and linked to HTML.
------------------------------------------------------*/
function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js', // npm i --save-dev jquery
        'node_modules/waypoints/lib/jquery.waypoints.js',
        'node_modules/jquery-validation/dist/jquery.validate.js',
        'node_modules/gsap/dist/gsap.js',
        'node_modules/gsap/dist/ScrollTrigger.js',
        'app/js/modernizr.webp.js',
        'app/js/main.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

/*----------------------------------------------------*/
/*	Function that:
/*      - Takes SCSS files
/*      - Compiles them to CSS
/*      - Minimizes them
/*      - Concatenates them into one file
/*      - Adds autoprefixers for better browser compatibility
/*      - Puts the file into 'app/css';
/*      - Triggers browser update
/*    
/*  NOTE:
/*      Only style.scss is selected from app folder since all other .scss files are imported there
------------------------------------------------------*/
function styles() {
    return src([
        'app/scss/style.scss'
    ])
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserlist: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

/*----------------------------------------------------*/
/*	Function that starts a server
------------------------------------------------------*/
function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    })
}

/*----------------------------------------------------*/
/*	Function that watches for changes in SCSS, JS & HTML
/*	Every time there is a change in any --> runs 'styles' or 'scripts' function to recompile files
/*
/*  NOTE:
/*      'main.min.js' is excluded. Otherwise it will create an infinite loop, since it is the 'dump' file in 'scripts' function.
/*      'browserSync.reload' has to be done on HTML changes since there is not function specifically for HTML (unlike 'styles' or 'scripts' functions)
------------------------------------------------------*/
function watching() {
    watch(['app/scss/**/*.scss'], styles)
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts)
    watch(['app/*.html']).on('change', browserSync.reload)
}



/*----------------------------------------------------*/
/*	Function that takes necessary files and puts them into dist folder
------------------------------------------------------*/
function build() {
    return src(
        [
            'app/css/style.min.css',
            'app/fonts/**/*',
            'app/js/main.min.js',
            'app/*.html'
        ],
        { base: 'app' } // Same file structure as app folder
    )
        .pipe(dest('docs'))
}

/*----------------------------------------------------*/
/*	Function that deletes dist folder
------------------------------------------------------*/
function cleanDist() {
    return del('docs')
}

/*----------------------------------------------------*/
/*	Function that compresses images; 
------------------------------------------------------*/
function images() {
    return src('app/images/*.{gif,svg}')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest('docs/images'))
}

function webpImages() {
    return src('app/images/*.{jpg,png}')
        .pipe(webp({ quality: 100 }))
        .pipe(dest('docs/images'))
}



exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.images = images;
exports.webpImages = webpImages;
exports.cleanDist = cleanDist;

/*----------------------------------------------------*/
/*	Initializes functions in parallel on 'gulp'
------------------------------------------------------*/
exports.default = parallel(styles, scripts, browsersync, watching);

/*----------------------------------------------------*/
/*	Initializes functions in series (sequence) on 'gulp build'
------------------------------------------------------*/
exports.build = series(cleanDist, webpImages, images, build); 