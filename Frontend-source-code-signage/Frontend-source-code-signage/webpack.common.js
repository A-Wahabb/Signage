 const path = require('path');
 const webpack= require('webpack');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 var ExtractTextPlugin = require('extract-text-webpack-plugin');
 module.exports = {
   entry: {
    app:'./src/index'
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin(),
     new CleanWebpackPlugin(['dist']),
     new ExtractTextPlugin('style.css', {
            allChunks: true
        }),
     new HtmlWebpackPlugin({
       title: 'Production'
     })
   ],

    module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot-loader/webpack','babel-loader'],
      exclude: /node_modules/
    },
    { test: /\.jpe?g$|\.gif$|\.eot$|\.png$|\.svg$|\.woff$|\.woff2$|\.ttf$/,
      loader: "file-loader"
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('css!less')
    }]
  },
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist')
   }
 };
