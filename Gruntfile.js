module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('build', [
		'clean:dist',
		'ngtemplates',
		'concat:dist',
		'uglify',
		'sass:dist'
	]);

	grunt.registerTask('dev', [
		'clean:dev',
		'ngtemplates',
		'concat:dev',
		'sass:dev'
	]);

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		ngtemplates: {
			all: {
				options: {
					module: 'bg.modals',
					prefix: '/',
					htmlmin: {
						collapseWhitespace: true
					}
				},
				cwd: 'src',
				src: '**/*.html',
				dest: '.tmp/modals.templates.js'
			}
		},
		clean: {
			dist: ['.tmp', 'dist'],
			dev: ['.tmp', 'dev']
		},
		concat: {
			dist: {
				src: ['src/js/module.js', 'src/**/*.js', '.tmp/**/*.js'],
				dest: 'dist/bgmodals.js'
			},
			dev: {
				src: ['src/js/module.js', 'src/**/*.js', '.tmp/**/*.js'],
				dest: 'dev/bgmodals.js'
			}
		},
		uglify: {
			dist: {
				files: {
					'dist/bgmodals.min.js': ['dist/bgmodals.js']
				}
			}
		},
		sass: {
			options: {
				style: 'compressed',
				sourcemap: 'none'
			},
			dist: {
				expand: true,
				cwd: 'src/sass',
				src: ['**/*.scss'],
				dest: 'dist',
				ext: '.css'
			},
			dev: {
				expand: true,
				cwd: 'src/sass',
				src: ['**/*.scss'],
				dest: 'dev',
				ext: '.css'
			}
		},
		watch: {
			dev: {
				files: 'src/**/*',
				tasks: 'dev',
				options: {
					livereload: true
				}
			}
		},
		serve: {
			options: {
				port: 9000
			}
		}
	});

};



