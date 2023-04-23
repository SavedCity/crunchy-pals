import mongoose from 'mongoose'
import Thread from './Thread'

const Schema = mongoose.Schema

const forumSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  threads: [{ type: mongoose.Schema.Types.ObjectId, ref: Thread }],
})

const Forums = mongoose.models.Forum || mongoose.model('Forum', forumSchema)

export default Forums
