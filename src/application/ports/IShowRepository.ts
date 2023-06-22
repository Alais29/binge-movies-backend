import { IShow, IShowMongo, IShowQuery } from '@/common/interfaces/shows'

export interface IShowRepository {
  get(id?: string): Promise<IShowMongo | IShowMongo[]>
  query(options: IShowQuery): Promise<IShow[]>
}
