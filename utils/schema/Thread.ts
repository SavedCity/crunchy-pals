import mongoose from 'mongoose'
import Replies from './Reply'

const Schema = mongoose.Schema

const threadSchema = new Schema({
  forum: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: Replies }],
})

const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema)

export default Thread
