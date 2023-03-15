import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser, IUserMongo } from '@/common/interfaces/users'
import { EErrorCodes } from '@/common/enums/errors'
import { CustomError } from '@/errors/CustomError'

const { Schema } = mongoose

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

UserSchema.pre('save', async function encryptPw(next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

UserSchema.methods.isValidPassword = async function isValidPw(
  password: string,
) {
  const compare = await bcrypt.compare(password, this.password)
  return compare
}

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  },
})

export const UserModel = mongoose.model<IUserMongo>('User', UserSchema)

class UsersModelDb {
  private users

  constructor() {
    this.users = UserModel
  }

  async save(userData: IUser): Promise<IUser> {
    try {
      const newUser = await this.users.create(userData)
      return newUser
    } catch (error) {
      throw new CustomError(
        500,
        'There was an issue signing you up, please try again later',
        `-${EErrorCodes.UserSignUpError}`,
      )
    }
  }

  async query(email: string): Promise<IUserMongo> {
    try {
      const user = await this.users.findOne({ email })
      if (user !== null) return user
      throw new CustomError(
        404,
        `-${EErrorCodes.UserNotFound}`,
        'User not found',
      )
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      } else if (error instanceof mongoose.Error.CastError) {
        throw new CustomError(
          404,
          `-${EErrorCodes.UserNotFound}`,
          'User not found',
        )
      } else {
        throw new CustomError(
          500,
          'There was an issue with the service. Please try again later',
        )
      }
    }
  }
}

export const usersModelDb = new UsersModelDb()
