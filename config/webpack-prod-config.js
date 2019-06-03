const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = require('./paths');
// import common webpack config
const common = require('./webpack-common-config.js');

module.exports = merge(common, {
    entry: ['@babel/polyfill', paths.appIndexJs],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css|scss)$/,
                // in the `src` directory
                include: [path.resolve(paths.appSrc)],
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            // This enables local scoped CSS based in CSS Modules spec
                            // modules: true,
                            // generates unique name for each class (e.g. app__app___2x3cr)
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ]
            }
        ]
    },
    plugins: [
        // new UglifyJSPlugin(),
        // Set process.env.NODE_ENV to production
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        // Extract text/(s)css from a bundle, or bundles, into a separate file.
        // new ExtractTextPlugin('styles.css')
    ]
});