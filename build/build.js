const webpack = require('webpack');
const chalk = require('chalk')

const webpackConfig = require('./webpack.config.prod.js')

const ARGS = process.argv.slice(2);
if (ARGS[0]){
    process.env.NODE_ENV = ARGS[0];
}
else{
    process.env.NODE_ENV = 'production';
}

webpack(webpackConfig, (err, stats) => {
    if (err) throw err
    console.log(stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: true,
        chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
    ))
});