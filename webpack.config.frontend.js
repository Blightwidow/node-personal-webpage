/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const merge = require('webpack-merge');
const fs = require('fs');
const glob = require('glob');
const parts = require('./webpack.config.parts');

const baseConfig = {
  name: 'frontend',
  entry: {
    bundle: path.join(__dirname, 'src/frontend/public/js/bundle/main.ts'),
    sw: path.join(__dirname, 'src/frontend/public/js/serviceWorker/index.ts'),
    style: path.join(__dirname, 'src/frontend/public/css/_MAIN_.css'),
    images: glob.sync(path.join(__dirname, 'src/frontend/public/images/**.*')),
    assets: glob.sync(path.join(__dirname, 'src/frontend/public/assets/**.*')),
    views: glob.sync(path.join(__dirname, 'src/frontend/views/**/*.mustache')),
  },
  output: {
    path: path.join(__dirname, 'dist/public'),
    filename: '[name].js',
    chunkFilename: "[id].js"
  },
  stats: "minimal"
};

exports.dev = merge([
  baseConfig,
  parts.compileTs({use: ['ts-loader']}),
  parts.extractCss({use: ['css-loader']}),
  parts.copyAssets(),
  parts.copyViews(),
  parts.optimizeImages({
    options: {
      query: {
        mozjpeg: {
          progressive: true
        },
        gifsicle: {
          interlaced: true
        },
        optipng: {
          optimizationLevel: 7
        }
      }
    }
  })
]);

exports.prod = merge([
  baseConfig,
  parts.copyAssets(),
  parts.copyViews(),
  parts.compileTs({
    use: [
      {
        loader: 'babel-loader',
        options: {
          minified: true,
          presets: ['env']
        }
      },
      'ts-loader'
    ]
  }),
  parts.extractCss({
    use: ['css-loader', parts.postCss()]
  }),
  parts.optimizeImages({
    options: {
      query: {
        mozjpeg: {
          progressive: true
        },
        gifsicle: {
          interlaced: true
        },
        optipng: {
          optimizationLevel: 7
        }
      }
    }
  })
]);
