import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  forum: { type: String, required: true },
  thread: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
})

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema)

export default Comment
