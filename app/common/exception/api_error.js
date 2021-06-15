const AppError = require('./app_error');
const ErrorCode = require('./error_code');

class ApiError extends AppError {
  constructor(message) {
    super(message);
    this.code = ErrorCode.API_ERROR;
  }
}

module.exports = ApiError;
