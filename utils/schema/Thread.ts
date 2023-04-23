import mongoose from 'mongoose'

const Schema = mongoose.Schema

const threadSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  content: { type: String, required: true },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Replies' }],
})

const Threads = mongoose.models.Thread || mongoose.model('Thread', threadSchema)

export default Threads
