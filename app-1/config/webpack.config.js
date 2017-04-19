let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
	// directory used to resolve paths in entry
    context: path.resolve(__dirname, '../src'),
    entry: {
		// processes main javascript and sass
        main: [
            './js/app.js',
            './scss/main.scss'
        ],
        // uses installed npm packages for vendor code
        vendor: [
            'react',
            'react-dom',
            'react-router'
        ]
    },
    output: {
        filename: 'js/[name].bundle.js',
        publicPath: '/',
        //__dirname refers to the directory where this webpack.config.js lives
        path: path.resolve(__dirname, '../static')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['es2015', { 'modules': false }],
                                ['react']
                            ]
                        }
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            configFile: path.join(__dirname, '../.eslintrc')
                        }
                    }
                ]
            },
            // see https://github.com/webpack-contrib/sass-loader and
            // https://github.com/webpack-contrib/extract-text-webpack-plugin
            {
                test: /\.scss$/,
				        use: ExtractTextPlugin.extract(
            {
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                      // resolve-url-loader has to be chained before sass-loader
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
                // alternative with strings, see: https://webpack.js.org/configuration/module/#rule-use
                //use: ['css-loader', 'sass-loader']
            })
            },
            // see https://github.com/webpack-contrib/file-loader and
            // https://github.com/webpack-contrib/url-loader
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: '../img/',
                            outputPath: '../static/img/',
                            limit: 10000
						            }
					          }
				        ]
			      }
		  ]
    },
    devtool: NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
    plugins: [
        new ExtractTextPlugin('css/styles.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        })
    ]
};

// Extra control based on environment
// -p from webpack cli is equivalent to passing --optimize-minimize --define process.env.NODE_ENV="production"
// and --optimize-minimize uses UglifyJsPlugin, so there's no need to run it again
if (NODE_ENV === 'production') {
} else {
  // something to do on development
}
