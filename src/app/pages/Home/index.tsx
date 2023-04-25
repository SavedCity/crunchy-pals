import React from 'react'
import axios from 'axios'
import { useAllForums } from 'contexts/forums/all-forums'
import H1 from 'components/_atoms/H1'
import HomeHeroContent from 'components/HomeHeroContent'
import ReviewTiles from 'components/_organisms/ReviewTiles'
import { useMyUser } from 'contexts/users/my'

import styles from './index.module.scss'

export default function HomePage() {
  const { user, setUserData } = useMyUser()
  const { allForums } = useAllForums()
  console.log(allForums)

  const favoriteForum = async (userId: string, forum: { _id?: string }) => {
    const favoriteForums = user.favoriteForums
    const forumIsFavorited = favoriteForums.findIndex(({ _id }: any) => _id === forum._id) !== -1

    const handleFavoriteForumUpdate = () => {
      let newFavoriteForumsArr
      if (forumIsFavorited) {
        // unfavorite forum
        newFavoriteForumsArr = favoriteForums.filter(
          (rev: { _id: string }) => rev._id !== forum._id
        )
        setUserData({ ...user, favoriteForums: newFavoriteForumsArr })
      } else {
        // favorite forum
        newFavoriteForumsArr = favoriteForums.push(forum)
        setUserData({ favoriteForums: newFavoriteForumsArr, ...user })
      }
    }

    const res = await axios
      .patch(`/api/forums/${forumIsFavorited ? 'un' : ''}favorite-forum`, {
        userId,
        forum,
      })
      .then(() => {
        handleFavoriteForumUpdate()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.home}>
      <HomeHeroContent />

      <div className={styles.home__reviews}>
        <H1>Forums:</H1>
        <div className={styles['home__reviews--tiles']}>
          {allForums?.map((forum: any, i: number) => {
            return (
              <ReviewTiles key={i} forum={forum} handleFavoriteForum={favoriteForum} user={user} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
