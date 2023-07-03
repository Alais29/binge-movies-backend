import { Document } from 'mongoose'
import { IShow } from './shows'

export interface IUser {
  email: string
  password: string
  favoriteShows: IShow[]
}

export interface IUserMongo extends IUser, Document {
  isValidPassword: (pw: string) => Promise<boolean>
}
