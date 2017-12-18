let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('build'),
        filename: 'bundle.js',
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            {test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"], exclude: /node_modules/},
            {test: /\.(jpg|png|gif|svg)$/, use: "url-loader", exclude: /node_modules/},
        ]
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
}