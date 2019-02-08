module.exports = {
  presets: ['@babel/preset-react'],
  plugins: [
    'babel-plugin-transform-commonjs',
    '@tbranyen/babel-plugin-bare-import-rewrite',
  ]
};
