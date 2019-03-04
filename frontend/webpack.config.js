const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
    entry:'./src/index.jsx',
    output:{
        path:path.resolve(__dirname,'public'),
        filename: './bundle.js'
    },
    devServer:{
        port:8080,
        contentBase:path.join(__dirname,'public'),
        compress:true
    },
    resolve:{
      extensions:['.js','.jsx'],
      alias:{
          modules: path.resolve(__dirname,'node_modules')
      }
    },
    module:{
        rules: [
            {
              test: /\.m?jsx$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env',"@babel/preset-react"],
                  plugins: ['@babel/plugin-proposal-object-rest-spread']
                }
              }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.woff|.woff2|.ttf|.eot|.svg*.*$/,
                use:{
                    loader:'file-loader'
                }
            }
        ]
    }
}