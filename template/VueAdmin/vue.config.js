const path = require('path');
module.exports = {
  lintOnSave: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        components: path.resolve(__dirname, 'src/components'),
        views: path.resolve(__dirname, 'src/views'),
        api: path.resolve(__dirname, 'src/api'),
        router: path.resolve(__dirname, 'src/router'),
        store: path.resolve(__dirname, 'src/store'),
        constants: path.resolve(__dirname, 'src/constants'),
        utils: path.resolve(__dirname, 'src/utils'),
        styles: path.resolve(__dirname, 'src/styles'),
        assets: path.resolve(__dirname, 'src/assets'),
        lib: path.resolve(__dirname, 'src/lib')
      }
    }
  },
  chainWebpack: config => {
    config.optimization.minimizer('terser').tap(args => {
      args[0].terserOptions.compress.drop_console = true;
      return args;
    });
  },
  devServer: {
    host: '0.0.0.0',
    // 多系统开发建议自定义开发端口
    port: 8082,
    proxy: {
      '/middware': {
        target: 'http://st.heimdall.be.youpin.srv'
      },
      '/api/media/': {
        target: 'http://st.osadmin.youpin.srv'
      },
      '/api/gateway/': {
        target: 'http://st.heimdall.be.youpin.srv'
      },
      '/mtop/': {
        target: 'http://st.shopapi.io.mi.com'
      }
    },
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    before: app => {}
  },
  runtimeCompiler: false,
  productionSourceMap: false
};
