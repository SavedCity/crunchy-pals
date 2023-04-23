import mongoose from 'mongoose'
import Comments from './Comment'

const Schema = mongoose.Schema

const threadSchema = new Schema({
  forum: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: Comments }],
})

const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema)

export default Thread
