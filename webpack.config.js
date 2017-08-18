const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ReplacePlugin = require("replace-bundle-webpack-plugin");
const path = require("path");

const ENV = process.env.NODE_ENV || "development";

const CSS_MAPS = ENV !== "production";

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./index.js",

  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
    libraryTarget: "umd"
  },

  resolve: {
    extensions: [".jsx", ".js", ".json", ".scss"],
    modules: [
      path.resolve(__dirname, "src/lib"),
      path.resolve(__dirname, "node_modules"),
      "node_modules"
    ],
    alias: {
      components: path.resolve(__dirname, "src/components"), // used for tests
      style: path.resolve(__dirname, "src/style")
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        // Transform our own .(scss|css) files with PostCSS and CSS-modules
        test: /\.(scss|css)$/,
        include: [path.resolve(__dirname, "src/components")],
        use: [
          {
            loader: "style-loader",
            options: { singleton: true, sourceMap: CSS_MAPS }
          },
          {
            loader: "css-loader",
            options: { modules: true, importLoaders: 1, sourceMap: CSS_MAPS }
          },
          {
            loader: "postcss-loader",
            options: { sourceMap: CSS_MAPS, ctx: { autoprefixer: { browsers: "last 2 versions" } } }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: CSS_MAPS }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        exclude: [path.resolve(__dirname, "src/components")],
        use: [
          {
            loader: "style-loader",
            options: { singleton: true, sourceMap: CSS_MAPS }
          },
          {
            loader: "css-loader",
            options: { modules: true, importLoaders: 1, sourceMap: CSS_MAPS }
          },
          {
            loader: "postcss-loader",
            options: { sourceMap: CSS_MAPS, ctx: { autoprefixer: { browsers: "last 2 versions" } } }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: CSS_MAPS }
          }
        ]
      },
      {
        test: /\.(xml|html|txt|md)$/,
        use: [
          {
            loader: "raw-loader"
          }
        ]
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        use: ENV === "production"
          ? "file?name=[path][name]_[hash:base64:5].[ext]"
          : "url"
      }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(ENV)
    })
  ].concat(
    ENV === "production"
      ? [
          // strip out babel-helper invariant checks
          new ReplacePlugin([
            {
              // this is actually the property name https://github.com/kimhou/replace-bundle-webpack-plugin/issues/1
              partten: /throw\s+(new\s+)?[a-zA-Z]+Error\s*\(/g,
              replacement: () => "return;("
            }
          ]),
          new webpack.optimize.ModuleConcatenationPlugin()
        ]
      : []
  ),

  stats: { colors: true },

  node: {
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },

  devtool: ENV === "production" ? "source-map" : "",

  devServer: {
    port: process.env.PORT || 8080,
    host: "localhost",
    publicPath: "/build",
    contentBase: "./",
    historyApiFallback: true,
    open: true
  }
};
