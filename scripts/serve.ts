(function() {
  const WebpackDevServer = require('webpack-dev-server');
  const { compiler, webpackConfig } = require("./utils").getWebpackCompiler(process.argv, "development");

  const server = new WebpackDevServer(webpackConfig.devServer, compiler);
  const runServer = async () => {
    await server.start();
  };
  runServer();
})();