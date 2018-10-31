const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const fetch = require('node-fetch');

const pluginName = 'Plugin';
const url = 'http://www.mocky.io/v2/5bd9d9402f00007d0006d35c';

class Plugin {
  constructor() {}

  apply(compiler) {
    this.applyHtmlWebpackPlugin(compiler);
  }

  applyHtmlWebpackPlugin(compiler) {
    this.includeAssetsPlugin = new HtmlWebpackIncludeAssetsPlugin({
      assets: [],
      publicPath: '',
      append: false
    });

    this.includeAssetsPlugin.apply(compiler);

    compiler.hooks.afterCompile.tapAsync(pluginName, async (compilation, cb) => {
      //FETCH data
      const response = await fetch(url);
      const responseData = await response.json();
      const assets = responseData.map(d => d.src);

      // HACK: Calling the constructor directly is not recomended
      //       But that's the only secure way to edit `assets` afterhand
      this.includeAssetsPlugin.constructor({
        assets,
        publicPath: '',
        append: false
      });

      cb();
    });
  }
}

module.exports = Plugin;
