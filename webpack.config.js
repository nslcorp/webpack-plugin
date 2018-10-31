const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const Plugin = require('./plugin');

const ASSETS_PATH = './dist';

module.exports = env => {
  console.log(env);
  return {
    output: {
      filename: '[name]-bundle.js',
      path: path.resolve(__dirname, ASSETS_PATH)
    },
    entry: {
      main: './src/index.js'
    },
    mode: 'development',
    devServer: {
      contentBase: 'dist',
      overlay: true,
      stats: {
        colors: true
      }
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },

        {
          test: /\.html$/,
          use: 'html-loader'
        }
      ]
    },

    plugins: [
      new HTMLWebpackPlugin({
        template: './assets/template.html',
        inject: true,
        title: 'Webpack Plugin'
      }),
      new Plugin({ env: 'development', market: 'market:es' })

      /*new HtmlWebpackIncludeAssetsPlugin({
        assets: [
          'assets/1.js',
          'bbb/1.js',
          { path: './assets/2.js', attributes: { defer: true } },
          './src/style.css',
          'https://cdnjs.cloudflare.com/ajax/libs/iCheck/1.0.2/icheck.min.js'
        ],
        append: false
      })*/
    ]
  };
};
