import React, { useContext } from 'react'
import UserContext from 'contexts/user'
import H3 from 'components/_atoms/H3'
import P from 'components/_atoms/P'
import Image from 'components/_atoms/Image'

import styles from './index.module.scss'
import ReviewsContext from 'contexts/reviews'

export default function HomePage() {
  const { userData }: object | any = useContext(UserContext)
  const { reviews }: object | any = useContext(ReviewsContext)
  const { username } = userData || {}

  const reviewsLoaded = Object.keys(reviews).length > 0

  if (reviewsLoaded) {
    return (
      <>
        <div className={styles.homeContainer}>
          Great Home Page Content by {username}
        </div>

        <div>
          {reviews.map((review: any, i: number) => {
            const { productName, rating, image, createdBy } = review
            return (
              <div key={i}>
                <P>{createdBy}</P>
                <H3>{productName}</H3>
                {/* <Image src={''} /> */}
                <P>{rating}</P>
              </div>
            )
          })}
        </div>
      </>
    )
  } else {
    return <h1>Loading...</h1>
  }
}
