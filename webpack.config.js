var ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');

module.exports = (webpackConfig)=>{

    // Alias
    webpackConfig.resolve.alias = {
        components: `${__dirname}/src/components`,
        utils: `${__dirname}/src/utils`,
        config: `${__dirname}/src/utils/config`,
        services: `${__dirname}/src/services`
    }

  
    // webpackConfig.module.rules[3] = {};
    // webpackConfig.module.rules[5] = {
    //     test:/\.(css)$/,
    //     use:extractCSS.extract([ 'css-loader', 'postcss-loader' ])
    // }
    // webpackConfig.module.rules[4] = {};
    // webpackConfig.module.rules[6] = {
    //     test:/\.(less)$/,
    //     loader:extractLESS.extract([ 'css-loader', 'less-loader' ])
    // }
    // webpackConfig.plugins.unshift( extractCSS,extractLESS);

    return webpackConfig;
}

// let webpack = { 
//     devtool: '#cheap-module-eval-source-map',
//     entry:{ 
//       index:[ 'G:\\PHP\\wamp64\\www\\framework\\gitTest\\hy-admin2.0\\frontEnd2\\node_modules\\react-dev-utils\\webpackHotDevClient.js',
//         '.\\src/index.js' ] 
//     },
//     output:{ 
//          path: 'G:\\PHP\\wamp64\\www\\framework\\gitTest\\hy-admin2.0\\frontEnd2\\dist',
//          filename: '[name].js',
//          publicPath: '/',
//          libraryTarget: 'var',
//          chunkFilename: '[name].async.js' 
//     },
//     resolve:{ 
//         modules:
//           [ 'G:\\PHP\\wamp64\\www\\framework\\gitTest\\hy-admin2.0\\frontEnd2\\node_modules',
//             'G:\\PHP\\wamp64\\www\\framework\\gitTest\\hy-admin2.0\\frontEnd2\\node_modules\\roadhog\\node_modules',
//             'node_modules' ],

//         extensions:[ '.web.js','.web.jsx','.web.ts','.web.tsx','.js','.json','.jsx','.ts','.tsx' ],

//         alias:{ 
//             components: 'G:\\PHP\\wamp64\\www\\framework\\gitTest\\hy-admin2.0\\frontEnd2/src/components',
//             utils: 'G:\\PHP\\wamp64\\www\\framework\\gitTest\\hy-admin2.0\\frontEnd2/src/utils',
//             config: 'G:\\PHP\\wamp64\\www\\framework\\gitTest\\hy-admin2.0\\frontEnd2/src/utils/config',
//             services: 'G:\\PHP\\wamp64\\www\\framework\\gitTest\\hy-admin2.0\\frontEnd2/src/services' 
//         } 
//     },
//     resolveLoader:{
//         modules:[ 
//             'G:\\PHP\\wamp64\\www\\framework\\gitTest\\hy-admin2.0\\frontEnd2\\node_modules',
//             'G:\\PHP\\wamp64\\www\\framework\\gitTest\\hy-admin2.0\\frontEnd2\\node_modules\\roadhog\\node_modules' 
//         ],
//         moduleExtensions: [ '-loader' ] 
//     },
//     module:{ 
//         rules:[
//              { exclude: [Object], loader: 'url', options: [Object] },
//              { test: /\.(js|jsx)$/,
//                include: 'G:\\PHP\\wamp64\\www\\framework\\gitTest\\hy-admin2.0\\frontEnd2\\src',
//                loader: 'babel',
//                options: [Object] },
//              { test: /\.css$/,
//                include: [Function: bound includeTest],
//                use: [Object] },
//              { test: /\.less$/,
//                include: [Function: bound includeTest],
//                use: [Object] },
//              { test: /\.css$/,
//                include: [Function: bound includeTest],
//                use: [Object] },
//              { test: /\.less$/,
//                include: [Function: bound includeTest],
//                use: [Object] },
//              { test: /\.html$/, loader: 'file', options: [Object] },
//              { test: /\.tsx?$/,
//                include: 'G:\\PHP\\wamp64\\www\\framework\\gitTest\\hy-admin2.0\\frontEnd2\\src',
//                use: [Object] },
//              { test: /\.svg$/, loader: 'file', options: [Object] } 
//         ]
//     },
//   plugins:
//    [ HotModuleReplacementPlugin {
//        options: {},
//        multiStep: undefined,
//        fullBuildTimeout: 200,
//        requestTimeout: 10000 },
//      CaseSensitivePathsPlugin { options: {}, pathCache: [Object], fsOperations: 1 },
//      WatchMissingNodeModulesPlugin {
//        nodeModulesPath: 'G:\\PHP\\wamp64\\www\\framework\\gitTest\\hy-admin2.0\\frontEnd2\\node_modules' },
//      SystemBellPlugin {},
//      DefinePlugin { definitions: [Object] },
//      { apply: [Function: apply] },
//      LoaderOptionsPlugin { options: [Object] } ],
//   externals: undefined,
//   node: { fs: 'empty', net: 'empty', tls: 'empty' } }
