import React from 'react'
import { useAllReviews } from 'contexts/reviews/all-reviews'
import H1 from 'components/_atoms/H1'
import H3 from 'components/_atoms/H3'
import P from 'components/_atoms/P'
import Image from 'components/_atoms/Image'
import Icon from 'components/_atoms/Icon'
import HomeHeroContent from 'components/HomeHeroContent'
import Tile from 'components/_atoms/Tile'

import styles from './index.module.scss'
import ReviewTiles from 'components/_organisms/ReviewTiles'

export default function HomePage() {
  const { allReviews } = useAllReviews()

  return (
    <div className={styles.home}>
      <HomeHeroContent />

      <div className={styles.home__reviews}>
        <H1>Reviews:</H1>
        <div className={styles['home__reviews--tiles']}>
          {allReviews?.map((review: any, i: number) => {
            return <ReviewTiles review={review} key={i} />
          })}
        </div>
      </div>
    </div>
  )
}
