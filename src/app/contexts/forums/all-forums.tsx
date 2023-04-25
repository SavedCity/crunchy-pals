import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AllForumsContext = createContext({})

interface ReviewsProviderProps {
  children: ReactNode
}

export const ReviewsProvider = ({ children }: ReviewsProviderProps) => {
  const [allForums, setAllForums] = useState([])

  const getAllReviewsData = async () => {
    const forums = await axios
      .get(`/api/forums/all-forums`)
      .then(res => {
        setAllForums(res.data.forums)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllReviewsData()
  }, [])

  return (
    <AllForumsContext.Provider value={{ allForums, setAllForums }}>
      {children}
    </AllForumsContext.Provider>
  )
}

const useReviewsContext = () => useContext(AllForumsContext)

export const useAllForums = () => {
  const { allForums }: object | any = useReviewsContext()
  const reviewsLoaded = Object.keys(allForums || {}).length > 0

  return reviewsLoaded ? { allForums } : {}
}
