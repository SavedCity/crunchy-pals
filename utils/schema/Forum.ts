import mongoose from 'mongoose'

const Schema = mongoose.Schema

const forumSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Threads' }],
})

const Forums = mongoose.models.Forum || mongoose.model('Forum', forumSchema)

export default Forums
