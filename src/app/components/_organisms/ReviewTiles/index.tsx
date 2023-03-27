import classNames from 'classnames'
import Icon from 'components/_atoms/Icon'
import Tile from 'components/_atoms/Tile'
import P from 'components/_atoms/P'
import H3 from 'components/_atoms/H3'

import styles from './index.module.scss'

interface ReviewTilesProps {
  review: {
    _id?: string
    productName: string
    rating: number
    image: string
    createdBy: string
  }
  user?: {
    _id: string
    username: string
    favoriteReviews: object
  }
  filledHeart?: boolean
  deleteReview?: (reviewId: string) => void
  handleFavoriteReview?: (userId: string, favoriteReview: object) => void
}

export default function ReviewTiles({
  review,
  user,
  filledHeart = false,
  deleteReview,
  handleFavoriteReview,
}: ReviewTilesProps) {
  const { _id, productName, rating, image, createdBy } = review

  const generateStarRatings = (num: number) =>
    new Array(num).fill('').map((_, i) => {
      return (
        <Icon
          className={styles.reviewTile__ratingIcon}
          key={i}
          iconName='star'
          size='md'
          filled
        />
      )
    })

  const favoritedReview = user?.favoriteReviews?.find(
    ({ _id }: any) => _id === review._id
  )
  // console.log(user?.favoriteReviews?.include('fh'));
  
  console.log(favoritedReview);

  return (
    <Tile className={styles.reviewTile}>
      {deleteReview && (
        <Icon
          className={styles.reviewTile__deleteIcon}
          iconName='delete'
          handleClick={() => deleteReview?.(_id!)}
        />
      )}
      {user?.username !== createdBy && handleFavoriteReview && (
        <Icon
          className={classNames({
            [styles.reviewTile__heartIcon]: true,
            // [styles['reviewTile__heartIcon--isFavoritePage']]: true,
          })}
          iconName='favorite'
          handleClick={() => handleFavoriteReview?.(user?._id!, review)}
          filled={filledHeart || favoritedReview}
        />
      )}
      <P className={styles.reviewTile__createdby}>{createdBy}</P>
      <H3 className={styles.reviewTile__productName}>{productName}</H3>
      {/* <Image className={styles.reviewTile__image} src={''} /> */}
      {rating ? generateStarRatings(rating) : 'No rating'}
    </Tile>
  )
}
