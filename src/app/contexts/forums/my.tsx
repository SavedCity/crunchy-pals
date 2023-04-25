import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useMyUser } from 'contexts/users/my'

const MyReviewsContext = createContext({})

interface MyReviewsProviderProps {
  children: ReactNode
}

export const MyReviewsProvider = ({ children }: MyReviewsProviderProps) => {
  const { user } = useMyUser()
  const { query } = useRouter()
  const [myReviews, setMyReviews] = useState([])

  const slug = query.slug

  const getMyReviewsData = async () => {
    const reviews = await axios
      .get(`/api/reviews/my-reviews/${slug}`)
      .then(res => {
        setMyReviews(res.data.myReviews)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (slug) {
      getMyReviewsData()
    }
  }, [user])

  return (
    <MyReviewsContext.Provider value={{ myReviews, setMyReviews }}>
      {children}
    </MyReviewsContext.Provider>
  )
}

const useReviewsContext = () => useContext(MyReviewsContext)

export const useMyReviews = () => {
  const { myReviews, setMyReviews }: object | any = useReviewsContext()
  const reviewsLoaded = Object.keys(myReviews).length > 0

  return reviewsLoaded ? { myReviews, setMyReviews } : {}
}
