import { IShow } from '@/common/interfaces/shows'

export interface IShowService {
  getAllShows(): Promise<IShow[]>
  getShowsByCategory(category: string): Promise<IShow[]>
  getShowById(showId: string): Promise<IShow>
}
