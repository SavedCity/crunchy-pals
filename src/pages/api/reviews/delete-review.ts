import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'lib/dbConnect'
import Review from 'utils/schema/Review'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    await dbConnect()
    try {
      const { _id } = req.body
      console.log(_id)

      if (_id) {
        const review = await Review.findByIdAndDelete(_id)
        return res.json({ status: 200, review })
      }
      return res.json({ status: 404, error: 'No user id passed' })
    } catch (error) {
      return res.json({ status: 400, error: 'Bad request' })
    }
  }
  return res.json({
    status: 400,
    error: 'This API call only accepts DELETE methods',
  })
}
