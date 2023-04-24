import type { NextApiRequest, NextApiResponse } from 'next'
import Forum from 'utils/schema/Forum'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { slug } = req.query

    try {
      const myForums = await Forum.find({ createdBy: slug })
      return res.json({ status: 200, myForums })
    } catch (error) {
      return res.json({ status: 400, error: 'Bad request' })
    }
  }

  return res.json({
    status: 400,
    error: 'This API call only accepts GET methods',
  })
}
