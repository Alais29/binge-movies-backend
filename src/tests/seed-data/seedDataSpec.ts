import { db } from '@/services/db'
import { SeedData } from '@/seed-data'
import { shows } from '@/seed-data/data'
import { showsModelDb } from '@/models/showModel'
import { IShowMongo } from '@/common/interfaces/shows'

describe('Seed data to database', () => {
  beforeAll(async () => {
    await db.connect()
  })

  afterAll(async () => {
    await db.close()
  })

  it('should save a list of objects to the database', async () => {
    await SeedData.insertShows(shows)
    const showsInserted = (await showsModelDb.get()) as IShowMongo[]

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
