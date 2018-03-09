const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './src/main.js',

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'build.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },

    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
        contentBase: path.resolve(__dirname, 'public')
    },

    performance: {
      hints: false
    },

    devtool: '#eval-source-map'
}
