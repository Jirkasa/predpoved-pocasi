const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
    entry: {
        main: "./src/ts/main.ts",
        style: "./src/less/main.less",
        icons: './src/icons/main.js',
    },
    output: {
        clean: true
    },
    module: {
        rules: [
            {
                test: /(\.ts|\.d.ts)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: "static/icon-sprite.svg"
                        }
                    },
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                {
                                    name: 'removeAttrs',
                                    params: {
                                        attrs: ['*:fill:(none|black)', '*:stroke:(none|black)']
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
            filename: "index.html",
            chunks: ["style", "main"],
            inject: true
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "static").replace(/\\/g, "/"),
                    to: path.resolve(__dirname, "dist", "static"),
                    noErrorOnMissing: true
                }
            ]
        }),
        new SpriteLoaderPlugin(),
        new RemoveEmptyScriptsPlugin()
    ]
}