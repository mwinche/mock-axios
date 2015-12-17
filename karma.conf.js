'use strict';

module.exports = function (config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: [
			'./test.js'
		],

		preprocessors: {
			'test.js': ['webpack', 'sourcemap']
		},

		webpack: {
			module: {
				loaders: []
			},
			devtool: 'inline-source-map'
		},

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		reporters: ['progress', 'coverage'],
		coverageReporter: {
			dir: 'coverage/',
			subdir: function (browser) {
				return browser.toLowerCase().split(/[ /-]/)[0];
			},
			reporters: [
				{type: 'text-summary'},
				{type: 'html'}
			]
		},
		port: 9876,
		colors: true,
		autoWatch: false,
		browsers: ['Chrome'],
		singleRun: true
	});
};
