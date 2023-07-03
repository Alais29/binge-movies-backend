import { IShow } from '@/common/interfaces/shows'
import { IUser } from '@/common/interfaces/users'

export interface IUserService {
  getUserByEmail(email: string): Promise<IUser>
  saveUser(userData: IUser): Promise<IUser>
  getUserFavoriteShows(userId: string): Promise<IShow[]>
  addFavoriteShow(userId: string, showId: string): Promise<IShow[]>
  deleteFavoriteShow(userId: string, showId: string): Promise<void>
}
