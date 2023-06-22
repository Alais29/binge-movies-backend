import { IShowMongo } from '@/common/interfaces/shows'
import { IUser, IUserMongo } from '@/common/interfaces/users'

export interface IUserRepository {
  getByEmail(email: string): Promise<IUserMongo>
  save(userData: IUser): Promise<IUser>
  getUserFavoriteShows(userId: string): Promise<IShowMongo[]>
  addToUserFavoriteShows(userId: string, showId: string): Promise<IShowMongo[]>
  deleteUserFavoriteShows(userId: string, showId: string): Promise<void>
}
