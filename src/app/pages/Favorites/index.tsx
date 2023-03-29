import React from 'react'
import axios from 'axios'
import { useMyUser } from 'contexts/users/my'
import ReviewTiles from 'components/_organisms/ReviewTiles'
import H1 from 'components/_atoms/H1'

import styles from './index.module.scss'

export default function FavoritesPage() {
  const { user, favoriteReviews, setUserData } = useMyUser()

  const unfavoriteReview = async (userId: string, review: object) => {
    console.log(review)
    console.log(user)

    const res = await axios
      .patch(`/api/reviews/unfavorite-review`, {
        userId,
        review,
      })
      .then(() => {
        const newFavoriteReviewsArr = user.favoriteReviews.filter((rev: object) => rev !== review)
        setUserData({ ...user, favoriteReviews: newFavoriteReviewsArr })
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
                filledHeart={true}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
