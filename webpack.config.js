const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

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
      })
    ]
  };
};
