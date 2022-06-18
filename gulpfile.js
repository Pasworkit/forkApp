import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import clean from 'gulp-clean';
import browserSync from 'browser-sync';

const BS = browserSync.create();
const sass = gulpSass(dartSass);

const cleanDist = () => gulp.src('dist/*', { allowEmpty: true })
    .pipe(clean());

const buildStyles = () => gulp.src('./src/styles/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));

const moveImages = () => gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./dist/images'));


export const dev = gulp.series(cleanDist, moveImages, buildStyles,  () => {
    BS.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./src/**/*', gulp.series(buildStyles, (done) => {
        BS.reload();
        done();
    }))
});