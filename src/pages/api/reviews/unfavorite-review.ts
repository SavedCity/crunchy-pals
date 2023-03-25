import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'lib/dbConnect'
import User from 'utils/schema/User'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    await dbConnect()
    try {
      const { unfavoriteReview, userId } = req.body

      if (unfavoriteReview && userId) {
        const user = await User.findByIdAndUpdate(
          { _id: userId },
          { $pull: { favoriteReviews: unfavoriteReview } },
          {
            new: true,
          }
        )
        return res.json({ status: 200, unfavoriteReview })
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
