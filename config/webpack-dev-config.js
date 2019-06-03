const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

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
                            importLoaders: 1,
                            // This enables local scoped CSS based in CSS Modules spec
                            // modules: true,
                            // generates a unique name for each class (e.g. app__app___2x3cr)
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
    ],
    devServer: {
        contentBase: paths.appBuild,
        hot: true
    }
});