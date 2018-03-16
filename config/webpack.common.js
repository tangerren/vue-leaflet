const helpers = require('./helpers');
const webpack = require('webpack');
const custom = require('../project-settings');

//plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlElementsPlugin = require('./html-elements-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//meta
const METADATA = {
    title: custom.PROJECT_NAME,
    isDevServer: helpers.isWebpackDevServer()
};

module.exports = function (options) {
    var isProd = options.env === 'production';
    return {
        entry: {
            // 'vendor': helpers.root("/src/vendor.js"),
            'app': helpers.root('/src/main.js')
        },
        module: {
            rules: [{
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {}
                    }
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.html$/,
                    use: [{
                        loader: 'raw-loader'
                    }],
                    exclude: [helpers.root('index-tpl.html')]
                },
                {
                    test: /\.css$/,
                    loader: ['style-loader', 'css-loader']
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    }),
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    loader: 'file-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[name].[ext]?[hash]'
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[ext]'
                    },
                },
                ...custom.MY_CLIENT_RULES
            ]
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            },
            modules: [
                helpers.root('src'),
                helpers.root('node_modules'),
            ]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: '[name].[contenthash].css',
                allChunks: true,
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'polyfills',
                chunks: ['polyfills']
            }),
            new CopyWebpackPlugin([{
                    from: 'src/assets',
                    to: 'assets'
                },
                ...custom.MY_COPY_FOLDERS
            ]),
            new HtmlWebpackPlugin({
                title: METADATA.title,
                filename: 'index.html',
                template: helpers.root('./index-tpl.html'),
                chunksSortMode: 'dependency',
                metadata: METADATA,
                showErrors: true,
                inject: 'body'
            }),
            new ScriptExtHtmlWebpackPlugin({
                sync: /polyfill|vendor/,
                defaultAttribute: 'async',
                preload: [/polyfill|vendor|main/],
                prefetch: [/chunk/]
            }),
            new HtmlElementsPlugin({
                headTags: require('./head-config')
            }),
            new webpack.LoaderOptionsPlugin({}),
            ...custom.MY_CLIENT_PLUGINS
        ],
        node: {
            global: true,
            crypto: 'empty',
            process: false,
            module: false,
            clearImmediate: false,
            setImmediate: false
        },
    };
};