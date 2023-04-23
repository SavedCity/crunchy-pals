import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AllReviewsContext = createContext({})

interface ReviewsProviderProps {
  children: ReactNode
}

export const ReviewsProvider = ({ children }: ReviewsProviderProps) => {
  const [allReviews, setAllReviews] = useState([])

  const getAllReviewsData = async () => {
    const reviews = await axios
      .get(`/api/reviews/all-reviews`)
      .then(res => {
        setAllReviews(res.data.forums)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllReviewsData()
  }, [])

  return (
    <AllReviewsContext.Provider value={{ allReviews, setAllReviews }}>
      {children}
    </AllReviewsContext.Provider>
  )
}

const useReviewsContext = () => useContext(AllReviewsContext)

export const useAllReviews = () => {
  const { allReviews }: object | any = useReviewsContext()
  const reviewsLoaded = Object.keys(allReviews || {}).length > 0

  return reviewsLoaded ? { allReviews } : {}
}
