import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'lib/dbConnect'
import User from 'utils/schema/User'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    await dbConnect()
    try {
      const { review, userId } = req.body
      // console.log('favorite', review)

      if (review && userId) {
        const user = await User.findByIdAndUpdate(
          { _id: userId },
          { $push: { favoriteReviews: review } },
          {
            new: true,
          }
        )
        return res.json({ status: 200, 'Favorited review': review })
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
