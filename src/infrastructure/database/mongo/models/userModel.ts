import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser } from '@/common/interfaces/users'

const { Schema } = mongoose

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteShows: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Show' }],
})

UserSchema.pre('save', async function encryptPw(next) {
  if (this.isModified('password')) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
  }
  next()
})

UserSchema.methods.isValidPassword = async function isValidPw(
  password: string,
) {
  const compare = await bcrypt.compare(password, this.password)
  return compare
}

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  },
})

export const UserModel = mongoose.model<IUser>('User', UserSchema)
