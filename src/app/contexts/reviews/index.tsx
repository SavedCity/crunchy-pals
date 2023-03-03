import { ReactNode, createContext, useEffect, useState } from 'react'
import axios from 'axios'

const ReviewsContext = createContext({})

interface Props {
  children: ReactNode
}

export const ReviewsProvider = ({ children }: Props) => {
  const [reviews, setReviews] = useState<object>({})

  const getReviewsData = async () => {
    const reviews = await axios
      .get(`/api/reviews/get-reviews/`)
      .then(res => {
        setReviews(res.data.reviews)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getReviewsData()
  }, [])

  return (
    <ReviewsContext.Provider value={{ reviews, setReviews }}>
      {children}
    </ReviewsContext.Provider>
  )
}

export default ReviewsContext
