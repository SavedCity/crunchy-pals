import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'lib/dbConnect'
import User from 'utils/schema/User'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body

  if (req.method === 'POST') {
    await dbConnect()
    try {
      const user = await User.find({ email }, { hashedPassword: 0 })
      return res.json({ status: 200, user })
    } catch (error) {
      return res.json({ status: 400, error: 'Bad request' })
    }
  }
  return res.json({ status: 400, error: 'This API call only accepts POST methods' })
}
