const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtendedDefinePlugin = require('extended-define-webpack-plugin');

const appRoot = path.resolve(__dirname, 'app/');
const buildDir = path.resolve(__dirname, 'build');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  context: __dirname,
  entry: ['whatwg-fetch', '@babel/polyfill', path.resolve(appRoot, 'init.jsx')],
  output: {
    path: buildDir,
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      components: path.resolve(appRoot, 'components'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'SF Service Guide',
      template: 'app/index.html',
    }),
    new ExtendedDefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: [/node_modules/],
      },
    ],
  },
  devServer: {
    contentBase: buildDir,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: process.env.API_URL || 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
