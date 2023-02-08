import mongoose from 'mongoose'
import { config } from '@/config'
import { SeedData } from '@/seed-data'
import { shows } from '@/seed-data/data'

class MongoDatabase {
  private uri: string

  constructor(uri: string = 'mongodb_uri') {
    this.uri = uri
  }

  connect() {
    mongoose.set('strictQuery', true)
    mongoose
      .connect(this.uri)
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
