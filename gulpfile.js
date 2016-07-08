var gulp = require("gulp"),
	browserSync = require("browser-sync"),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber');
 
	gulp.task('sass', function () {
	  return gulp.src('app/sass/**/*.scss')
	  	.pipe(plumber())
	    .pipe(sass.sync().on('error', sass.logError))
	    .pipe(gulp.dest('app/css'));
	});
	gulp.task('server',function(){
		browserSync({
			port: 9000,
			server: {
				baseDir: 'app'
			}
		})
	});
	gulp.task('watch', function(){

		gulp.watch([
			'app/*.html',
			'app/js/**/*.js',
			'app/css/**/*.css'
		]).on('change', browserSync.reload);

  		gulp.watch('app/sass/**/*.scss', ['sass']);

	});
	gulp.task('default', ['server','watch']);