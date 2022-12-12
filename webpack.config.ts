/// <reference path="./types/global.d.ts" />
const Path = require("path");
const WebpackBar = require("webpackbar");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PostcssOptions = require("./postcss.config");
const { DefinePlugin: WebpackDefinePlugin } = require("webpack");

function resolvePath(pathname: string): string {
  return Path.resolve(__dirname, pathname);
}

module.exports = function(env: StringObject = {}) {
  const isProduction = env.mode === "production";
  const publicPath = "/";
  return {
    mode: env.mode || "production",
    target: [ "web", "es5" ],
    devtool: isProduction ? "inline-source-map" : false,
    entry: resolvePath("./src/main.ts"),
    resolve: {
      alias: {
        "@": resolvePath("src")
      },
      extensions: [ ".vue", ".json", ".js", ".ts", ".tsx" ]
    },
    output: {
      clean: true,
      publicPath,
      path: resolvePath("dist"),
      filename: "js/[name].[contenthash].bundle.js",
      chunkFilename: "js/[name].[contenthash].chunk.js"
    },
    devServer: {
      open: true,
      port: 8080,
      compress: true,
      static: {
        directory: resolvePath("public")
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        {
          test: /\.(jpg|jpeg|png|gif|webp)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[name].[contenthash].[ext]"
          }
        },
        {
          test: /\.s?[ac]ss$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader",
            "css-loader",
            { loader: "postcss-loader", options: { postcssOptions: PostcssOptions } },
            "sass-loader"
          ]
        },
        {
          test: /\.vue$/i,
          loader: "vue-loader"
        },
        // {
        //   test: /\.$/i,
        //   loader: ""
        // },
        // {
        //   test: /\.$/i,
        //   use: []
        // },
      ]
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            name: "vendor",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial"
          },
          commons: {
            name: "chunk-commons",
            minChunks: 2,
            priority: -10,
            chunks: "initial",
            reuseExistingChunk: true
          }
        }

      }
    },
    plugins: [
      new WebpackBar(),
      new VueLoaderPlugin(),
      new WebpackDefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        "process.env": JSON.stringify(env)
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css"
      }),
      new HtmlWebpackPlugin({
        template: resolvePath("./public/index.html"),
        inject: "body",
        scriptLoading: "blocking",
      })
    ],
    stats: {
      colors: true,
      assets: true,
      chunks: false,
      modules: false,
      builtAt: false,
      hash: true
    },
  }
}