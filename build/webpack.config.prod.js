'use strict'
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const WebpackShellPlugin = require('webpack-shell-plugin');
const path = require('path');

var fs = require('fs');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

var config = {
    mode: 'production',
    devtool:false,
    context: path.resolve(__dirname,'..'),
    output: {
        path: path.resolve(__dirname,'..','dist/frontend/'),
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
            to: resolve('dist/frontend/assets/'),
            toType: 'dir'
        }]),
        new CopyWebpackPlugin([{
            from: resolve('backend/'),
            to: resolve('dist/backend/'),
        }],{
            ignore: [ 'node_modules/**/*'] //just to be safe
        }),
        new CopyWebpackPlugin([{
            from: resolve('package.json'),
            to: resolve('dist/backend/package.json'),
        }],{
            ignore: [ 'node_modules/**/*'] //just to be safe
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        new MinifyPlugin({}, {
            test:/\.js($|\?)/
        }),
        new WebpackShellPlugin({onBuildEnd:['npm --prefix ./dist/backend install --production ./dist/backend']})
    ]

};
function addHTMLPlugins(){
    var entry={};

    const pagesPath = path.join(__dirname,'..','frontend/pages/');

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
                        chunks: [page.name],
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