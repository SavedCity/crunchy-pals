import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'lib/dbConnect'
import User from 'utils/schema/User'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    await dbConnect()
    try {
      const { forum, userId } = req.body

      if (forum && userId) {
        const user = await User.findByIdAndUpdate(
          { _id: userId },
          { $pull: { favoriteForums: forum._id } },
          {
            new: true,
          }
        )
        return res.json({ status: 200, 'Unfavorited forum': forum })
      }
      return res.json({ status: 404, error: 'No user id or data passed' })
    } catch (error) {
      return res.json({ status: 400, error: 'Bad request' })
    }
  }
  return res.json({
    status: 400,
    error: 'This API call only accepts PATCH methods',
  })
}
