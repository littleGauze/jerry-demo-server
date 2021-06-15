const AppError = require('./app_error');
const ErrorCode = require('./error_code');

class TokenDisabledError extends AppError {
  constructor(message) {
    super(message);
    this.code = ErrorCode.TOKEN_DISABLED_ERROR;
  }
}

module.exports = TokenDisabledError;
