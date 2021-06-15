const AppError = require('./app_error');
const ErrorCode = require('./error_code');

class NotFoundError extends AppError {
  constructor(message) {
    super(message);
    this.code = ErrorCode.NOT_FOUND_ERROR;
  }
}

module.exports = NotFoundError;
