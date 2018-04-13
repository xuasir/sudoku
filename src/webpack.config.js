const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Ex = require('extract-text-webpack-plugin');
module.exports = {
    entry:{
        app: './js/app.js'
    },
    output: {
        path: path.resolve(__dirname,'..\/www'),
        filename: 'js/' + '[name].bulid.js'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                use:['babel-loader'],
                include: path.resolve(__dirname,'./js'),
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: Ex.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader']
                }),
                include: path.resolve(__dirname,'./css'),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new Ex('css/'+'[name].bulid.css'),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['app'],
            hash: false,
            minfy: {
                removeAttributeQuotes:true
            }
        })
    ],
    devServer: {
        contentBase: './wwww',
        host: 'localhost',
        port: '9000',
        compress: true
    }
}