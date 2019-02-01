const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  css: {
    extract: false,
  },

  filenameHashing: false,

  chainWebpack: (config) => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // По умолчанию ассеты размером больше, чем 4кб не инлайнятся, а выносятся отдельными файлами.
    // Отменаем это правило
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }));

    // По-умолчанию Vue CLI создаёт 2 отдельных чанка:
    // 1. app.js
    // 2. chunk-vendors.js
    // Отменяем это разделение, т.к. нам нужен единый файл
    config.optimization.delete('splitChunks');
    config.plugins.delete('html');
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
  },

  configureWebpack: {
    output: {
      filename: 'p1payone.js',
      chunkFilename: '[name].js',
    },
    plugins:
      process.env.CHECK_SIZE === 'true'
        ? [new BundleAnalyzerPlugin()]
        : [],
  },

  pluginOptions: {
    lintStyleOnBuild: false,
    stylelint: {},
  },
};
