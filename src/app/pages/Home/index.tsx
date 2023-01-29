import styles from './index.module.scss'
import React, { useContext } from 'react'
import UserContext from 'src/app/contexts/user'

export default function HomePage() {
  const { userData }: object | any = useContext(UserContext)

  return (
    <>
      <div className={styles.homeContainer}>Great Home Page Content by {userData.username}</div>
    </>
  )
}
