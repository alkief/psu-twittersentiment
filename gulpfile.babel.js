import gulp from 'gulp'
import path from 'path'
import del from 'del'
import flatten from 'gulp-flatten'
import sourcemaps from 'gulp-sourcemaps'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import babel from 'gulp-babel'
import browserify from 'browserify'
import babelify from 'babelify'
import runSequence from 'run-sequence'

gulp.task('default', ['build'])

gulp.task('build', ['build-cli', 'build-server'])

gulp.task('clean', ['clean-server', 'clean-cli'])

gulp.task('clean-server', () => {
	return del(['dist/app.js', 'dist/server'], {force: true})
})

gulp.task('clean-cli', () => {
	return del(['dist/client'], {force: true})
})

gulp.task('build-server', done => {
	runSequence('clean-server', 'server-main', 'server-scripts', done)
})

gulp.task('server-main', done => {
	const server = 'src/server/app.js'
	return gulp
		.src(server)
		.pipe(babel())
		.pipe(gulp.dest('dist/server'))
})

gulp.task('server-scripts', done => {
	const scripts = 'src/server/scripts'
	return gulp
		.src('src/server/scripts/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(sourcemaps.write('./'))
		.pipe(flatten())
		.pipe(gulp.dest('dist/server/scripts'))
})

gulp.task('build-cli', () => {
	runSequence('clean-cli', 'cli-scripts', 'cli-static')
})

gulp.task('cli-scripts', done => {
	let entry = 'src/client/index.js'
	return browserify({
			entries: entry,
			debug: false,
			paths: 'src/client/scripts'
		})
		.transform(babelify)
		.bundle()
		.pipe(source('index.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(flatten())
		.pipe(gulp.dest('dist/client/js'))
})

gulp.task('cli-static', done => {
	const src = 'src/client/static'
	return gulp
		.src(`${src}/**/*`, {base: src})
		.pipe(flatten())
		.pipe(gulp.dest('dist/client/static'))
})

gulp.task('watch', [''])