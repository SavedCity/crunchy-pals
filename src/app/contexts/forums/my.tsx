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

const MyForumsContext = createContext({})

interface MyForumsProviderProps {
  children: ReactNode
}

export const MyForumsProvider = ({ children }: MyForumsProviderProps) => {
  const { user } = useMyUser()
  const { query } = useRouter()
  const [myForums, setMyForums] = useState([])

  const slug = query.slug

  const getMyForumsData = async () => {
    const forums = await axios
      .get(`/api/forums/my-forums/${slug}`)
      .then(res => {
        setMyForums(res.data.myForums)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (slug) {
      getMyForumsData()
    }
  }, [user])

  return (
    <MyForumsContext.Provider value={{ myForums, setMyForums }}>
      {children}
    </MyForumsContext.Provider>
  )
}

const useForumsContext = () => useContext(MyForumsContext)

export const useMyForums = () => {
  const { myForums, setMyForums }: object | any = useForumsContext()
  const forumsLoaded = Object.keys(myForums).length > 0

  return forumsLoaded ? { myForums, setMyForums } : {}
}
