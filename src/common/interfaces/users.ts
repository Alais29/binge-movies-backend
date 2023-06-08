import { Document } from 'mongoose'
import { IShowMongo } from './shows'

export interface IUser {
  email: string
  password: string
  favoriteShows: IShowMongo[]
}

export interface IUserMongo extends IUser, Document {
  isValidPassword: (pw: string) => Promise<boolean>
}
