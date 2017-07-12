/* eslint-disable import/no-extraneous-dependencies */
const serverConfs = require('./webpack.config.server');
const frontEndConfs = require('./webpack.config.frontend');

module.exports = (env) => {
  if (env === 'production') {
    return [frontEndConfs.prod, serverConfs.prod];
  }
  return [frontEndConfs.dev, serverConfs.dev];
};
