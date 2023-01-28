import { useSession } from 'next-auth/react'
import axios from 'axios'

import styles from './index.module.scss'
import React, { useEffect, useState } from 'react'

export default function HomePage() {
  const { data: session } = useSession()
  const user: object | undefined | any = session ? session.user : {}
  const { email } = user

  const [userData, setUserData] = useState<object | any>({})

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

  return (
    <>
      <div className={styles.homeContainer}>Great Home Page Content by {userData?.username}</div>
    </>
  )
}
