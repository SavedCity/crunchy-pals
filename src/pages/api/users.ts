import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from 'utils/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise
  const db = client.db('ReviewT_App')
  switch (req.method) {
    case 'POST':
      let bodyObject = JSON.parse(req.body)
      let newUser = await db.collection('users').insertOne(bodyObject)
      res.json(newUser.ops[0])
      break
    case 'GET':
      const users = await db.collection('users').find({}).toArray()
      res.json({ status: 200, data: users })
      break
  }
}
