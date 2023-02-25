import { Request, Response } from 'express'
import { showsModelDb } from '@/models/showModel'
import { isEmpty } from '@/utils/isEmpty'

export abstract class ShowsController {
  public static async getShows(req: Request, res: Response): Promise<void> {
    const shows = await showsModelDb.get()
    if (!isEmpty(shows)) res.status(200).json({ data: shows })
    else res.status(204).json({ data: shows, message: 'There are no shows.' })
  }

  public static async getShow(req: Request, res: Response): Promise<void> {
    const showId = req.params.id
    const show = await showsModelDb.get(showId)
    res.status(200).json({ data: show })
  }
}
