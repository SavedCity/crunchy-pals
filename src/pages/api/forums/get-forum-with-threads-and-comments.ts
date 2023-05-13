import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'lib/dbConnect'
import Forum from 'utils/schema/Forum'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await dbConnect()

    try {
      const { forumId } = req.body

      if (forumId) {
        const forum = await Forum.findById(forumId).populate({
          path: 'threads',
          populate: {
            path: 'comments',
          },
        })
        return res.status(200).json({ forum })
      }
      return res.status(404).json({ error: 'No forum id provided' })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  return res.status(400).json({ error: 'This API call only accepts GET requests' })
}
