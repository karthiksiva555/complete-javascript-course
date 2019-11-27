const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// four configurations: entry, output, loaders and plugins
module.exports = {
    entry:'./src/js/index.js', // this is where the bundling starts and evaluates all the imports and dependencies
    output:{ // this is where the bundled js should be saved with the below file name and under path mentioned
        path:path.resolve(__dirname, 'dist'), // when live reloading is enabled, the webpack dev server 
                                              //injects bundle.js to the dist/index.html on the fly
        filename:'js/bundle.js'
    },
    // to let webpack-dev-server to serve the code from a web server from the mentioned folder, dist in this case
    devServer:{
        contentBase:'./dist'
    },
    // plugin: to inject index.html from src to dist and insert bundled js into that template
    // npm install html-webpack-plugin
    // array of all the plugins we use
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html', // name of file that will be created in dist folder; 
            //delete dist/index.html to test if this setting is recreating the index.html in dist folder
            template:'./src/index.html'
        })
    ]
};