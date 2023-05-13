import React from 'react'
import axios from 'axios'
import { useMyUser } from 'contexts/users/my'
import { useFavoriteForums } from 'contexts/forums/favorite-forums'
import Forum from 'components/_organisms/Forum'
import H1 from 'components/_atoms/H1'

import styles from './index.module.scss'

export default function FavoritesPage() {
  const { user, setUserData } = useMyUser()
  const { favoriteForums, setFavoriteForums } = useFavoriteForums()

  const unfavoriteForum = async (userId: string, forum: any) => {
    const newFavoriteForumsArr = (favoriteForums: any) => {
      return favoriteForums.filter(({ _id }: any) => _id !== forum._id)
    }
    console.log(newFavoriteForumsArr(user.favoriteForums))
    console.log(newFavoriteForumsArr(favoriteForums))

    // const res = await axios
    //   .patch(`/api/forums/unfavorite-forum`, {
    //     userId,
    //     forum,
    //   })
    //   .then(() => {
    //     setUserData({ ...user, favoriteForums: newFavoriteForumsArr(user.favoriteForums) })
    //     setFavoriteForums(newFavoriteForumsArr(favoriteForums))
    //   })
    //   .catch(err => console.log(err))
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
