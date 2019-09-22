import debug from 'gulp-debug';
import phplint from 'gulp-phplint';

module.exports = function (config, gulp, logger) {
	return function () {
		return gulp.src(config.src)
		  // debug
		  // .pipe(debug({title: 'lintphp:'}))
			.pipe(phplint('', { /*opts*/ }));
	};
};
