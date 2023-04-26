import React from 'react'
import axios from 'axios'
import { useMyUser } from 'contexts/users/my'
import Forum from 'components/_organisms/Forum'
import H1 from 'components/_atoms/H1'

import styles from './index.module.scss'

export default function FavoritesPage() {
  const { user, favoriteForums, setUserData } = useMyUser()

  console.log(favoriteForums)

  const unfavoriteForum = async (userId: string, forum: any) => {
    const res = await axios
      .patch(`/api/forums/unfavorite-forum`, {
        userId,
        forum,
      })
      .then(() => {
        const newFavoriteForumsArr = user.favoriteForums.filter(
          (rev: { _id: string }) => rev._id !== forum._id
        )
        setUserData({ ...user, favoriteForums: newFavoriteForumsArr })
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.favorites}>
      <div className={styles.favorites__forums}>
        <H1>Favorite Forums: </H1>
        <div className={styles['favorites__forums--tiles']}>
          {favoriteForums?.map((forum: any, i: number) => {
            return (
              <Forum
                forum={forum}
                key={i}
                user={user}
                handleFavoriteForum={unfavoriteForum}
                filledHeart={true}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
