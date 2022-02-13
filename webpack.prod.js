const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');
const dts = require('dts-bundle');

class DtsWebpackPlugin {
    constructor() {
        this.filename = 'renderer.min.d.ts';
        this.options = {
            baseDir: './',
            name: 'renderer',
            main: 'lib/index.d.ts',
            out: 'lib/' + this.filename
        };
    }

    apply(compiler) {
        compiler.hooks.initialize.tap('DtsWebpackPlugin', (compilation) => {
            return dts.bundle(this.options);
        });
        compiler.hooks.done.tap('DtsWebpackPlugin', () => {
            const data = fs.readFileSync(this.options.out, 'utf8');

            fs.writeFileSync(
                path.resolve(__dirname, 'dist/' + this.filename),
                data.replace(
                    "declare module 'renderer'",
                    'export as namespace renderer;\nexport = renderer;\n\ndeclare module renderer'
                )
            );
        });
    }
}

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
    target: 'web',
    entry: {
        renderer: './src/index.ts'
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
    plugins: [new webpack.BannerPlugin(banner), new DtsWebpackPlugin()]
};
