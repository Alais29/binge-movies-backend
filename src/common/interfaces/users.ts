import { Document } from 'mongoose'

export interface IUser {
  email: string
  password: string
}

export interface IUserMongo extends IUser, Document {
  isValidPassword: (pw: string) => Promise<boolean>
}
