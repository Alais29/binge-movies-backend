import { Request, Response } from 'express'
import { usersModelDb } from '@/models/userModel'

export abstract class UserController {
  public static async addFavoriteShows(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { email, showId } = req.body
    const result = await usersModelDb.addToUserFavoriteShows(email, showId)
    res.status(200).json({ data: result })
  }
}
