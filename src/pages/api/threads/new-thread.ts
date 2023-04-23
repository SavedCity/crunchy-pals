import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'lib/dbConnect'
import Forums from 'utils/schema/Forum'
import Thread from 'utils/schema/Thread'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    await dbConnect()
    try {
      const { title, author, content, forumId } = req.body

      if (title && author && content && forumId) {
        const newThread = await Thread.create({
          forum: forumId,
          title,
          author,
          content,
        })

        const forum = await Forums.findByIdAndUpdate(
          { _id: forumId },
          { $push: { threads: newThread._id } },
          { new: true }
        )

        return res.json({ status: 200, 'New thread': newThread })
      }
      return res.json({ status: 404, error: 'No data passed' })
    } catch (error) {
      return res.json({ status: 400, error })
    }
  }
  return res.json({
    status: 400,
    error: 'This API call only accepts PATCH methods',
  })
}
