const joi = require('joi');
const BaseController = require('../common/base_controller');

module.exports = {
  get BaseController() {
    return BaseController;
  },

  get joi() {
    return joi;
  },
};
