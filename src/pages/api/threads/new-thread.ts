import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'lib/dbConnect'
import Forum from 'utils/schema/Forum'
import Thread from 'utils/schema/Thread'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    await dbConnect()
    try {
      const { title, author, content, forumId } = req.body

      const forum = await Forum.findById(forumId)

      if (!forum) {
        return res.json({ status: 404, error: 'Forum not found' })
      }

      if (title && author && content && forumId) {
        const newThread = await Thread.create({
          forum: forumId,
          title,
          author,
          content,
        })

        forum.threads.push(newThread._id)
        await forum.save()

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
