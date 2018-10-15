'use strict'
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");
const path = require('path');

var fs = require('fs');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

var config = {
    mode: 'development',
    watch: true,
    watchOptions: {
        ignored: [/node_modules/,'/backend/','/build/','/certs/','/.dist/','/dist/',"/generator/"]
    },
    devServer: {
        contentBase: "./dist",
        stats: 'minimal',
        port: 8080,
        host: '0.0.0.0',
        index: '',
        hot: true,
        watchOptions: {
            poll: true
        },
        https: {
            key: fs.readFileSync(path.join(__dirname,'..','certs/testing.key')),
            cert: fs.readFileSync(path.join(__dirname,'..','certs/testing.crt')),
        },
        proxy: {
            '/api': {
                target: 'https://backend:8080',
                secure: false,
                pathRewrite: {'^/api' : ''}
            }
        }
    },
    optimization: {
        minimize: false,
        splitChunks: {
            cacheGroups: {
                'vendor': {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    enforce:true,
                    priority: 1
                },
            }
        }
    },
    context: path.join(__dirname,'..'),
    output: {
        path: path.join(__dirname,'..','dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }, {
                test: /\.js$/,
                use: 'babel-loader'
            }, {
                test: /\.styl(us)?$/,
                use: ['vue-style-loader', 'css-loader', 'stylus-loader']
            },
            /*{
                test: /\.(js|vue)$/,
                use: 'eslint-loader',
                enforce: 'pre'
            },*/
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, '..')
        }),

        new VueLoaderPlugin(),
        new CopyWebpackPlugin([{
            from: resolve('frontend/assets/'),
            to: resolve('dist/assets/'),
            toType: 'dir'
        }]),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        new webpack.HotModuleReplacementPlugin({ quiet: true }),
        new webpack.DefinePlugin({
            CONFIG: JSON.stringify(require("../frontend/config/config.development")),
        })

    ]

};
function addHTMLPlugins(){
    var entry={};

    const pagesPath = path.join(__dirname,'./pages/');

    let files = fs.readdirSync(pagesPath);
    files.forEach(function (fileName) {
        //if file is a folder
        if (fs.lstatSync(path.join(pagesPath,fileName)).isDirectory()){
            //if folder has a page.json inside
            if (fs.existsSync(path.join(pagesPath,fileName,'page.json'))) {
                //if page.json is valid
                try{
                    var page = JSON.parse(fs.readFileSync(path.join(pagesPath,fileName,'page.json')));
                    config.plugins.push(new HtmlWebpackPlugin({
                        filename: `${page.name}.html`,
                        template: page.template|| './frontend/templates/default.html',
                        chunks: [page.name,'vendor'],
                        inject: true
                    }))
                    entry[page.name] = `./frontend/pages/${page.name}/${page.entryPoint}`
                }
                catch (e){
                    console.error("Invalid page.json file for page folder " + fileName);
                }
            }
            else{
                console.error("Missing page.json file for page folder " + fileName);
            }
        }
    });
    config.entry = entry;

}
addHTMLPlugins();

module.exports = config;