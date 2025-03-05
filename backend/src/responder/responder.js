const sendHttpResponse = ( res, statusCode, responseObj ) => {
    return res.status( statusCode ).json( responseObj )
  }
  
  const Responder = () => {}
  
  Responder.success = async ( responseObj, res ) => {
    const statusCode = responseObj?.statusCode || 200
    const updatedResponseObj = {
      data: responseObj?.data,
      message: responseObj?.message,
    }
    return sendHttpResponse( res, statusCode, updatedResponseObj )
  }
  
  Responder.fail = async ( responseObj, res ) => {
    responseObj.statusCode = responseObj?.statusCode || 500
    const statusCode = responseObj?.statusCode
    return sendHttpResponse( res, statusCode, responseObj )
  }
  module.exports = Responder
  