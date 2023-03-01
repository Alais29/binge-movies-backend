import supertest, { SuperAgentTest } from 'supertest'
import Server from '@/services/server'
import { shows } from '@/seed-data/data'
import { db } from '@/services/db'
import { SeedData } from '@/seed-data'
import { IShowMongo } from '@/common/interfaces/shows'

describe('Shows routes success responses', () => {
  let request: SuperAgentTest

  beforeAll(async () => {
    request = supertest.agent(Server)
    await db.connect()
    await SeedData.insertShows(shows)
  })

  afterAll(async () => {
    await db.close()
  })

  it('GET: /api/shows should return a list of shows', async () => {
    const response = await request.get('/api/shows')
    expect(response.statusCode).toBe(200)
    expect(response.body.data.length).not.toBe(0)
  })

  it('GET: /api/shows?category=tv-show should return a list of only the tv shows', async () => {
    const response = await request.get('/api/shows?category=tv-show')
    expect(response.statusCode).toBe(200)
    expect(
      response.body.data.every(
        (show: IShowMongo) => show.category === 'tv show',
      ),
    ).toBeTrue()
  })

  it('GET: /api/shows?category=movie should return a list of only the movies', async () => {
    const response = await request.get('/api/shows?category=movies')
    expect(response.statusCode).toBe(200)
    expect(
      response.body.data.every((show: IShowMongo) => show.category === 'movie'),
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
