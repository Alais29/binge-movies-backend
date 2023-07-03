import { IShow } from '@/common/interfaces/shows'
import { IUser } from '@/common/interfaces/users'

export interface IUserRepository {
  getByEmail(email: string): Promise<IUser>
  save(userData: IUser): Promise<IUser>
  getUserFavoriteShows(userId: string): Promise<IShow[]>
  addToUserFavoriteShows(userId: string, showId: string): Promise<IShow[]>
  deleteUserFavoriteShows(userId: string, showId: string): Promise<void>
}
