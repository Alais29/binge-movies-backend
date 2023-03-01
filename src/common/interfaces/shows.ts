import { Document } from 'mongoose'
import { IObject } from './others'

export interface IShow {
  title: string
  thumbnail: string
  year: number
  category: string
  rating: string
  isTrending: boolean
  genres: string[]
  trailer: string
  score: number
  plot: string
}

export interface IShowMongo extends IShow, Document {
  createdAt: NativeDate
  updatedAt: NativeDate
}

export interface IShowQuery extends IObject {
  category?: string
}
