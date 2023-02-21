import { Request, Response } from 'express'
import { EErrorCodes } from '@/common/enums/errors'

export const unknownEndpoint = (req: Request, res: Response): void => {
  res.status(404).send({
    error: `-${EErrorCodes.UnknownEndpoint}`,
    message: `Route ${req.originalUrl} method ${req.method} not implemented`,
  })
}
