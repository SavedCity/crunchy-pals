import React from 'react'
import { useAllReviews } from 'contexts/reviews/all-reviews'
import H1 from 'components/_atoms/H1'
import H3 from 'components/_atoms/H3'
import P from 'components/_atoms/P'
import Image from 'components/_atoms/Image'
import Icon from 'components/_atoms/Icon'
import HomeHeroContent from 'components/HomeHeroContent'

import styles from './index.module.scss'

export default function HomePage() {
  const { allReviews } = useAllReviews()

  const addToFavorites = (review: any) => {
    console.log(review)
  }

  return (
    <div className={styles.homeContainer}>
      <HomeHeroContent />

      <div className={styles.homeContainer__reviewsContainer}>
        <H1>Reviews:</H1>
        <div className={styles.homeContainer__reviewTiles}>
          {allReviews?.map((review: any, i: number) => {
            const { productName, rating, image, createdBy } = review
            return (
              <div key={i}>
                <Icon
                  iconName='favorite'
                  handleClick={() => addToFavorites(review)}
                />
                <P>{createdBy}</P>
                <H3>{productName}</H3>
                {/* <Image src={''} /> */}
                <P>{rating}</P>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
