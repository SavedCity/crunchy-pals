import classNames from 'classnames'
import Icon from 'components/_atoms/Icon'
import Link from 'next/link'
import { IconSize } from 'components/_atoms/Icon'
import Tile from 'components/_atoms/Tile'
import P from 'components/_atoms/P'
import H3 from 'components/_atoms/H3'

import styles from './index.module.scss'

interface ReviewTilesProps {
  review: {
    productName: string
    rating: number
    image: string
    createdBy: string
  }
}

export default function ReviewTiles({ review }: ReviewTilesProps) {
  const addToFavorites = (review: any) => {
    console.log(review)
  }

  const { productName, rating, image, createdBy } = review
  return (
    <Tile className={styles.reviewTile}>
      <Icon
        className={styles.reviewTile__icon}
        iconName='favorite'
        handleClick={() => addToFavorites(review)}
      />
      <P className={styles.reviewTile__createdby}>{createdBy}</P>
      <H3 className={styles.reviewTile__productName}>{productName}</H3>
      {/* <Image className={styles.reviewTile__image} src={''} /> */}
      <P className={styles.reviewTile__rating}>{rating}</P>
    </Tile>
  )
}
