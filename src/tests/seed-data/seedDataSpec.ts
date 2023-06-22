import { SeedData } from '@/seed-data'
import { shows } from '@/seed-data/data'
import { IShowMongo } from '@/common/interfaces/shows'
import { showService } from '@/application/domain/ShowService'
import { mongoDb } from '@/infrastructure/database/mongo/MongoDatabase'

describe('Seed data to database', () => {
  beforeAll(async () => {
    await mongoDb.connect()
  })

  afterAll(async () => {
    await mongoDb.close()
  })

  it('should save a list of objects to the database', async () => {
    await SeedData.insertShows(shows)
    const showsInserted = (await showService.getAllShows()) as IShowMongo[]

    expect(showsInserted.length).not.toBe(0)
    expect(showsInserted).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({ title: 'The last of us' }),
        jasmine.objectContaining({ title: 'The menu' }),
        jasmine.objectContaining({
          title: 'Everything Everywhere All at Once',
        }),
      ]),
    )
  })
})
