const path = require('path');
function resolve(dir) {
  // 路径可能与你的项目不同
  console.log('__dirname: ' + __dirname);
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: false,
  pwa: {
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/mstile-150x150.png'
    }
  },
  chainWebpack: (config) => {
    config.module.rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end();
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include
      .add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]'
      })
      .end();
  }
};
