import type { NextApiRequest, NextApiResponse } from 'next'
import Forums from 'utils/schema/Forum'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const { _id } = req.body

      if (_id) {
        const forum = await Forums.findByIdAndDelete(_id)
        return res.json({ status: 200, forum })
      }
      return res.json({ status: 404, error: 'No user id passed' })
    } catch (error) {
      return res.json({ status: 400, error: 'Bad request' })
    }
  }
  return res.json({
    status: 400,
    error: 'This API call only accepts DELETE methods',
  })
}
