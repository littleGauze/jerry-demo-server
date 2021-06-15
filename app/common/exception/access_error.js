const AppError = require('./app_error');
const ErrorCode = require('./error_code');

class AccessError extends AppError {
  constructor(message = '禁止访问') {
    super(message);
    this.code = ErrorCode.ACCESS_ERROR;
  }
}

module.exports = AccessError;
