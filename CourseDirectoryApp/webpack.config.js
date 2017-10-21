var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/.jsx?$/, /.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  },
  devServer: { historyApiFallback: true }, // to serve your index.html in place of 404 responses
};
