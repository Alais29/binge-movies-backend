export class CustomError extends Error {
  public statusCode

  public message

  public error

  constructor(statusCode = 500, message = 'Unknown Error', error = '0') {
    super(error)
    this.statusCode = statusCode
    this.message = message
    this.error = error
    Error.captureStackTrace(this)
  }
}
