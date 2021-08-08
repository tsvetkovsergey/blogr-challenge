const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "head",
      scriptLoading: "defer",
    }),
  ],
  entry: "./src/script/main.js",
  output: {
    clean: true,
  },

  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     // without additional settings, this will reference .babelrc
      //     loader: "babel-loader",
      //   },
      // },
      {
        // It will work with scss, sass or css
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      // For image loading in .html use html-loader and asset-resource
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
  },
};
