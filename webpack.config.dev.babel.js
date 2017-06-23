import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import dotenv from 'dotenv';
const buildPath = path.resolve(__dirname, 'lib/public');

dotenv.load();

export default {
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', 'scss', '.jsx'],
    alias: {
      jQuery: path.join(__dirname, 'node_modules/jquery/dist/jquery'),
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'client/index.html')
    })
  ],
  entry: [
    'babel-polyfill',
    './client/app.jsx'
  ],
  target: 'web',
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'static/js/bundle.js'
  },
  devServer: {
    publicPath: '/',
    compress: true,
    port: process.env.WEBPORT,
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.APIPORT}`,
        secure: false
      }
    },
    clientLogLevel: 'none',
    hot: true,
    inline: true,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/
    }
  },
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        },
        {
          loader: 'expose-loader',
          options: 'window.jQuery'
        },
        {
          loader: 'expose-loader',
          options: '$'
        },
        {
          loader: 'expose-loader',
          options: 'window.$'
        }]
      },
      // {
      //   test: require.resolve('materialize-css/js/velocity.min'),
      //   use: [{
      //     loader: 'expose-loader',
      //     options: 'window.Vel'
      //   }]
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'client'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'client'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.ico$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: 'file-loader',
        query: {
          name: 'static/media/[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        query: {
          name: 'static/fonts/[name].[ext]'
        }
      }
    ]
  }
};
