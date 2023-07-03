import { IShow, IShowQuery } from '@/common/interfaces/shows'

export interface IShowRepository {
  get(id?: string): Promise<IShow | IShow[]>
  query(options: IShowQuery): Promise<IShow[]>
}
