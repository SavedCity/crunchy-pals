import mongoose from 'mongoose'

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
  favoriteReviews: [
    {
      productName: String,
      rating: Number,
      image: String,
      description: String,
      placeOfPurchase: String,
      createdBy: String,
      createdAt: Date,
    },
  ],
  createdAt: { type: Date, default: Date.now },
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User
