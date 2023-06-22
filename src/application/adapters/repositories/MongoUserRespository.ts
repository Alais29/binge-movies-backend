import mongoose from 'mongoose'
import { IUserRepository } from '@/application/ports/IUserRepository'
import { UserModel } from '../../../infrastructure/database/mongo/models/userModel'
import { ShowsModel } from '../../../infrastructure/database/mongo/models/showModel'
import { IUser, IUserMongo } from '@/common/interfaces/users'
import { CustomError } from '@/errors/CustomError'
import { EErrorCodes } from '@/common/enums/errors'
import { IShowMongo } from '@/common/interfaces/shows'

export class MongoUserRepository implements IUserRepository {
  private users

  private shows

  constructor() {
    this.users = UserModel
    this.shows = ShowsModel
  }

  async save(userData: IUser): Promise<IUser> {
    try {
      const newUser = await this.users.create(userData)
      return newUser
    } catch (error) {
      if ((error as Error).message.includes('duplicate')) {
        throw new CustomError(
          400,
          'The user already exists',
          `-${EErrorCodes.UserSignUpError}`,
        )
      }
      throw new CustomError(
        500,
        'There was an issue signing you up, please try again later',
        `-${EErrorCodes.UserSignUpError}`,
      )
    }
  }

  async getByEmail(email: string): Promise<IUserMongo> {
    try {
      const user = await this.users.findOne({ email })
      if (!user) {
        throw new CustomError(
          400,
          'User does not exist.',
          `-${EErrorCodes.UserNotFound}`,
        )
      }
      return user as IUserMongo
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      } else {
        throw new CustomError(
          500,
          'There was an issue with the service. Please try again later',
        )
      }
    }
  }

  async getUserFavoriteShows(userId: string): Promise<IShowMongo[]> {
    try {
      const user = await this.users.findById(userId).populate('favoriteShows')

      return user?.favoriteShows as IShowMongo[]
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new CustomError(
          400,
          'There was an issue getting the user, verify that the user exists.',
          `-${EErrorCodes.UserNotFound}`,
        )
      } else {
        throw new CustomError(
          500,
          'There was an issue with the service. Please try again later',
        )
      }
    }
  }

  async addToUserFavoriteShows(
    userId: string,
    showId: string,
  ): Promise<IShowMongo[]> {
    try {
      const user = await this.users.findById(userId)
      const show = await this.shows.findById(showId)

      if (user?.favoriteShows.includes(show?.id)) {
        throw new CustomError(
          400,
          'The show is already in the user favorites list.',
          `-${EErrorCodes.ShowAlreadyInFavorites}`,
        )
      }

      if (user) {
        user.favoriteShows = user.favoriteShows.concat(show?.id)
        await user.save()
      }
      const updatedUser = await user?.populate('favoriteShows')

      return updatedUser?.favoriteShows as IShowMongo[]
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      } else if (error instanceof mongoose.Error.CastError) {
        const isUserError = error.message.includes('User')
        throw new CustomError(
          404,
          'There was an issue adding the show, verify that both the user and show exist.',
          `-${
            isUserError ? EErrorCodes.UserNotFound : EErrorCodes.ShowNotFound
          }`,
        )
      } else {
        throw new CustomError(
          500,
          'There was an issue with the service. Please try again later',
        )
      }
    }
  }

  async deleteUserFavoriteShows(userId: string, showId: string): Promise<void> {
    try {
      const user = await this.users.findById(userId)
      const show = await this.shows.findById(showId)

      if (!user?.favoriteShows.includes(show?.id)) {
        throw new CustomError(
          404,
          'The show is not in the user favorites list.',
          `-${EErrorCodes.ShowNotInFavorites}`,
        )
      }

      if (user) {
        user.favoriteShows = user.favoriteShows.filter(
          id => id.toString() !== showId,
        )
        await user.save()
      }
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      } else if (error instanceof mongoose.Error.CastError) {
        const isUserError = error.message.includes('User')
        throw new CustomError(
          404,
          'There was an issue removing the show, verify that both the user and show exist.',
          `-${
            isUserError ? EErrorCodes.UserNotFound : EErrorCodes.ShowNotFound
          }`,
        )
      } else {
        throw new CustomError(
          500,
          'There was an issue with the service. Please try again later',
        )
      }
    }
  }
}
