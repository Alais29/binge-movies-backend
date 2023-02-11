import mongoose from 'mongoose'
import { IShow, IShowMongo } from '@/common/interfaces/shows'

const ShowSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      maxLength: [150, 'The title must have 150 characters tops'],
    },
    thumbnail: {
      type: String,
      require: true,
    },
    year: {
      type: Number,
      require: true,
      max: [
        new Date().getFullYear(),
        'The release year cannot be in the future',
      ],
    },
    category: {
      type: String,
      enum: ['tv show', 'movie'],
      require: true,
    },
    rating: {
      type: String,
      enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'],
      default: null,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    genres: {
      type: [String],
      require: true,
    },
    trailer: {
      type: [String],
      default: null,
    },
    score: {
      type: Number,
      max: [10, "The score can't be higher than 10"],
      require: true,
    },
    plot: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
)

ShowSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export const ShowsModel = mongoose.model<IShow>('Show', ShowSchema)

class ShowsModelDb {
  private shows

  constructor() {
    this.shows = ShowsModel
  }

  async get(): Promise<IShowMongo> {
    const shows: IShowMongo[] = await this.shows.find()
    return shows as unknown as IShowMongo
  }
}

export const showsModelDb = new ShowsModelDb()
