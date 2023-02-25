import { ErrorRequestHandler, NextFunction } from 'express'
import { config } from '@/config'

interface IErrorInfo {
  error: string
  message: string
  stack: string
}

export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next: NextFunction,
) => {
  const { statusCode, message, error, stack } = err
  const errorInfo: IErrorInfo = {
    error,
    message,
    stack,
  }

  if (config.NODE_ENV !== 'test')
    console.log(`Error: ${error}, Message: ${message}, Stack: ${stack} `)

  res.status(statusCode || 500).json({ data: errorInfo })
}
