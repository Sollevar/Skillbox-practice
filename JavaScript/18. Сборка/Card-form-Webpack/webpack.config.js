const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
module.exports = {
    entry: './src/main.js',
    output: {
        publicPath: '/',
        filename: 'main[contenthash].js'
    },
    module: {
        rules: [{
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset",
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    optimization: {
        minimizer: [
            "...",
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ["gifsicle", { optimizationLevel: 5 }],
                            ["jpegtran", { optimizationLevel: 5 }],
                            ["optipng", { optimizationLevel: 5 }],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            [
                                "svgo",
                                {
                                    plugins: [{
                                        name: "preset-default",
                                        params: {
                                            overrides: {
                                                removeViewBox: false,
                                                addAttributesToSVGElement: {
                                                    params: {
                                                        attributes: [
                                                            { xmlns: "http://www.w3.org/2000/svg" },
                                                        ],
                                                    },
                                                },
                                            },
                                        },
                                    }, ],
                                },
                            ],
                        ],
                    },
                },
            }),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ],
    devServer: {
        hot: true,
    }
}