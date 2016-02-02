const path = require('path');
const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ComponentResolverPlugin = require('component-resolver-webpack');
const failPlugin = require('webpack-fail-plugin');
const packageJSON = require('../package.json');
const base = path.join(__dirname, '../');
const src = path.join(base, 'src');
const dist = path.join(base, 'dist');
const test = path.join(base, 'test');

module.exports = function (options) {
  options = options || {};

  const config = {
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        include: src
      }, {
        test: /\.(css|less)$/,
        loader: 'style!css!less?strictMath'
      }, {
        test: /\.(png|jpg|woff2|woff|eot|ttf|svg)$/,
        loader: 'file?name=assets/[name]-[hash].[ext]'
      }, {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint',
        include: src
      }, {
        test: /\.json$/,
        loader: 'json'
      }]
    },
    resolve: {
      alias: {
        'react': require.resolve('react'),
        'react-dom': require.resolve('react/lib/ReactDOM'),
        'react-addons-test-utils': require.resolve('react/lib/ReactTestUtils'),
        'react-router': require.resolve('jayphelps-react-router')
      },
      extensions: ['', '.js', '.jsx', '.json'],
    },
    plugins: [
      new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
      }),
      new webpack.PrefetchPlugin('jquery'),
      new webpack.PrefetchPlugin('react'),
      new webpack.PrefetchPlugin('jayphelps-react-router'),
      new webpack.PrefetchPlugin('react-css-modules'),
      new webpack.ResolverPlugin([
        new ComponentResolverPlugin(['jsx', 'js', 'less', 'css'])
      ]),
      failPlugin
    ],
    eslint: {
      formatter: function (messages) {
        return require('eslint/lib/formatters/stylish')(messages)
          .split('\n')
          .map(function (line) {
            return 'eslint: ' + line;
          })
          .join('\n');
      }
    }
  };

  config.resolve.alias[packageJSON.name] = src;

  if (!options.test) {
    config.entry = {
      app: src + '/index.jsx'
    };
    config.output = {
      path: dist,
      publicPath: '/',
      filename: 'assets/bundle-[hash].js'
    };

    config.worker = {
      output: {
        filename: 'assets/[hash].worker.js'
      }
    };

    config.module.loaders.push({
      test: /\.jsx?$/,
      loader: 'babel',
      include: test
    });

    config.devServer = {
      port: 7001,
      colors: true,
      noInfo: true,
      hot: true,
      inline: true,
      historyApiFallback: true
    };

    config.plugins.push(
      new HtmlWebpackPlugin({
        filename: 'index.html',
        hash: true,
        template: 'public/index.html',
        inject: 'body',
        title: 'React Webpack Boilerplate'
      })
    );
  }

  if (options.sourceMaps) {
    config.devtool = 'source-map';
  }

  if (options.hotModuleReplacement) {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
  }

  if (options.minimize) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.optimize.DedupePlugin()
    );
  }

  if (options.cleanDist) {
    config.plugins.push(
      new Clean(['dist'], base)
    );
  }

  return config;
};
