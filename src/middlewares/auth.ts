import passport from 'passport'
import passportLocal, { IStrategyOptionsWithRequest } from 'passport-local'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Request } from 'express'
import { usersModelDb } from '@/models/userModel'
import { IUser } from '@/common/interfaces/users'
import { config } from '@/config'
import { CustomError } from '@/errors/CustomError'
import { EErrorCodes } from '@/common/enums/errors'

const LocalStrategy = passportLocal.Strategy

const strategyOptions: IStrategyOptionsWithRequest = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}

const signupFunction = async (
  req: Request,
  email: string,
  password: string,
  done: (
    error: any,
    user?: any,
    options?: passportLocal.IVerifyOptions | undefined,
  ) => void,
  // eslint-disable-next-line consistent-return
): Promise<void> => {
  try {
    const isValidEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email)
    if (!isValidEmail) {
      throw new CustomError(
        400,
        'The email is not valid',
        `-${EErrorCodes.UserSignUpError}`,
      )
    }

    if (password !== req.body.confirmPassword) {
      throw new CustomError(
        400,
        "The passwords don't match",
        `-${EErrorCodes.UserSignUpError}`,
      )
    }
    const user = await usersModelDb.save({ email, password, favoriteShows: [] })

    console.log(`Signup successful for user ${email}, ${new Date()}`)
    return done(null, user)
  } catch (error) {
    done(error)
  }
}

const loginFunction = async (
  req: Request,
  email: string,
  password: string,
  done: (
    error: any,
    user?: any,
    options?: passportLocal.IVerifyOptions | undefined,
  ) => void,
) => {
  try {
    const user = await usersModelDb.query(email)

    if (!(await user.isValidPassword(password))) {
      console.log(`Login failed for user ${email}: password is incorrect`)
      throw new CustomError(
        400,
        'There was an issue logging you in, please check your email and password',
        `-${EErrorCodes.UserLoginError}`,
      )
    }
    console.log(`Login successful for user ${email}, ${new Date()}`)
    return done(null, user, { message: 'Logged in Successfully' })
  } catch (error) {
    if (
      error instanceof CustomError &&
      error.error === `-${EErrorCodes.UserNotFound}`
    ) {
      console.log(`Login failed for user ${email}: user does not exist`)
      return done(
        new CustomError(
          400,
          'There was an issue logging you in, please check your email and password',
          `-${EErrorCodes.UserNotFound}`,
        ),
      )
    }
    return done(error)
  }
}

passport.use('signup', new LocalStrategy(strategyOptions, signupFunction))
passport.use('login', new LocalStrategy(strategyOptions, loginFunction))
passport.use(
  new Strategy(
    {
      secretOrKey: config.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (
      payload: { user: IUser; expire: number },
      done: (
        error: any,
        user?: any,
        options?: passportLocal.IVerifyOptions | undefined,
      ) => void,
      // eslint-disable-next-line consistent-return
    ) => {
      try {
        if (payload.expire < Date.now())
          throw new CustomError(
            401,
            'Token expired',
            `-${EErrorCodes.TokenExpired}`,
          )
        return done(null, payload.user)
      } catch (error) {
        done(error)
      }
    },
  ),
)

export default passport
