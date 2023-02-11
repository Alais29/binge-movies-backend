import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { config } from '@/config'
import { SeedData } from '@/seed-data'
import { shows } from '@/seed-data/data'

class MongoDatabase {
  private uri: string

  constructor(uri: string = 'mongodb_uri') {
    this.uri = uri
  }

  mongoTestServer = async () => {
    const instance = await MongoMemoryServer.create()
    const uri = instance.getUri()
    return uri.slice(0, uri.lastIndexOf('/'))
  }

  getMongoUrl = async (): Promise<string> => {
    if (config.NODE_ENV === 'test') {
      const mongoserver = await this.mongoTestServer()
      console.log('Using mock database')
      return `${mongoserver}/${config.MONGODB_NAME}`
    }
    return this.uri
  }

  async connect() {
    mongoose.set('strictQuery', true)
    const uri = await this.getMongoUrl()
    return mongoose
      .connect(uri)
      .then(() => {
        console.log('Mongo database connected')
        if (process.argv.includes('--seed-data')) {
          SeedData.insertShows(shows)
        }
      })
      .catch(e =>
        console.log('There was an error when connecting to the database', e),
      )
  }
}

export const db = new MongoDatabase(config.MONGODB_URI)
