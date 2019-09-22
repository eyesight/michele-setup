const url = './../michelle/wp-content/themes/mim/dist';
export const config = {

	styles: {
		args: {
      src: './src/scss/*.scss',
      watch: './src/scss/**/*.scss',
	  dest: [url + '/css']
		}
	},

	scripts: {
		args: {
			src: './src/js/wordpress.js',
			watch: './src/js/**/*.js',
			dest: url + '/js'
		}
  },
  
	fonts: {
		args: {
			src: './src/fonts/**/*.*',
			dest: [
				url + '/fonts/'
            ]
		}
  },

  img: {
		args: {
			src: './src/img/**/*.*',
			dest: [
				url + '/img/'
            ]
		}
  },
  
  favicons: {
		args: {
			src: './src/favicons/**/*.*',
			dest: [
				url + '/favicons/'
            ]
		}
  },

	svg: {
		args: {
			src: [
				'src/svg/**/*.svg'
			],
			dest: url + '/svg/'
		}
	},

	lintjs: {
		args: {
			src: './src/js/**/*.js'
		}
	},

	lintcss: {
		args: {
			src: './src/scss/**/*.scss'
		}
	},

	watch: {}

};
