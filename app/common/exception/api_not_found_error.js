const ApiError = require('./api_error');
const ErrorCode = require('./error_code');

class ApiNotFoundError extends ApiError {
  constructor(message) {
    super(message);
    this.code = ErrorCode.API_NOT_FOUND_ERROR;
  }
}

module.exports = ApiNotFoundError;
