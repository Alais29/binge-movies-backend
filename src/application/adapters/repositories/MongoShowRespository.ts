import mongoose, { FilterQuery } from 'mongoose'
import { IShow, IShowQuery } from '@/common/interfaces/shows'
import { ShowsModel } from '../../../infrastructure/database/mongo/models/showModel'
import { IShowRepository } from '@/application/ports/IShowRepository'
import { CustomError } from '@/errors/CustomError'
import { EErrorCodes } from '@/common/enums/errors'

export class MongoShowRepository implements IShowRepository {
  private shows

  constructor() {
    this.shows = ShowsModel
  }

  async get(id?: string): Promise<IShow | IShow[]> {
    try {
      let result: IShow | IShow[] = []
      if (id) {
        const show = await this.shows.findById(id)
        if (show) result = show as unknown as IShow
      } else {
        const shows: IShow[] = await this.shows.find()
        result = shows
      }
      return result
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new CustomError(
          404,
          "The show doesn't exist",
          `-${EErrorCodes.ShowNotFound}`,
        )
      } else {
        throw new CustomError(
          500,
          'There was an issue loading the shows, please try again later',
          `-${EErrorCodes.GetShowsError}`,
        )
      }
    }
  }

  async query(options: IShowQuery): Promise<IShow[]> {
    const query: FilterQuery<IShowQuery> = {}

    if (options.category) query.category = options.category

    const shows = await this.shows.find(query)

    return shows
  }
}
