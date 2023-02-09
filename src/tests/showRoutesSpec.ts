import supertest, { SuperAgentTest } from 'supertest'
import Server from '@/services/server'
import { shows } from '@/seed-data/data'

describe('Shows api tests', () => {
  let request: SuperAgentTest

  beforeAll(async () => {
    request = supertest.agent(Server)
  })

  afterAll(async () => {
    Server.close()
  })

  it('GET: /api/shows should return a list of shows', async () => {
    const response = await request.get('/api/shows')

    expect(response.body.data).toEqual(shows)
    expect(response.body.data.length).not.toBe(0)
  })
})
