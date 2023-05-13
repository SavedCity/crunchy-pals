import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'lib/dbConnect'
import User from 'utils/schema/User'
import Forum from 'utils/schema/Forum'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body

  if (req.method === 'POST') {
    await dbConnect()
    try {
      const user = await User.findOne({ email }, { hashedPassword: 0 }).populate({
        path: 'favoriteForums',
        model: Forum,
      })
      return res.json({ status: 200, favoriteForums: user.favoriteForums })
    } catch (error) {
      return res.json({ status: 400, error: 'Bad request' })
    }
  }
  return res.json({ status: 400, error: 'This API call only accepts POST methods' })
}
