import { IShow, IShowMongo } from '@/common/interfaces/shows'
import { config } from '@/config'
import { ShowsModel } from '@/models/showModel'

export class SeedData {
  static async insertShows(shows: IShow[]): Promise<void> {
    console.log(`🌱 Inserting Seed Data: ${shows.length} Shows`)
    const promises: Promise<IShow>[] = []
    shows.forEach(show => {
      console.log(`🛍️  Adding Show: ${show.title}`)
      const newShow = new ShowsModel(show) as unknown as IShowMongo
      promises.push(newShow.save())
    })
    await Promise.all(promises)

    console.log(`✅ Seed Data Inserted: ${shows.length} Shows`)
    console.log('👋 Please start the process with `yarn dev` or `npm run dev`')
    if (config.NODE_ENV !== 'test') process.exit()
  }
}
