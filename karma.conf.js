var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['mocha', 'sinon-chai'],
    files: [
        'test/**/*-test.jsx'
    ],
    preprocessors: {
        'test/**/*-test.jsx': ['webpack']
    },
    webpack: require('./webpack.config'),
    webpackServer: {
      noInfo: true
    },
    plugins: [
        'karma-mocha',
        'karma-mocha-reporter',
        'karma-sinon-chai',
        'karma-webpack',
        'karma-chrome-launcher'
    ]
  });
};