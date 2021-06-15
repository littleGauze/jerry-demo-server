const AppError = require('./app_error');
const ErrorCode = require('./error_code');

class ValidateError extends AppError {
  constructor(message) {
    super(message);
    this.code = ErrorCode.VALIDATE_ERROR;
  }
}

module.exports = ValidateError;
