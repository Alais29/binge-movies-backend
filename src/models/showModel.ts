import mongoose, { FilterQuery } from 'mongoose'
import { IShow, IShowMongo, IShowQuery } from '@/common/interfaces/shows'
import { CustomError } from '@/errors/CustomError'
import { EErrorCodes } from '@/common/enums/errors'

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
      type: String,
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

  async get(id?: string): Promise<IShowMongo | IShowMongo[]> {
    try {
      let result: IShowMongo | IShowMongo[] = []
      if (id) {
        const show = await this.shows.findById(id)
        if (show) result = show as unknown as IShowMongo
      } else {
        const shows: IShowMongo[] = await this.shows.find()
        result = shows
      }
      return result
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new CustomError(
          404,
          "The show doesn't exist",
          `-${EErrorCodes.ShowNotFound}`,
        )
      } else {
        throw new CustomError(
          500,
          'There was an issue loading the shows, please try again later',
          `-${EErrorCodes.GetShowsError}`,
        )
      }
    }
  }

  async query(options: IShowQuery): Promise<IShow[]> {
    const query: FilterQuery<IShowQuery> = {}

    if (options.category) query.category = options.category

    const shows = await this.shows.find(query)

    return shows as IShow[]
  }
}

export const showsModelDb = new ShowsModelDb()
