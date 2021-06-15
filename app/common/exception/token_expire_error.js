const AppError = require('./app_error');
const ErrorCode = require('./error_code');

class TokenExpiredError extends AppError {
  constructor(message) {
    super(message);
    this.code = ErrorCode.TOKEN_EXPIRE_ERROR;
  }
}

module.exports = TokenExpiredError;
