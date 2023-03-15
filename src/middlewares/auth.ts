import passport from 'passport'
import passportLocal, { IStrategyOptions } from 'passport-local'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { usersModelDb } from '@/models/userModel'
import { IUser } from '@/common/interfaces/users'

const LocalStrategy = passportLocal.Strategy

const strategyOptions: IStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
}

const signupFunction = async (
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
    const user = await usersModelDb.save({ email, password })

    return done(null, user)
  } catch (error) {
    done(error)
  }
}

const loginFunction = async (
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

    if (!user) {
      console.log(`Login failed for user ${email}: User doesn't exist`)
      return done(null, false)
    }

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
      secretOrKey: 'TOP_SECRET',
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
