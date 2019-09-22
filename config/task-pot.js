import debug from 'gulp-debug';
import wpPot from 'gulp-wp-pot';

module.exports = function(config, gulp, logger) {
	return function() {
		return gulp.src(config.src)
		  // debug
			// .pipe(debug({title: 'pot:'}))
			.pipe(wpPot({
				domain: config.domain,
				package: config.package
			}))
			.pipe(gulp.dest(config.dest + '/' + config.domain + '.pot'));
	}
};
