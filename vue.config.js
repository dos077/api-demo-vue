module.exports = {
  devServer: {
    port: 8765,
    https: true,
  },
  publicPath:
    process.env.NODE_ENV === 'production' ? '/tda-api-demo-vue/' : '/',
};
