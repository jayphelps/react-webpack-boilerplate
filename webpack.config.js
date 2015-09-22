const path = require('path');
const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = {
  entry: {
    app: src + '/index.jsx',
    vendors: ['react']
  },
  output: {
    path: dist,
    filename: 'assets/app.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      include: src
    }, {
      test: /\.(css|less)$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less')
    }, {
      test: /\.(png|jpg|woff2|woff|eot|ttf|svg)$/,
      loader: 'url?limit=25000'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Clean(['dist']),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'assets/vendors.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('assets/app.css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: true,
      template: 'public/index.html',
      inject: 'body',
      title: 'Edge Dev Tools'
    })
  ],
  devServer: {
    contentBase: dist,
    port: 7001,
    colors: true,
    noInfo: true,
    hot: true,
    inline: true
  }
};
