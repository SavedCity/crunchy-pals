import type { NextApiRequest, NextApiResponse } from 'next'
import Reviews from 'utils/schema/Review'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res
      .status(200)
      .json({ error: 'This API call only accepts POST methods' })
  }

  // const {
  //   productName,
  //   rating,
  //   image,
  //   description,
  //   placeOfPurchase,
  //   createdBy,
  // } = req.body;

  const bodyData = req.body

  const newReview = new Reviews(bodyData)

  console.log(newReview)

  await newReview
    .save()
    .then(() =>
      res
        .status(201)
        .json({ msg: 'Successfuly created new review: ' + newReview })
    )
    .catch((err: string) =>
      res
        .status(400)
        .json({ error: "Error on '/api/review/new-review': " + err })
    )
}
