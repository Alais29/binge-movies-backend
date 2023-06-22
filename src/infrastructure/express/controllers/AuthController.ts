import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import passport from '../middlewares/auth'
import { CustomError } from '@/errors/CustomError'
import { EErrorCodes } from '@/common/enums/errors'
import { config } from '@/config'

export abstract class AuthController {
  public static async signupUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    passport.authenticate(
      'signup',
      // eslint-disable-next-line consistent-return
      (err: any, user: any, info: { message: string | undefined }) => {
        try {
          if (err) {
            return next(err)
          }
          if (!user) {
            throw new CustomError(
              500,
              info.message,
              `-${EErrorCodes.UserSignUpError}`,
            )
          }
          res.status(201).json({ message: 'Successful Signup!' })
        } catch (error) {
          return next(error)
        }
      },
    )(req, res, next)
  }

  public static async loginUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    // eslint-disable-next-line consistent-return
    passport.authenticate('login', async (err: any, user: any) => {
      try {
        if (err) {
          return next(err)
        }

        req.login(user, { session: false }, async error => {
          if (error) return next(error)

          const body = { id: user.id, email: user.email }
          const expire = Date.now() + 60 * 60 * 1000
          const token = jwt.sign({ user: body, expire }, config.JWT_SECRET)

          return res.status(200).json({ token })
        })
      } catch (error) {
        return next(error)
      }
    })(req, res, next)
  }
}
