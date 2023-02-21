import { Request, Response } from 'express'
import { IShowMongo } from '@/common/interfaces/shows'
import { showsModelDb } from '@/models/showModel'
import { isEmpty } from '@/utils/isEmpty'

export abstract class ShowsController {
  public static async getShows(req: Request, res: Response) {
    const shows: IShowMongo[] = await showsModelDb.get()
    if (!isEmpty(shows)) res.status(200).json({ data: shows })
    else res.status(204).json({ data: shows, message: 'There are no shows.' })
  }
}
