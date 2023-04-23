import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'lib/dbConnect'
import Forums from 'utils/schema/Forum'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    await dbConnect()
    try {
      const { thread, forumId } = req.body

      if (thread && forumId) {
        const user = await Forums.findByIdAndUpdate(
          { _id: forumId },
          { $pull: { newThread: thread } },
          {
            new: true,
          }
        )
        return res.json({ status: 200, 'New thread': thread })
      }
      return res.json({ status: 404, error: 'No forum id or data passed' })
    } catch (error) {
      return res.json({ status: 400, error: 'Bad request' })
    }
  }
  return res.json({
    status: 400,
    error: 'This API call only accepts PATCH methods',
  })
}
