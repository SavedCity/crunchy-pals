import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
})

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema)

export default Comment
