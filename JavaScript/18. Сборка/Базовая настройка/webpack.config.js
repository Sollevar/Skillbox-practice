const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./src/main.js',
    output: {
        filename: 'main.js',
        publicPath: '/',
    },
    module:{
        rules:[
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.scss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin(),
    ],
    devServer:{
        hot:true,
        historyApiFallback:true
    }
}