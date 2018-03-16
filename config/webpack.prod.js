const helpers = require('./helpers');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const custom = require("../project-settings");

const OptimizeJsPlugin = require('optimize-js-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const WATCH = helpers.hasProcessFlag("watch");
const SERVER = helpers.hasNpmFlag("server");
const PORT = custom.PROD_PORT;
const METADATA = webpackMerge(commonConfig({
  env: ENV
}).metadata, {
  host: custom.HOST,
  port: PORT,
  ENV: ENV,
});

if (SERVER) {
  console.log(`Starting dev server on: http://${custom.HOST}:${PORT}`);
}

module.exports = webpackMerge(commonConfig({
  env: ENV
}), {
  devtool: custom.PROD_SOURCE_MAP,
  output: {
    path: helpers.root('dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  module: {
    rules: [
      ...custom.MY_CLIENT_PROD_RULES
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   mangle: {
    //     keep_fnames: true
    //   }
    // }),
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false
      }
    })
  ],
  devServer: {
    port: PORT,
    host: custom.HOST,
    historyApiFallback: true,
    watchOptions: custom.DEV_SERVER_WATCH_OPTIONS
  },
});