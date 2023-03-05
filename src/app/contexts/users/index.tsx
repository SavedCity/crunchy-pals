import { useSession } from 'next-auth/react'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import axios from 'axios'

const UserContext = createContext({})

interface Props {
  children: ReactNode
}

export const UserProvider = ({ children }: Props) => {
  const { data: session, status } = useSession()
  const user: object | undefined | any = session ? session.user : {}
  const { email } = user

  const [userData, setUserData] = useState<object>({})

  const getUserData = async () => {
    const res = await axios
      .post(`/api/users/get-user`, {
        email,
      })
      .then(res => {
        setUserData(res.data.user)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (email) {
      getUserData()
    }
  }, [email])

  return (
    <UserContext.Provider value={{ userData, status, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

const useUserContext = () => useContext(UserContext)

export const useAllUsers = () => {
  const { userData, setUserData }: object | any = useUserContext()
  return { users: userData, setUserData }
}
