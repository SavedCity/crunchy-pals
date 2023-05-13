import mongoose from 'mongoose'
import Forum from './Forum'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 5,
  },
  image: {
    type: String,
  },
  dob: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  // user only favoriteForums: [Forum.schema] to store the entire forum object.
  favoriteForums: [{ type: mongoose.Schema.Types.ObjectId, ref: Forum }],
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User
