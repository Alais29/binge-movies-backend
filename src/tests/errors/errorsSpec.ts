import { CustomError } from '@/errors/CustomError'

describe('CustomError class:', () => {
  it('should return the status code established on the constructor or 500 if no code is passed', () => {
    const error = new CustomError(400)
    const error2 = new CustomError()

    expect(error.statusCode).toBe(400)
    expect(error2.statusCode).toBe(500)
  })
  it('should return the message established on the constructor or "Unknown Error" if no message is passed', () => {
    const error = new CustomError(400, 'Show not found')
    const error2 = new CustomError()

    expect(error.message).toBe('Show not found')
    expect(error2.message).toBe('Unknown Error')
  })
  it('should return the error code established on the constructor or 0 is no code is passed', () => {
    const error = new CustomError(400, 'Show not found', '-1')
    const error2 = new CustomError()

    expect(error.error).toBe('-1')
    expect(error2.error).toBe('0')
  })
})
