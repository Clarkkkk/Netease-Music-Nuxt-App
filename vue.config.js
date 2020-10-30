const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: false,
  pwa: {
    workboxPluginMode: 'GenerateSW',
    name: 'neteasemusic',
    themeColor: '#e91a3d',
    appleMobileWebAppCapable: 'yes',
    manifestPath: './public/manifest.json',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/mstile-150x150.png'
    }
  },
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
        esModule: false
      }
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
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/Netease-Music-Page/' : '/',
};
