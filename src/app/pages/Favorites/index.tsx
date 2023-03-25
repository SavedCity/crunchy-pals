import React from 'react'
import axios from 'axios'
import { useFavoriteReviews, useMyUser } from 'contexts/users/my'
import ReviewTiles from 'components/_organisms/ReviewTiles'
import H1 from 'components/_atoms/H1'

import styles from './index.module.scss'

export default function FavoritesPage() {
  const { user, setUserData } = useMyUser()
  const { favoriteReviews } = useFavoriteReviews()

  const unfavoriteReview = async (userId: string, unfavoriteReview: object) => {
    // const newFavoriteReviewsArr = user.favoriteReviews.filter(
    //   (rev: { _id: string }) => rev !== unfavoriteReview
    // )
    // console.log(newFavoriteReviewsArr)

    // console.log(unfavoriteReview)
    // console.log(user.favoriteReviews)
    // console.log(
    //   setUserData({ favoriteReviews: newFavoriteReviewsArr, ...user })
    // )

    const res = await axios
      .patch(`/api/reviews/unfavorite-review`, {
        userId,
        unfavoriteReview,
      })
      .then(res => {
        const newFavoriteReviewsArr = user.favoriteReviews.filter(
          (rev: { _id: string }) => rev !== unfavoriteReview
        )
        console.log(newFavoriteReviewsArr)

        setUserData({ favoriteReviews: newFavoriteReviewsArr, ...user })
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.favorites}>
      <div className={styles.favorites__reviews}>
        <H1>Favorite Reviews: </H1>
        <div className={styles['favorites__reviews--tiles']}>
          {favoriteReviews?.map((review: any, i: number) => {
            return (
              <ReviewTiles
                review={review}
                key={i}
                user={user}
                handleFavoriteReview={unfavoriteReview}
                isFavoritePage={true}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
