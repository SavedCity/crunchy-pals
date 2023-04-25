import type { NextApiRequest, NextApiResponse } from 'next'
import Comment from 'utils/schema/Comment'
import Thread from 'utils/schema/Thread'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const { _id } = req.body

      if (_id) {
        await Comment.deleteMany({ thread: _id })
        const thread = await Thread.findByIdAndDelete(_id)
        return res.json({ status: 200, thread })
      }
      return res.json({ status: 404, error: 'No thread id passed' })
    } catch (error) {
      return res.json({ status: 400, error: 'Bad request' })
    }
  }
  return res.json({
    status: 400,
    error: 'This API call only accepts DELETE methods',
  })
}
