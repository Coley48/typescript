const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    target: "web", // 默认
    entry: {
        main: "./src/index.ts",
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            "@": "/src"
        }
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/
        }, {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"]
        }, {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        }, {
            test: /\.(fbx|stl)$/i,
            type: 'asset/resource',
        }]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/assets/html/index.html",
        })
    ],
    devServer: {
        compress: true,
        port: 8000,
        open: true,
        hot: true,
    },
}