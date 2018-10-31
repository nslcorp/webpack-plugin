const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const pluginName = 'Plugin-Ticketmaster';

const url = 'http://www.mocky.io/v2/5bd9a82e2f0000510006d254';

class DynamicCdnWebpackPlugin {
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

    compiler.hooks.beforeCompile.tapAsync(pluginName, (compilation, cb) => {
      this.addFiles('beforeCompile', cb);
    });

    compiler.hooks.afterCompile.tapAsync(pluginName, (compilation, cb) => {
      this.addFiles('11afterCompile', cb);
    });

    compiler.hooks.emit.tapAsync(pluginName, (compilation, cb) => {
      this.addFiles('emit', cb);
    });
  }

  addFiles(name, cb) {
    console.log(name);
    setTimeout(() => {
      const assets = [
        `./${name}/1.js`,
        `https://${name}.cdnjs.cloudflare.com/ajax/libs/iCheck/1.0.2/icheck.min.js`
      ];

      // HACK: Calling the constructor directly is not recomended
      //       But that's the only secure way to edit `assets` afterhand
      this.includeAssetsPlugin.constructor({
        assets,
        publicPath: '',
        append: false
      });

      cb();
    }, 2000);
  }
}

module.exports = DynamicCdnWebpackPlugin;
