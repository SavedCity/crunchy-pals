import styles from './index.module.scss'
import React, { useContext } from 'react'
import UserContext from 'contexts/user'

export default function HomePage() {
  const { userData }: object | any = useContext(UserContext)
  const { username } = userData || {}

  return (
    <>
      <div className={styles.homeContainer}>Great Home Page Content by {username}</div>
    </>
  )
}
