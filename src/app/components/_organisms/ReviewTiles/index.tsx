import classNames from 'classnames'
import Icon from 'components/_atoms/Icon'
import Tile from 'components/_atoms/Tile'
import P from 'components/_atoms/P'
import H3 from 'components/_atoms/H3'
import { useMyUser } from 'contexts/users/my'

import styles from './index.module.scss'

interface ReviewTilesProps {
  review: {
    _id: string
    productName: string
    rating: number
    image: string
    createdBy: string
  }
  deleteReview?: (reviewId: string) => void
}

export default function ReviewTiles({
  review,
  deleteReview,
}: ReviewTilesProps) {
  const { user } = useMyUser()
  const { _id, productName, rating, image, createdBy } = review

  const addToFavorites = () => {
    console.log(review)
  }

  const generateStarRatings = (num: number) =>
    new Array(num)
      .fill('')
      .map((_, i) => (
        <Icon
          className={styles.reviewTile__ratingIcon}
          key={i}
          iconName='star'
          size='md'
          filled
        />
      ))

  return (
    <Tile className={styles.reviewTile}>
      <Icon
        className={styles.reviewTile__deleteIcon}
        iconName='delete'
        handleClick={() => deleteReview?.(_id)}
      />
      {user.username !== createdBy && (
        <Icon
          className={styles.reviewTile__heartIcon}
          iconName='favorite'
          handleClick={addToFavorites}
        />
      )}
      <P className={styles.reviewTile__createdby}>{createdBy}</P>
      <H3 className={styles.reviewTile__productName}>{productName}</H3>
      {/* <Image className={styles.reviewTile__image} src={''} /> */}
      {rating ? generateStarRatings(rating) : 'No rating'}
    </Tile>
  )
}
