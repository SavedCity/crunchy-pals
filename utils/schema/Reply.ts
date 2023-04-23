import mongoose from 'mongoose'

const Schema = mongoose.Schema

const replySchema = new Schema({
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
})

const Replies = mongoose.models.Replies || mongoose.model('Replies', replySchema)

export default Replies
