import dbConnect from 'lib/dbConnect'
import type { NextApiRequest, NextApiResponse } from 'next'
import Discussions from 'utils/schema/Discussion'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await dbConnect()
    try {
      const discussions = await Discussions.find({})
      return res.json({ status: 200, discussions })
    } catch (error) {
      return res.json({ status: 400, error: 'Bad request' })
    }
  }

  return res.json({
    status: 400,
    error: 'This API call only accepts GET methods',
  })
}
