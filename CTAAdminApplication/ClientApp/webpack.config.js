const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
// call dotenv and it will return an Object with a parsed key 
const env = dotenv.config().parsed;
// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});
module.exports = {
  entry: ["@babel/polyfill", './src/app.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      // exclude: /node_modules/,
      // exclude: /node_modules\/(?!(@coreui)\/).*/,
      exclude: /node_modules(?!(\/|\\)@coreui)/,
      // include: [path.resolve(__dirname, "src"),path.resolve(__dirname, "node_modules/@coreui")]
      // exclude: function(modulePath) {
      //   return /node_modules/.test(modulePath) && !/node_modules\/@coreui/.test(modulePath);
      // }
      // exclude: /node_modules\/(?!@coreui)/
      options: {
        presets: ['@babel/preset-env',
                  '@babel/react',{
                  'plugins': ['@babel/plugin-proposal-class-properties']}]
    }

    }, {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new webpack.DefinePlugin(envKeys)
  ]
};
