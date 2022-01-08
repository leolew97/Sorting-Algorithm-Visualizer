const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = { 
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        // test: /\.s[ac]ss$/i,
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          // "sass-loader",
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
  },

  plugins: [new HtmlWebPackPlugin(
    {
      template: './src/index.html',
      filename: './index.html',
      inject: 'body'
    }
  )],

  devServer: {
    static: {
      directory: path.resolve(__dirname, './build/index.html')
    },
    // contentBase: path.resolve(__dirname, './build/index.html'),

    // Enable compression
    compress: true,

    // Enable hot reloading
    hot: true,

    host: 'localhost',

    port: 8080,

    // publicPath: './build',
    // host: 'localhost',
    // port: 8080,
    // host: 'localhost',
    // port: 8080,
    // proxy: {
    //   '/': 'http://localhost:3000'
    // },
    // // compress: true,
    // hot: true
  },
  devtool: 'eval-source-map'
}
