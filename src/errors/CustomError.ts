export class CustomError extends Error {
  public statusCode

  public message

  public errorCode

  constructor(statusCode = 500, message = 'Unknown Error', errorCode = '0') {
    super()
    this.statusCode = statusCode
    this.message = message
    this.errorCode = errorCode
    Error.captureStackTrace(this)
  }
}
