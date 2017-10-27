var path = require("path");
// var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: "./index.js",
    // "webpack-dev-server/client?http://localhost:8080",
    // "webpack/hot/only-dev-server",
  output: {
    filename: "bundle.js"
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ],
  module: {
    loaders: [
      {
        test: [/.jsx?$/, /.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          "env": {
            "development": {
              "presets": ['react-hmre']
            }
          },
          plugins: ['react-hot-loader/babel']
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader' // short for "style-loader!css-loader"
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  },
  // devServer: { hot: true }
};
