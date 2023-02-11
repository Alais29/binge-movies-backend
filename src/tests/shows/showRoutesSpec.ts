import supertest, { SuperAgentTest } from 'supertest'
import Server from '@/services/server'
import { shows } from '@/seed-data/data'
import { db } from '@/services/db'
import { SeedData } from '@/seed-data'

describe('Shows api tests', () => {
  let request: SuperAgentTest

  beforeAll(async () => {
    request = supertest.agent(Server)
    await db.connect()
    await SeedData.insertShows(shows)
  })

  it('GET: /api/shows should return a list of shows', async () => {
    const response = await request.get('/api/shows')
    expect(response.statusCode).toBe(200)
    expect(response.body.data.length).not.toBe(0)
  })
})
