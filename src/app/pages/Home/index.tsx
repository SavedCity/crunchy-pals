import React from 'react'
import { useAllUsers } from 'contexts/users'
import { useAllReviews } from 'contexts/reviews/all-reviews'
import H3 from 'components/_atoms/H3'
import P from 'components/_atoms/P'
import Image from 'components/_atoms/Image'

import styles from './index.module.scss'
import H1 from 'components/_atoms/H1'

export default function HomePage() {
  const { users } = useAllUsers()
  const { allReviews } = useAllReviews()
  const { username } = users || {}

  return (
    <div className={styles.homeContainer}>
      <div>Great Home Page Content by {username}</div>
      <H1>Reviews:</H1>
      <div className={styles.homeContainer__reviews}>
        {allReviews?.map((review: any, i: number) => {
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
    </div>
  )
}
