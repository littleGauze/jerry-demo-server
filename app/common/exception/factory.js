const ErrorCode = require('./error_code');
const AccessError = require('./access_error');
const NotFoundError = require('./not_found_error');
const ApiNotFoundError = require('./api_not_found_error');
const TokenDisabledError = require('./token_disabled_error');
const TokenExpireError = require('./token_expire_error');
const ValidateError = require('./validate_error');

const ERROR_MAP = {
  [ErrorCode.ACCESS_ERROR]: AccessError,
  [ErrorCode.NOT_FOUND_ERROR]: NotFoundError,
  [ErrorCode.API_NOT_FOUND_ERROR]: ApiNotFoundError,
  [ErrorCode.TOKEN_DISABLED_ERROR]: TokenDisabledError,
  [ErrorCode.TOKEN_EXPIRE_ERROR]: TokenExpireError,
  [ErrorCode.VALIDATE_ERROR]: ValidateError,
};

class ExceptionFactory {
  static buildFromData(data) {
    const C = ERROR_MAP[data.code];
    if (C) {
      return new C(data.message);
    }
    return new Error(data.message);
  }
}

module.exports = ExceptionFactory;
