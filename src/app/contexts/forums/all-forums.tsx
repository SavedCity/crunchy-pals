import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const AllForumsContext = createContext({})

interface ForumsProviderProps {
  children: ReactNode
}

export const ForumsProvider = ({ children }: ForumsProviderProps) => {
  const [allForums, setAllForums] = useState([])

  const getAllForumsData = async () => {
    const forums = await axios
      .get(`/api/forums/all-forums`)
      .then(res => {
        setAllForums(res.data.forums)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllForumsData()
  }, [])

  return (
    <AllForumsContext.Provider value={{ allForums, setAllForums }}>
      {children}
    </AllForumsContext.Provider>
  )
}

const useForumsContext = () => useContext(AllForumsContext)

export const useAllForums = () => {
  const { allForums }: object | any = useForumsContext()
  const forumsLoaded = Object.keys(allForums || {}).length > 0

  return forumsLoaded ? { allForums } : {}
}
