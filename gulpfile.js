let gulp = require('gulp');
let sass = require('gulp-sass');
let minify = require('gulp-csso');
let browserSync = require('browser-sync').create();


gulp.task("compile", function() {
    return gulp.src("./styles/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(minify())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());

});

gulp.task('reload', gulp.series("compile", function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("./styles/**/*.scss", gulp.series("compile"));
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch('./js/*.js').on('change', browserSync.reload);
}));


gulp.task("default", gulp.series("reload"), function() {})