const helpers = require('./helpers');
const webpack = require('webpack');
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const custom = require("../project-settings");

const AutoDLLPlugin = require("autodll-webpack-plugin");
const vendor = [
    "vue",
    "element-ui",
    "axios",
    "vue-cookie",
    "vuex",
    "leaflet",
    "proj4",
    ...custom.MY_VENDOR_DLLS
]

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';
const WATCH = helpers.hasProcessFlag("watch");
const SERVER = helpers.hasNpmFlag("server");
const PORT = custom.DEV_PORT;
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
    env: ""
}), {
    devtool: custom.DEV_SOURCE_MAP,
    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        rules: [
            ...custom.MY_CLIENT_DEV_RULES
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'ENV': JSON.stringify(METADATA.ENV),
            'HMR': METADATA.HMR,
            'process.env': {
                'ENV': JSON.stringify(METADATA.ENV),
                'NODE_ENV': JSON.stringify(METADATA.ENV),
                'HMR': METADATA.HMR,
            }
        }),
        new AutoDLLPlugin({
            entry: {
                vendor: vendor
            },
            filename: "[name]_[hash].dll.js",
            context: helpers.root(""),
            inject: true,
            path: "dll",
            debug: true,
            plugins: [
                new webpack.optimize.UglifyJsPlugin()
            ]
        }),
        ...custom.MY_CLIENT_DEV_PLUGINS
    ],
    devServer: {
        port: PORT,
        host: custom.HOST,
        historyApiFallback: true,
        watchOptions: custom.DEV_SERVER_WATCH_OPTIONS
    },
});