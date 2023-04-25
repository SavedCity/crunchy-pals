import type { NextApiRequest, NextApiResponse } from 'next'
import Comment from 'utils/schema/Comment'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const { _id } = req.body

      if (_id) {
        const comment = await Comment.findByIdAndDelete(_id)
        return res.json({ status: 200, comment })
      }
      return res.json({ status: 404, error: 'No comment id passed' })
    } catch (error) {
      return res.json({ status: 400, error: 'Bad request' })
    }
  }
  return res.json({
    status: 400,
    error: 'This API call only accepts DELETE methods',
  })
}
