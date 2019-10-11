const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

const conf = {
    entry: {
        pageIndex: './src/index.js',
    },

    output: {
        path: path.resolve(__dirname,'./dist/'),
        filename: '[name].js',
        publicPath: 'dist/'
    },
    devServer:{
        port: 1234,
        // contentBase: __dirname + "src",
        overlay: true,
    },

    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: 'chunk.css',
          ignoreOrder: false,
        }),
        new HtmlWebpackPlugin({
          inject: false,
          hash: true,
          template: './src/pages/index.html',
          filename: 'index.html',
          chunks: ['pageIndex']
        }),
    ],
    module:{
        rules:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
            },
            {
                test: /\.scss$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    {
                        loader:"css-loader"
                    },
                    {
                        loader:"sass-loader"
                    },
                ]
                
            },

            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                        name: '[name].[ext]',
                        publicPath:'./images',
                        outputPath: 'images'
                      }
                    }
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                          name: '[name].[ext]',
                          publicPath:'./fonts',
                          outputPath: 'fonts'
                        }
                    }
                ],
            },
        ]
    },
}

module.exports = (env, options) => {
    let production = options.mode === 'production'
    conf.devtool = production?false:'eval-sourcemap'
    return conf
}
