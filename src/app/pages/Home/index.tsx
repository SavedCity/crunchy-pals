import React from 'react'
import axios from 'axios'
import { useAllForums } from 'contexts/forums/all-forums'
import H1 from 'components/_atoms/H1'
import HomeHeroContent from 'components/HomeHeroContent'
import Forum from 'components/_organisms/Forum'
import { useMyUser } from 'contexts/users/my'

import styles from './index.module.scss'

export default function HomePage() {
  const { user, setUserData } = useMyUser()
  const { allForums } = useAllForums()
  console.log('USER', user.favoriteForums)

  const favoriteForum = async (userId: string, forum: { _id?: string }) => {
    const favoriteForums = user.favoriteForums
    const forumIsFavorited = !!favoriteForums.find((id: string) => id === forum._id)

    const handleFavoriteForumUpdate = () => {
      let newFavoriteForumsArr
      if (forumIsFavorited) {
        // unfavorite forum
        newFavoriteForumsArr = favoriteForums.filter((id: string) => id !== forum._id)
        setUserData({ ...user, favoriteForums: newFavoriteForumsArr })
      } else {
        // favorite forum
        newFavoriteForumsArr = favoriteForums.push(forum._id)
        setUserData({ favoriteForums: newFavoriteForumsArr, ...user })
      }
    }

    const res = await axios
      .patch(`/api/forums/${forumIsFavorited ? 'un' : ''}favorite-forum`, {
        userId,
        forum: forumIsFavorited ? forum : forum._id,
      })
      .then(() => {
        handleFavoriteForumUpdate()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.home}>
      <HomeHeroContent />

      <div className={styles.home__forums}>
        <H1>Forums:</H1>
        <div className={styles['home__forums--tiles']}>
          {allForums?.map((forum: any, i: number) => {
            return <Forum key={i} forum={forum} handleFavoriteForum={favoriteForum} user={user} />
          })}
        </div>
      </div>
    </div>
  )
}
