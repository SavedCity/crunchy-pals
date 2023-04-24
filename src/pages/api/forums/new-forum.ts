import type { NextApiRequest, NextApiResponse } from 'next'
import Forum from 'utils/schema/Forum'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(200).json({ error: 'This API call only accepts POST methods' })
  }

  const bodyData = req.body
  const newForum = new Forum(bodyData)

  await newForum
    .save()
    .then(() => res.status(201).json({ msg: 'Successfuly created new forum: ' + newForum }))
    .catch((err: string) =>
      res.status(400).json({ error: "Error on '/api/forums/new-forum': " + err })
    )
}
