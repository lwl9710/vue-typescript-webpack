/// <reference path="../types/global.d.ts" />
(function(exports: any) {
  const Webpack = require("webpack");
  const WebpackConfig = require("../webpack.config");

  function resolveArgv(argv: Array<string>): StringObject {
    const params: StringObject = {};
    if(argv.length > 2) {
      const entities = argv.slice(2);
      entities.forEach(entityStr => {
        if(entityStr.startsWith("--")) {
          const entity = entityStr.substring(2).split("=");
          params[entity[0]] = entity[1] || true;
        }
      });
    }
    return params;
  }

  // 解析命令行参数
  exports.resolveArgv = resolveArgv;

  // 获取WebpackCompiler
  exports.getWebpackCompiler = function(argv: Array<string>, mode: string): any {
    const CommondParams = resolveArgv(argv);
    const webpackConfig = typeof(WebpackConfig) === "function" ? WebpackConfig(Object.assign({ mode }, CommondParams)) : JSON.parse(JSON.stringify(WebpackConfig));
    const compiler = Webpack(webpackConfig);
    return { compiler, webpackConfig };
  }
})(module.exports);