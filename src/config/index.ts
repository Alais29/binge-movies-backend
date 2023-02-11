import 'dotenv/config.js'

export const config = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_NAME: process.env.MONGODB_NAME || '',
  MONGODB_URI: process.env.MONGODB_URI,
}
