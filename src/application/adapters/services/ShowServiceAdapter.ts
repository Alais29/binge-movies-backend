/* eslint-disable class-methods-use-this */
import { IShowService } from '@/application/ports/IShowService'
import { IShow, IShowMongo } from '@/common/interfaces/shows'
import { MongoShowRepository } from '../repositories/MongoShowRespository'

const showRepository = new MongoShowRepository()

export class ShowServiceAdapter implements IShowService {
  async getAllShows(): Promise<IShowMongo[]> {
    return showRepository.get() as unknown as IShowMongo[]
  }

  async getShowsByCategory(category: string): Promise<IShow[]> {
    return showRepository.query({ category })
  }

  async getShowById(showId: string): Promise<IShowMongo> {
    return showRepository.get(showId) as unknown as IShowMongo
  }
}
