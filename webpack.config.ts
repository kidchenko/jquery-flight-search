import * as webpack from 'webpack';
import * as path from 'path';

declare var __dirname: any;
declare var process: any;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const filename = 'jquery-flight-search';
const moduleName = 'jFlightSearch';

const config: webpack.Configuration = {
    context: __dirname,
    entry: {
        vendor: [
            'jquery',
            'jquery-ui/ui/widgets/datepicker'
        ],
        lib: path.resolve(__dirname, 'src/' + filename + '.js'),
        main: path.resolve(__dirname, 'src/demo.js')
    },
    output: {
        path: path.resolve(__dirname, 'sample'),
        filename: '[name].[hash].js',
    },
    resolve: {
        extensions: ['.js', '.scss'],
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            }
        ]
    },
    devtool: 'source-map',
    target: 'web',
    devServer: {
        compress: true,
        contentBase: path.join(__dirname, 'sample'),
        hot: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'jQuery Flight Search',
            filename: path.resolve(__dirname, 'sample/index.html')
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new ExtractTextPlugin(filename + '.css')
    ]

};

if (process.env.NODE_ENV === 'production') {

    //Entry
    config.entry = path.resolve(__dirname, 'src/' + filename + '.js');

    //Library settings
    config.output.path = path.resolve(__dirname, 'dist');
    config.output.filename = filename + '.js';
    config.output.library = moduleName;
    config.output.libraryTarget = 'umd';
    config.output.umdNamedDefine = true;

    //Set externals to exclude dependencies code in distribution file
    config.externals = {
        jquery: 'jQuery',
        'jquery-ui/ui/widgets/datepicker': 'jquery-ui/ui/widgets/datepicker',
        'jquery-ui/ui/widgets/selectmenu': 'jquery-ui/ui/widgets/selectmenu',
        'jquery-ui/themes/base/datepicker.css': 'jquery-ui/themes/base/datepicker.css',
        'jquery-ui/themes/base/selectmenu.css': 'jquery-ui/themes/base/selectmenu.css'
    };
} else {

    config.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",

            // filename: "vendor.js"
            // (Give the chunk a different name)

            minChunks: Infinity,
            // (with more entries, this ensures that no other module
            //  goes into the vendor chunk)
        })
    );

}

export default config;