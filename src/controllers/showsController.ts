import { Request, Response } from 'express'
import { IShowMongo } from '@/common/interfaces/shows'
import { showsModelDb } from '@/models/showModel'

export abstract class ShowsController {
  public static async getShows(req: Request, res: Response) {
    const shows: IShowMongo = await showsModelDb.get()
    res.json({ data: shows })
  }
}
