import type { NextApiRequest, NextApiResponse } from 'next'
import Comment from 'utils/schema/Comment'
import Forum from 'utils/schema/Forum'
import Thread from 'utils/schema/Thread'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const { _id } = req.body

      if (_id) {
        await Comment.deleteMany({ forum: _id })
        await Thread.deleteMany({ forum: _id })
        const forum = await Forum.findByIdAndDelete(_id)
        return res.json({ status: 200, forum })
      }
      return res.json({ status: 404, error: 'No forum id passed' })
    } catch (error) {
      return res.json({ status: 400, error: 'Bad request' })
    }
  }
  return res.json({
    status: 400,
    error: 'This API call only accepts DELETE methods',
  })
}
