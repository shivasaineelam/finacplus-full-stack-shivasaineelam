const Responder = require( './responder' )

const ResponseFormatter = () => {}

ResponseFormatter.operationSuccess = ( res, data, message = '', statusCode = 200 ) => {
  const successResponse = {
    statusCode,
    data,
    message,
  }
  return Responder.success( successResponse, res )
}



ResponseFormatter.operationFailed = ( res, error, type, path ) => {
  if ( type && path ) {
    error.data = {
      type,
      path,
    }
  }
  const failedResponse = {
    statusCode: error?.status,
    message: error?.message,
    error: error?.data,
  }
  return Responder.fail( failedResponse, res )
}

module.exports = ResponseFormatter