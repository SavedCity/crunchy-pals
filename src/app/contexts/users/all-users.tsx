import { useSession } from 'next-auth/react'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import axios from 'axios'

const UsersContext = createContext({})

interface UserProviderProps {
  children: ReactNode
}

export const UsersProvider = ({ children }: UserProviderProps) => {
  const { data: session, status } = useSession()
  const user: object | undefined | any = session ? session.user : {}
  const { email } = user

  const [usersData, setUsersData] = useState([])

  const getUserData = async () => {
    const res = await axios
      .post(`/api/users/get-user`, {
        email,
      })
      .then(res => {
        setUsersData(res.data.user)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (email) {
      getUserData()
    }
  }, [email])

  return (
    <UsersContext.Provider value={{ usersData, status, setUsersData }}>
      {children}
    </UsersContext.Provider>
  )
}

const useUsersContext = () => useContext(UsersContext)

export const useAllUsers = () => {
  const { usersData, setUsersData }: object | any = useUsersContext()
  return { users: usersData, setUsersData }
}
