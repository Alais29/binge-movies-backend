/* eslint-disable class-methods-use-this */
import { IUserService } from '@/application/ports/IUserService'
import { IShowMongo } from '@/common/interfaces/shows'
import { IUserMongo, IUser } from '@/common/interfaces/users'
import { MongoUserRepository } from '../repositories/MongoUserRespository'

const userRepository = new MongoUserRepository()

export class UserServiceAdapter implements IUserService {
  async getUserByEmail(email: string): Promise<IUserMongo> {
    return userRepository.getByEmail(email)
  }

  async saveUser(userData: IUser): Promise<IUser> {
    return userRepository.save(userData)
  }

  async getUserFavoriteShows(userId: string): Promise<IShowMongo[]> {
    return userRepository.getUserFavoriteShows(userId)
  }

  async addFavoriteShow(userId: string, showId: string): Promise<IShowMongo[]> {
    return userRepository.addToUserFavoriteShows(userId, showId)
  }

  async deleteFavoriteShow(userId: string, showId: string): Promise<void> {
    return userRepository.deleteUserFavoriteShows(userId, showId)
  }
}
