import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from 'lib/mongodb'
import User from 'utils/schema/User'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const client = await clientPromise
  // const db = client.db('ReviewT_App')

  if (req.method === 'GET') {
    try {
      const users = await User.find({}, { hashedPassword: 0 })
      return res.json({ status: 200, users })
    } catch (error) {
      return res.json({ status: 400, error: 'Bad request' })
    }
  }
  return res.json({ status: 400, error: 'This API call only accepts GET methods' })
}
