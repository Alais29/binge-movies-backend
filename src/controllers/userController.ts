import { Request, Response } from 'express'
import { usersModelDb } from '@/models/userModel'

export abstract class UserController {
  public static async addFavoriteShows(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { userId, showId } = req.body
    const result = await usersModelDb.addToUserFavoriteShows(userId, showId)
    res.status(200).json({ data: result })
  }

  public static async getFavoriteShows(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { userId } = req.params
    const result = await usersModelDb.getUserFavoriteShows(userId)
    res.status(200).json({ data: result })
  }
}
