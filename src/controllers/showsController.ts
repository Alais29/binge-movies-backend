import { Request, Response } from 'express'
import { shows } from '@/seed-data/data'

export abstract class ShowsController {
  public static getShows(req: Request, res: Response) {
    res.json({ data: shows })
  }
}
