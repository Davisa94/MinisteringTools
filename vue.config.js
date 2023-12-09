const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
    transpileDependencies: true,
    chainWebpack: config => {
        config.plugin('polyfills').use(NodePolyfillPlugin)
    },
    configureWebpack: {
        resolve: {
          fallback: {
            fs: require.resolve('browserify-fs'),
            zlib: require.resolve('browserify-zlib'),
            child_process: false,
            net: false,
            tls: false
          },
          alias: {
            process: 'process/browser',
          }
        },
    }

}