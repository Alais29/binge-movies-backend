import { IShow, IShowMongo } from '@/common/interfaces/shows'

export interface IShowService {
  getAllShows(): Promise<IShowMongo[]>
  getShowsByCategory(category: string): Promise<IShow[]>
  getShowById(showId: string): Promise<IShowMongo>
}
