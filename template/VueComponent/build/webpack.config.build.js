const path = require('path');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base.js');
const rimraf = require('rimraf');
rimraf.sync(path.resolve(__dirname,'../dist'));
module.exports = ()=>{
    return merge(webpackBaseConfig,{
      output: {
        library: '<?=appName ?>',
        libraryTarget: 'umd',
      },
      optimization: {
        splitChunks: {
          chunks: 'all',
        },
      },
      plugins:[]
    });
};
