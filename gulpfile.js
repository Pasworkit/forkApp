import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import clean from 'gulp-clean';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import htmlMin from 'gulp-htmlmin';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';

const BS = browserSync.create();
const sass = gulpSass(dartSass);

const cleanDist = () => gulp.src('dist/*', {allowEmpty: true})
    .pipe(clean());


const buildStyles = () => gulp.src('./src/styles/**/*.scss')
    .pipe(autoprefixer())
    .pipe(concat('css.min.css'))
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));

export const html = () => gulp.src('./src/**/*.html')
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'));

const moveImages = () => gulp.src('./src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));

export const js = () => gulp.src('./src/scripts/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(terser())
    .pipe(gulp.dest('./dist/scripts'));



export const build = gulp.series(cleanDist, moveImages, buildStyles, gulp.parallel(html, js));

export const dev = gulp.series( build, () => {
    BS.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./src/**/*', gulp.series(js, buildStyles, (done) => {
        BS.reload();
        done();
    }))
});