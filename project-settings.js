"use strict";
const helpers = require("./config/helpers");
const ip = require('ip');
exports.PROJECT_NAME = "stater"
exports.HOST = ip.address();
exports.DEV_PORT = 3000;
exports.PROD_PORT = 8080;


//配置map文件的生成方式
exports.DEV_SOURCE_MAP = 'source-map';
exports.PROD_SOURCE_MAP = 'nosources-source-map';

//配置开发服务器的变更监视
exports.DEV_SERVER_WATCH_OPTIONS = {
    poll: undefined,
    aggregateTimeout: 300,
    ignored: /node_modules/
}

exports.EXCLUDE_SOURCE_MAPS = [
    helpers.root('node_modules/@angular'),
    helpers.root('node_modules/@nguniversal'),
    helpers.root('node_modules/rxjs'),
    /\.scss&/,
    /\.html&/
]

exports.MY_COPY_FOLDERS = [
    // 配置编译时要复制到服务器文件夹的文件夹
    // 依旧默认复制了src/assets，不需要配置
    // 配置格式：{ from: 'folder_name', to: 'folder_name' }
    {
        from: 'node_modules/font-awesome/css/font-awesome.min.css',
        to: 'assets/font-awesome/css/font-awesome.min.css',
    },
    {
        from: 'node_modules/font-awesome/fonts',
        to: 'assets/font-awesome/fonts'
    }
]

exports.MY_POLYFILL_DLLS = [
    // 配置需要添加到dll块的polyfills文件
    // 这极大的加速了开发模式的增量编译速度
    // 修改了这个数组后，请重新运行 npm run build/server:dev
]

exports.MY_VENDOR_DLLS = [
    // 配置需要添加到dll块的vendor文件
    // 参照上面项
]

exports.MY_CLIENT_PLUGINS = [
    // 在这里添加你额外需要的通用webpack插件
]

exports.MY_CLIENT_PROD_PLUGINS = [
    // 在这里添加你生产模式下额外需要的webpack插件
]

exports.MY_CLIENT_DEV_PLUGINS = [
    // 在这里添加你生产模式下额外需要的webpack插件
]

exports.MY_CLIENT_RULES = [
    // 在这里添加你额外需要的通用webpack模块加载规则
]

exports.MY_CLIENT_PROD_RULES = [
    // 在这里添加你生产模式下额外需要的webpack模块加载规则
]

exports.MY_CLIENT_DEV_RULES = [
    // 在这里添加你生产模式下额外需要的webpack模块加载规则
]