import supertest, { SuperAgentTest } from 'supertest'
import { shows } from '@/seed-data/data'
import { SeedData } from '@/seed-data'
import { IShow } from '@/common/interfaces/shows'
import { Application } from '@/application/server'
import { mongoDb } from '@/infrastructure/database/mongo/MongoDatabase'

describe('Shows routes success responses', () => {
  let request: SuperAgentTest

  beforeAll(async () => {
    const app = new Application()
    request = supertest.agent(app.getServer())
    await mongoDb.connect()
    await SeedData.insertShows(shows)
  })

  afterAll(async () => {
    await mongoDb.close()
  })

  it('GET: /api/shows should return a list of shows', async () => {
    const response = await request.get('/api/shows')
    expect(response.statusCode).toBe(200)
    expect(response.body.data.length).not.toBe(0)
    expect(response.body.data).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({ title: 'The last of us' }),
      ]),
    )
    expect(response.body.data).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({ title: 'Avatar: The way of the water' }),
      ]),
    )
    expect(response.body.data).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({ title: 'The Pale Blue Eye' }),
      ]),
    )
  })

  it('GET: /api/shows?category=tv-show should return a list of only the tv shows', async () => {
    const response = await request.get('/api/shows?category=tv-show')
    expect(response.statusCode).toBe(200)
    expect(
      response.body.data.every((show: IShow) => show.category === 'tv show'),
    ).toBeTrue()
  })

  it('GET: /api/shows?category=movie should return a list of only the movies', async () => {
    const response = await request.get('/api/shows?category=movies')
    expect(response.statusCode).toBe(200)
    expect(
      response.body.data.every((show: IShow) => show.category === 'movie'),
    ).toBeTrue()
  })

  it('GET: /api/shows/:id should return a show by its id', async () => {
    const response = await request.get('/api/shows')
    const showId = response.body.data[0].id

    const showResponse = await request.get(`/api/shows/${showId}`)
    expect(showResponse.statusCode).toBe(200)
    expect(showId).toEqual(showResponse.body.data.id)
  })
})
