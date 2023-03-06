import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const MyReviewsContext = createContext({})

interface Props {
  children: ReactNode
}

export const MyReviewsProvider = ({ children }: Props) => {
  const [myReviews, setMyReviews] = useState<object>({})
  const router = useRouter()

  const getMyReviewsData = async () => {
    const reviews = await axios
      .get(`/api/reviews/my-reviews/saved@reviewt.com`)
      .then(res => {
        setMyReviews(res.data.myReviews)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getMyReviewsData()
  }, [])

  return (
    <MyReviewsContext.Provider value={{ myReviews, setMyReviews }}>
      {children}
    </MyReviewsContext.Provider>
  )
}

const useReviewsContext = () => useContext(MyReviewsContext)

export const useMyReviews = () => {
  const { myReviews }: object | any = useReviewsContext()
  const reviewsLoaded = Object.keys(myReviews).length > 0

  return reviewsLoaded ? { myReviews } : {}
}
