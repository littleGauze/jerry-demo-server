'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1623729369384_8185';

  // add your config here
  config.middleware = [ 'sanitizer' ];

  return config;
};
