import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration =
{
    mode: "production",

    // Enable sourcemaps for debugging webpack's output
    devtool: "source-map",

    devServer:
    {
        historyApiFallback: true
    },
    //entry: path.resolve(__dirname, './src/index.tsx'),
    output:
    {
        path: path.resolve(__dirname, 'dist'),
        filename: "main.js",
        publicPath: "/"
    },

    resolve:
    {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".js", ".ts", ".tsx"]
    },

    /*
    optimization:
    {
        splitChunks:
        {
            chunks: 'all',
        },
    },*/

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
    },
};

export default config;