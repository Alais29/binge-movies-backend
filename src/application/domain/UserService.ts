import { IShowMongo } from '@/common/interfaces/shows'
import { IUserService } from '../ports/IUserService'
import { IUser, IUserMongo } from '@/common/interfaces/users'
import { UserServiceAdapter } from '../adapters/services/UserServiceAdapter'

class UserService {
  private userServiceAdapter: IUserService

  constructor(userServiceAdapter: IUserService) {
    this.userServiceAdapter = userServiceAdapter
  }

  async getUserByEmail(email: string): Promise<IUserMongo> {
    return this.userServiceAdapter.getUserByEmail(email)
  }

  async saveUser(userData: IUser): Promise<IUser> {
    return this.userServiceAdapter.saveUser(userData)
  }

  async getUserFavoriteShows(userId: string): Promise<IShowMongo[]> {
    return this.userServiceAdapter.getUserFavoriteShows(userId)
  }

  async addFavoriteShow(userId: string, showId: string): Promise<IShowMongo[]> {
    return this.userServiceAdapter.addFavoriteShow(userId, showId)
  }

  async deleteFavoriteShow(userId: string, showId: string): Promise<void> {
    return this.userServiceAdapter.deleteFavoriteShow(userId, showId)
  }
}

export const userService = new UserService(new UserServiceAdapter())
