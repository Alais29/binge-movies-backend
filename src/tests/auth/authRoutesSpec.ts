import supertest, { SuperAgentTest } from 'supertest'
import Server from '@/services/server'
import { db } from '@/services/db'
import { SeedData } from '@/seed-data'
import { EErrorCodes } from '@/common/enums/errors'

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

describe('Auth routes error responses', () => {
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

  it('POST: /api/auth/signup should return error if email or password are missing', async () => {
    const user1 = { email: '', password: '' }
    const user2 = { email: 'test@email.com', password: '' }
    const user3 = { email: '', password: '1231321' }
    const response1 = await request.post('/api/auth/signup').send(user1)
    const response2 = await request.post('/api/auth/signup').send(user2)
    const response3 = await request.post('/api/auth/signup').send(user3)

    expect(response1.statusCode).toBe(500)
    expect(response2.statusCode).toBe(500)
    expect(response3.statusCode).toBe(500)
    expect(response1.body.data.message).toBe('Missing credentials')
    expect(response1.body.data.message).toBe('Missing credentials')
    expect(response2.body.data.message).toBe('Missing credentials')
    expect(response2.body.data.error).toBe(`-${EErrorCodes.UserSignUpError}`)
    expect(response3.body.data.error).toBe(`-${EErrorCodes.UserSignUpError}`)
    expect(response3.body.data.error).toBe(`-${EErrorCodes.UserSignUpError}`)
  })

  it("POST: /api/auth/signup should return error if password and confirmPassword don't match", async () => {
    const user = {
      email: 'test@test.com',
      password: 'password',
      confirmPassword: 'XXXXXXXXX',
    }

    const response = await request.post('/api/auth/signup').send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.data.error).toBe(`-${EErrorCodes.UserSignUpError}`)
  })

  it('POST: /api/auth/signup should return error if email field is not a valid email', async () => {
    const user = {
      email: 'test',
      password: 'password',
      confirmPassword: 'password',
    }

    const response = await request.post('/api/auth/signup').send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.data.error).toBe(`-${EErrorCodes.UserSignUpError}`)
  })

  it('POST: /api/auth/signup should return error if user already exist', async () => {
    const user = {
      email: 'test@test.com',
      password: 'password',
      confirmPassword: 'password',
    }

    const response = await request.post('/api/auth/signup').send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.data.error).toBe(`-${EErrorCodes.UserSignUpError}`)
  })

  it('POST: /api/auth/login should return error if user does not exists', async () => {
    const user = { email: 'test@email.com', password: '123123123' }

    const response = await request.post('/api/auth/login').send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.data.error).toBe(`-${EErrorCodes.UserNotFound}`)
  })

  it('POST: /api/auth/login should return error if password is incorrect', async () => {
    const user = { email: 'test@test.com', password: 'XXXXXXXXX' }

    const response = await request.post('/api/auth/login').send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.data.error).toBe(`-${EErrorCodes.UserLoginError}`)
  })
})
