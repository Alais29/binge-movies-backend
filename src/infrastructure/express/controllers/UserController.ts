import { Request, Response } from 'express'
import { userService } from '@/application/domain/UserService'

export abstract class UserController {
  public static async addFavoriteShows(
    req: Request,
    res: Response,
  ): Promise<void> {
    const userId = (req.user as Express.User & { id: string })?.id
    const { showId } = req.body
    const result = await userService.addFavoriteShow(userId, showId)
    res.status(200).json({ data: result })
  }

  public static async deleteFavoriteShow(
    req: Request,
    res: Response,
  ): Promise<void> {
    const userId = (req.user as Express.User & { id: string })?.id
    const { showId } = req.params
    await userService.deleteFavoriteShow(userId, showId)
    res.status(204).send()
  }

  public static async getFavoriteShows(
    req: Request,
    res: Response,
  ): Promise<void> {
    const userId = (req.user as Express.User & { id: string })?.id
    const result = await userService.getUserFavoriteShows(userId)
    res.status(200).json({ data: result })
  }
}
