const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
    resolve: { 
        extensions: [ '.tsx', '.ts']
    },
    entry: {
        index: './index.ts',
    },
    output: {
        path: path.resolve(__dirname),
        filename: '../../client_packages/index.js'
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals({
        modulesDir:'../../node_modules',
    })],  // in order to ignore all modules in node_modules folder
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