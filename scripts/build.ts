(function() {
  const { compiler, webpackConfig } = require("./utils").getWebpackCompiler(process.argv, "production");

  compiler.run((error: any, stats: any) => {
    if(error) {
      console.error(error.stack);
      return;
    }
    if (stats.hasWarnings()) {
      console.warn(stats.toString("errors-warnings"));
    }
    if(stats.hasErrors()) {
      console.error(stats.toString("errors-only"));
      return;
    }
    console.log(stats.toString(webpackConfig.stats));
  });
})();