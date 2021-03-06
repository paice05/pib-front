const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
    return {
        entry: {
            app: path.join(__dirname, "src", "index.tsx"),
        },
        target: "web",
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    use: "ts-loader",
                    exclude: "/node_modules/",
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(scss)$/,
                    use: [
                        {
                            loader: "style-loader",
                        },
                        {
                            loader: "css-loader",
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: function () {
                                    return [require("autoprefixer")];
                                },
                            },
                        },
                        {
                            loader: "sass-loader",
                        },
                    ],
                },
                {
                    test: /\.(mp4|svg|png|jpe?g|gif)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "[name].[hash].[ext]",
                        },
                    },
                },
            ],
        },
        output: {
            publicPath: "/",
            filename: "bundle.js",
            path: path.resolve(__dirname, "dist"),
        },
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, "public", "index.html"),
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css",
            }),
        ],
    };
};
