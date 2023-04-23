import React from 'react'
import axios from 'axios'
import { useAllReviews } from 'contexts/reviews/all-reviews'
import H1 from 'components/_atoms/H1'
import HomeHeroContent from 'components/HomeHeroContent'
import ReviewTiles from 'components/_organisms/ReviewTiles'
import { useMyUser } from 'contexts/users/my'

import styles from './index.module.scss'

export default function HomePage() {
  const { user, setUserData } = useMyUser()
  const { allReviews } = useAllReviews()
  console.log(allReviews)

  const favoriteReview = async (userId: string, review: { _id?: string }) => {
    const favoriteReviews = user.favoriteReviews
    const reviewIsFavorited = favoriteReviews.findIndex(({ _id }: any) => _id === review._id) !== -1

    const handleFavoriteReviewUpdate = () => {
      let newFavoriteReviewsArr
      if (reviewIsFavorited) {
        // unfavorite review
        newFavoriteReviewsArr = favoriteReviews.filter(
          (rev: { _id: string }) => rev._id !== review._id
        )
        setUserData({ ...user, favoriteReviews: newFavoriteReviewsArr })
      } else {
        // favorite review
        newFavoriteReviewsArr = favoriteReviews.push(review)
        setUserData({ favoriteReviews: newFavoriteReviewsArr, ...user })
      }
    }

    const res = await axios
      .patch(`/api/reviews/${reviewIsFavorited ? 'un' : ''}favorite-review`, {
        userId,
        review,
      })
      .then(() => {
        handleFavoriteReviewUpdate()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.home}>
      <HomeHeroContent />

      <div className={styles.home__reviews}>
        <H1>Forums:</H1>
        <div className={styles['home__reviews--tiles']}>
          {allReviews?.map((review: any, i: number) => {
            return (
              <ReviewTiles
                key={i}
                review={review}
                handleFavoriteReview={favoriteReview}
                user={user}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
