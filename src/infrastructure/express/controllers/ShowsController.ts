import { Request, Response } from 'express'
import { showService } from '@/application/domain/ShowService'

export abstract class ShowsController {
  public static async getShows(req: Request, res: Response): Promise<void> {
    const { category } = req.query
    let shows

    if (category) {
      shows = await showService.getShowsByCategory(
        (category as string).replace('-', ' '),
      )
    } else {
      shows = await showService.getAllShows()
    }

    res.status(200).json({ data: shows })
  }

  public static async getShow(req: Request, res: Response): Promise<void> {
    const showId = req.params.id
    const show = await showService.getShowById(showId)
    res.status(200).json({ data: show })
  }
}
