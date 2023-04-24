import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'lib/dbConnect'
import Thread from 'utils/schema/Thread'
import Comment from 'utils/schema/Comment'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    await dbConnect()
    try {
      const { author, content, threadId, forumId } = req.body

      const thread = await Thread.findById(threadId)

      if (!thread) {
        return res.json({ status: 404, error: 'Thread not found' })
      }

      if (author && content && threadId) {
        const newComment = await Comment.create({
          forum: forumId,
          thread: threadId,
          author,
          content,
        })

        thread.comments.push(newComment._id)
        await thread.save()

        return res.json({ status: 200, 'New comment': newComment })
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
