module.exports = {
  presets: [['@vue/app', { loose: true }]],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    '@babel/plugin-proposal-optional-chaining'
  ]
};
