import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'lib/dbConnect'
import Forums from 'utils/schema/Forum'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await dbConnect()

    try {
      const forum = await Forums.find().populate('threads')
      return res.status(200).json({ forum })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  return res.status(400).json({ error: 'This API call only accepts GET requests' })
}
