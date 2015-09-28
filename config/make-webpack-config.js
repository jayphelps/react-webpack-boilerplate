const path = require('path');
const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const base = path.join(__dirname, '../');
const src = path.join(base, 'src');
const dist = path.join(base, 'dist');
const test = path.join(base, 'test');

module.exports = function (options) {
  options = options || {};

  console.log(require.resolve('react/addons'));

  const config = {
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel',
        include: src
      }, {
        test: /\.(css|less)$/,
        loader: 'style!css!less'
      }, {
        test: /\.(png|jpg|woff2|woff|eot|ttf|svg)$/,
        loader: 'file?name=assets/[name]-[hash].[ext]'
      }, {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: src
      }, {
        test: /\.json$/,
        loader: 'json'
      }]
    },
    resolve: {
      alias: {
        etui: src,
        react: require.resolve('react/addons'),
        'react-router': require.resolve('jayphelps-react-router')
      },
      extensions: ['', '.js', '.jsx', '.json'],
    },
    plugins: [
      new webpack.PrefetchPlugin('react'),
      new webpack.PrefetchPlugin('jayphelps-react-router'),
      new webpack.PrefetchPlugin('react-css-modules')
    ]
  };

  if (!options.test) {
    config.entry = {
      app: src + '/index.jsx'
    };

    config.output = {
      path: dist,
      publicPath: '/',
      filename: 'assets/bundle-[hash].js'
    };

    config.module.loaders.push({
      test: /\.jsx?$/,
      loader: 'babel',
      include: test
    });

    config.devServer = {
      contentBase: dist,
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
        title: 'Edge Dev Tools'
      })
    );
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
