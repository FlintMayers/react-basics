var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public'),
        publicPath: "/public/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-stage-0', '@babel/preset-stage-1']
    }
                }
            }
        ]
    },
    devServer: {
        port: 3000,
        historyApiFallback: {
            index: path.resolve(__dirname, './public/index.html')
        }
    }
};