'use strict';

const Controller = require('egg').Controller;
const ValidateError = require('../common/exception/validate_error');

class BaseController extends Controller {

  async validate(method, opts = { allowUnknown: false }) {
    const { ctx } = this;
    const rules = this.constructor.RULES;
    const types = [ 'query', 'body', 'params' ];
    let ret = {};

    for (const type of types) {
      let res = null;
      const schema = rules[method][type];
      if (schema) {
        let val = ctx[type];
        if (type === 'body') {
          val = ctx.request[type];
        }
        try {
          res = await schema.validateAsync((val || {}), { opts });
        } catch (e) {
          const message = e.details.map(it => it.message).join(', ');
          throw new ValidateError(message);
        }
      }
      ret = { ...ret, [type]: res };
    }

    return ret;
  }
}

module.exports = BaseController;
