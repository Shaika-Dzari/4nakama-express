var path = require('path');

var PATHS = {
    app: path.join(__dirname, 'app/ui'),
    build: path.join(__dirname, 'public')
};

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: ['babel-polyfill', PATHS.app]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                // Enable caching for improved performance during development
                // It uses default OS directory by default. If you need something
                // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
                loaders: ['babel?cacheDirectory'],
                // Parse only app files! Without this it will go through entire project.
                // In addition to being slow, that will most likely result in an error.
                include: PATHS.app
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style', // backup loader when not building .css file
                    'css!sass' // loaders to preprocess CSS
                )
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css", {
            allChunks: true
        })
    ]
};