const AppError = require('../common/exception/app_error');
const ApiNotFoundError = require('../common/exception/not_found_error');
const ErrorCode = require('../common/exception/error_code');

module.exports = () => {
  return async function errorHandler(ctx, next) {
    function isAccessError(error) {
      return error.name === 'CanCanAccessDenied';
    }

    try {
      await next();

      const data = ctx.body;
      if (ctx.status === 404) {
        throw new ApiNotFoundError('Api Not Found');
      }
      ctx.body = { meta: { code: 0, message: null }, data };
      ctx.status = 200;
    } catch (err) {
      let code = null,
        error = 'INTERNAL_ERROR',
        message = null;

      if (err instanceof AppError) {
        code = err.code;
        error = err.constructor.name;
        message = err.message;
      } else if (isAccessError(err)) {
        code = ErrorCode.ACCESS_ERROR;
        error = 'ACCESS_ERROR';
        message = '禁止访问';
      } else {
        code = 1;
        message = 'Server Error';
      }

      ctx.app.emit('error', err, ctx);
      ctx.status = 200;
      ctx.body = { meta: { code, error, message } };
    }
  };
};
