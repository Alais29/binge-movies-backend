import passport from 'passport'
import passportLocal, {
  // IStrategyOptions,
  IStrategyOptionsWithRequest,
} from 'passport-local'
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
    if (password !== req.body.confirmPassword) {
      throw new CustomError(
        400,
        "The passwords don't match",
        `-${EErrorCodes.UserSignUpError}`,
      )
    }
    const user = await usersModelDb.save({ email, password })
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
      return done(null, false)
    }

    console.log(`Login successful for user ${email}, ${new Date()}`)
    return done(null, user, { message: 'Logged in Successfully' })
  } catch (error) {
    return done(error)
  }
}

passport.use('signup', new LocalStrategy(strategyOptions, signupFunction))
passport.use('login', new LocalStrategy(strategyOptions, loginFunction))
passport.use(
  new Strategy(
    {
      secretOrKey: config.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token'),
    },
    async (
      token: { user: IUser },
      done: (
        error: any,
        user?: any,
        options?: passportLocal.IVerifyOptions | undefined,
      ) => void,
      // eslint-disable-next-line consistent-return
    ) => {
      try {
        return done(null, token.user)
      } catch (error) {
        done(error)
      }
    },
  ),
)

export default passport
