const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = (env) => ({
  entry: './src/main.js',
  output: {
    filename: 'main[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
      },
      {
        test: /\.css$/i,
        use: [env.prod ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules,eslint.config.mjs/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: 'defaults',
            presets: [['@babel/preset-env']],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Форма оплаты',
    }),
    new MiniCssExtractPlugin({
      filename: 'main[contenthash].css',
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ['gifsicle', { interlaced: true, optimizationLevel: 3 }],
            ['mozjpeg', { quality: 75 }], // Для JPG и JPEG
            ['optipng', { optimizationLevel: 5 }], // Для PNG
            ['svgo', { plugins: [{ removeViewBox: false }] }], // Для SVG
          ],
        },
      },
    }),
  ],
  devServer: {
    hot: true,
  },
});
