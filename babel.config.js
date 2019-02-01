module.exports = {
  presets: [
    '@vue/app',
  ],
  // This somehow fixes jest --coverage brakedown
  env: {
    test: {},
  },
};
