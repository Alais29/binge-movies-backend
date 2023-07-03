import { IShow } from '@/common/interfaces/shows'
import { IShowService } from '@/application/ports/IShowService'
import { ShowServiceAdapter } from '@/application/adapters/services/ShowServiceAdapter'

class ShowService {
  private showServiceAdapter: IShowService

  constructor(showServiceAdapter: IShowService) {
    this.showServiceAdapter = showServiceAdapter
  }

  // TODO: Implement method to add shows

  async getAllShows(): Promise<IShow[]> {
    return this.showServiceAdapter.getAllShows()
  }

  async getShowsByCategory(category: string): Promise<IShow[]> {
    return this.showServiceAdapter.getShowsByCategory(category)
  }

  async getShowById(showId: string): Promise<IShow> {
    return this.showServiceAdapter.getShowById(showId)
  }
}

export const showService = new ShowService(new ShowServiceAdapter())
