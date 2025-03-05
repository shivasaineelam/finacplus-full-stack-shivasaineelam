const Responder = require( './responder' )

const ResponseFormatter = () => {}

ResponseFormatter.operationSuccess = ( res, data, message = '', statusCode  ) => {
  const successResponse = {
    statusCode,
    data,
    message,
  }
  return Responder.success( successResponse, res )
}



ResponseFormatter.operationFailed = ( res, error, message, statusCode ) => {

  const failedResponse = {
    statusCode: statusCode,
    message: message,
    error: error,
  }
  return Responder.fail( failedResponse, res )
}

module.exports = ResponseFormatter