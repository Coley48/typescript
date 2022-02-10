const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');

const banner = `
${package.name}
${package.description}\n
@version v${package.version}
@repository ${package.repository.url}\n
(c) ${new Date().getFullYear()} ${package.author}
Released under the MIT License.
hash: [hash]`;

module.exports = {
    mode: 'production',
    target: 'web', // 默认
    entry: {
        'render-3d': './src/index.ts'
    },
    output: {
        library: {
            name: 'renderer',
            type: 'umd'
        },
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': '/src'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    'ts-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(fbx|stl)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(banner)
        // new require('dts-bundle-webpack')({
        //     name: "renderer",
        //     main: 'lib/**/*.d.ts',
        //     out: '../dist/renderer.min.d.ts',
        // })
    ]
};
