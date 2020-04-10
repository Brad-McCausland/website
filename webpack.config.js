var path = require('path');
const webpack = require('webpack');

module.exports =
{
    mode: "production",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    entry: path.resolve(__dirname, 'dist/main.js'),
    plugins:
    [
        new webpack.HashedModuleIdsPlugin(),
    ],

    devServer:
    {
        historyApiFallback: true
    },
    output:
    {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[contenthash].js",
    },

    resolve:
    {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".js", ".ts", ".tsx"]
    },

    optimization:
    {
        runtimeChunk: 'single',
        splitChunks:
        {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups:
            {
                vendor:
                {
                    test: /[\\/]node_modules[\\/]/,
                    name(module)
                    {
                        const name = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${name.replace("@", "")}`;
                    },
                },
            },
        },
    },

    module:
    {
        rules:
        [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            // load css files?
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/'
                    }
                  }
                ]
              }
        ]
    }
};