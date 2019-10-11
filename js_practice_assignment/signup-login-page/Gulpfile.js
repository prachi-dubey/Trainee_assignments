var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
  return gulp.src('app-sass/sass.scss')
    .pipe(sass())                       // Using gulp-sass
    .pipe(gulp.dest('app-sass'));
});

gulp.task('watch', function(done){
  gulp.watch('app-sass/*.scss', gulp.series('sass'));
  done();
})

gulp.task('hello', function(done) {
  console.log('Hello Prachi Dubey');
  done();
});
