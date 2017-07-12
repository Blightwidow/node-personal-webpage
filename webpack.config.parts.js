const ExtractTextPlugin = require("extract-text-webpack-plugin");

exports.extractCss = ({use}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(use)
      }
    ]
  },
  plugins: [new ExtractTextPlugin("css/[name].css")]
});

exports.optimizeImages = ({query}) => ({
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: query
          }
        ]
      }
    ]
  }
});

exports.copyAssets = () => ({
  module: {
    rules: [
      {
        test: /\.(json|txt|appcache)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  }
});

exports.copyViews = () => ({
  module: {
    rules: [
      {
        test: /\.(html|mustache)$/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: '../[path][name].[ext]',
              context: 'src/frontend/'
            }
          }
        ]
      }
    ]
  }
});

exports.compileTs = ({use}) => ({
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use
      }
    ]
  },
  devtool: 'sourcemap'
});

exports.postCss = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('postcss-import')({}),
      require('postcss-cssnext')({browsers: "> 5%"}),
      require('cssnano')({autoprefixer: false})
    ])
  }
});
