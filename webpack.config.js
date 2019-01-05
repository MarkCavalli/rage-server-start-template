const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
    resolve: { 
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    entry: {
        'packages/RP': './app/server',
        'client_packages': './app/client',
    },
    output: {
        path: path.resolve(__dirname),
        filename: '[name]/index.js'
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            },
        ]
    }
};