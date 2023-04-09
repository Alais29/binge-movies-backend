import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import passport from '@/middlewares/auth'
import { CustomError } from '@/errors/CustomError'
import { EErrorCodes } from '@/common/enums/errors'

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
        if (err) {
          console.log('Error signing up user')
          return next(err)
        }
        if (!user) {
          throw new CustomError(
            500,
            `${EErrorCodes.UserSignUpError}`,
            info.message,
          )
        }
        res.status(201).json({ message: 'Successful Signup!' })
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
        if (err || !user) {
          console.log(
            `Login failed for user ${req.body.email}: User doesn't exist`,
          )
          const error = new CustomError(
            500,
            'There was an issue logging you in, please check your email and password',
            `-${EErrorCodes.UserLoginError}`,
          )

          return next(error)
        }

        req.login(user, { session: false }, async error => {
          if (error) return next(error)

          const body = { id: user.id, email: user.email }
          // TODO: change string to sign the token
          const token = jwt.sign({ user: body }, 'TOP_SECRET')

          return res.json({ token })
        })
      } catch (error) {
        return next(error)
      }
    })(req, res, next)
  }
}
