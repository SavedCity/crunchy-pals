import dbConnect from 'lib/dbConnect'
import type { NextApiRequest, NextApiResponse } from 'next'
import Forums from 'utils/schema/Forum'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await dbConnect()
    try {
      const forums = await Forums.find({})
      return res.json({ status: 200, forums })
    } catch (error) {
      return res.json({ status: 400, error: 'Bad request' })
    }
  }

  return res.json({
    status: 400,
    error: 'This API call only accepts GET methods',
  })
}
