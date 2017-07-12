/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const merge = require('webpack-merge');
const fs = require('fs');
const parts = require('./webpack.config.parts');

const nodeModules = getExternalNode();

const baseConfig = {
  target: 'node',
  name: 'server',
  context: path.join(__dirname, "dist"),
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: {
    server: path.join(__dirname, 'src/backend/server.ts')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js'
  },
  externals: nodeModules,
  stats: "minimal"
};

exports.dev = merge([
  baseConfig,
  parts.compileTs({use: ['ts-loader']})
]);

exports.prod = merge([
  baseConfig,
  parts.compileTs({use: ['ts-loader']})
]);

function getExternalNode() {
  let nodeModules = {};
  fs.readdirSync('node_modules').filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  }).forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });
  return nodeModules;
}
