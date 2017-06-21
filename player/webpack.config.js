const path = require('path');
const webpack2 = require('webpack');


module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'player.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] },
                }],
            },

            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }

            // Loaders for other file types can go here
        ]
    },

    plugins: [
        new webpack2.DefinePlugin({
            'process.env': { 'NODE_ENV': "'production'" }
        }),
        //new webpack2.optimize.UglifyJsPlugin()
    ],
};