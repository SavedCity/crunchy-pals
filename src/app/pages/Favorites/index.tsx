import React from 'react'
import { useFavoriteReviews } from 'contexts/users/my'
import ReviewTiles from 'components/_organisms/ReviewTiles'
import H1 from 'components/_atoms/H1'

import styles from './index.module.scss'

export default function FavoritesPage() {
  const { favoriteReviews } = useFavoriteReviews()
  console.log(favoriteReviews)

  return (
    <div className={styles.favorites}>
      <div className={styles.favorites__reviews}>
        <H1>Favorite Reviews: </H1>
        <div className={styles['favorites__reviews--tiles']}>
          {favoriteReviews?.map((review: any, i: number) => {
            return <ReviewTiles review={review} key={i} />
          })}
        </div>
      </div>
    </div>
  )
}
