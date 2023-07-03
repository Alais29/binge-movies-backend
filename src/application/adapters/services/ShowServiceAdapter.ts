/* eslint-disable class-methods-use-this */
import { IShowService } from '@/application/ports/IShowService'
import { IShow } from '@/common/interfaces/shows'
import { MongoShowRepository } from '../repositories/MongoShowRespository'

const showRepository = new MongoShowRepository()

export class ShowServiceAdapter implements IShowService {
  async getAllShows(): Promise<IShow[]> {
    return showRepository.get() as unknown as IShow[]
  }

  async getShowsByCategory(category: string): Promise<IShow[]> {
    return showRepository.query({ category })
  }

  async getShowById(showId: string): Promise<IShow> {
    return showRepository.get(showId) as unknown as IShow
  }
}
