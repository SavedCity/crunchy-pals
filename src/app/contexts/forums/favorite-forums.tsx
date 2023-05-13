import { useSession } from 'next-auth/react'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const FavoriteForumsContext = createContext({})

interface FavoriteForumsProviderProps {
  children: ReactNode
}

export const FavoriteForumsProvider = ({ children }: FavoriteForumsProviderProps) => {
  const [favoriteForums, setFavoriteForums] = useState([])
  const { data: session } = useSession()
  const user: object | undefined | any = session ? session.user : {}
  const { email } = user

  const getFavoriteForumsData = async () => {
    await axios
      .post(`/api/forums/get-favorite-forums`, {
        email,
      })
      .then(res => {
        setFavoriteForums(res.data.favoriteForums)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (email) {
      getFavoriteForumsData()
    }
  }, [email])

  return (
    <FavoriteForumsContext.Provider value={{ favoriteForums, setFavoriteForums }}>
      {children}
    </FavoriteForumsContext.Provider>
  )
}

const useFavoriteForumsContext = () => useContext(FavoriteForumsContext)

export const useFavoriteForums = () => {
  const { favoriteForums, setFavoriteForums }: object | any = useFavoriteForumsContext()
  const favoriteForumsLoaded = Object.keys(favoriteForums || {}).length > 0

  return favoriteForumsLoaded ? { favoriteForums, setFavoriteForums } : {}
}
