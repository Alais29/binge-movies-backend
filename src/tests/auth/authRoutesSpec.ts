import supertest, { SuperAgentTest } from 'supertest'
import Server from '@/services/server'
import { db } from '@/services/db'
import { SeedData } from '@/seed-data'

describe('Auth routes success responses', () => {
  let request: SuperAgentTest

  beforeAll(async () => {
    request = supertest.agent(Server)
    await db.connect()
    await SeedData.insertUser({
      email: 'test@test.com',
      password: 'password',
    })
  })

  afterAll(async () => {
    await db.close()
  })

  it('POST: /api/auth/signup should allow an user to sign up', async () => {
    const user = {
      email: 'test1@test.com',
      password: 'password',
      confirmPassword: 'password',
    }
    const response = await request.post('/api/auth/signup').send(user)
    expect(response.statusCode).toBe(201)
    expect(response.body.message).toBe('Successful Signup!')
  })

  it('POST: /api/auth/login should allow an user to log in', async () => {
    const user = {
      email: 'test@test.com',
      password: 'password',
    }
    const response = await request.post('/api/auth/login').send(user)
    expect(response.statusCode).toBe(200)
    expect(Object.keys(response.body)).toContain('token')
  })
})
