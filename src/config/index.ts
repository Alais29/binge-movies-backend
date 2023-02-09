import 'dotenv/config.js'

export const config = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI,
}
