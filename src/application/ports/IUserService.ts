import { IShowMongo } from '@/common/interfaces/shows'
import { IUser, IUserMongo } from '@/common/interfaces/users'

export interface IUserService {
  getUserByEmail(email: string): Promise<IUserMongo>
  saveUser(userData: IUser): Promise<IUser>
  getUserFavoriteShows(userId: string): Promise<IShowMongo[]>
  addFavoriteShow(userId: string, showId: string): Promise<IShowMongo[]>
  deleteFavoriteShow(userId: string, showId: string): Promise<void>
}
