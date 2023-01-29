const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'output.js'
  },
  devServer: {
    port: 2000,
  },
  mode: 'development',
  devtool: false,
  resolve: {
    extensions: [
      '.js'
    ],
    alias: {
      '@nixix': path.resolve(__dirname, 'nixix/js-lib/nixix.js'),
      '@nixix-render': path.resolve(__dirname, 'nixix/js-lib/render.js')
    }
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html')
    }),
    new miniCSSExtractPlugin({
      filename: 'styles.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [miniCSSExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}