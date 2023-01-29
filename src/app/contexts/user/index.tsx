import { useSession } from 'next-auth/react'
import { ReactNode, createContext, useEffect, useState } from 'react'
import axios from 'axios'

const UserContext = createContext({})

interface Props {
  children: ReactNode
}

export const UserProvider = ({ children }: Props) => {
  const { data: session } = useSession()
  const user: object | undefined | any = session ? session.user : {}
  const { email } = user

  const [userData, setUserData] = useState<object>({})

  const getUserData = async () => {
    const res = await axios
      .post('/api/auth/get-user', {
        email,
      })
      .then(res => {
        setUserData(res!.data?.user[0])
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (email) {
      getUserData()
    }
  }, [email])

  return <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
}

export default UserContext
