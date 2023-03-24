import React from 'react'
import axios from 'axios'
import { useAllReviews } from 'contexts/reviews/all-reviews'
import H1 from 'components/_atoms/H1'
import HomeHeroContent from 'components/HomeHeroContent'
import ReviewTiles from 'components/_organisms/ReviewTiles'

import styles from './index.module.scss'
import { useMyUser } from 'contexts/users/my'

export default function HomePage() {
  const { user, setUserData } = useMyUser()
  const { allReviews } = useAllReviews()

  const favoriteProfile = async (userId: string, favoriteReview: object) => {
    const res = await axios
      .patch(`/api/reviews/favorite-review`, {
        userId,
        favoriteReview,
      })
      .then(res => {
        const newFavoriteReviewsArr = user.favoriteReviews.push(
          res.data.favoriteReview
        )
        setUserData({ favoriteReviews: newFavoriteReviewsArr, ...user })
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.home}>
      <HomeHeroContent />

      <div className={styles.home__reviews}>
        <H1>Reviews:</H1>
        <div className={styles['home__reviews--tiles']}>
          {allReviews?.map((review: any, i: number) => {
            return (
              <ReviewTiles
                key={i}
                review={review}
                favoriteProfile={favoriteProfile}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
