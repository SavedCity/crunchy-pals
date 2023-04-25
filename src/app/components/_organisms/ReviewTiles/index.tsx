import { useState } from 'react'
import classNames from 'classnames'
import Icon from 'components/_atoms/Icon'
import Tile from 'components/_atoms/Tile'
import P from 'components/_atoms/P'
import H3 from 'components/_atoms/H3'

import styles from './index.module.scss'

interface ForumTilesProps {
  forum: {
    _id?: string
    description: string
    name: string
    author: string
    threads: object[]
  }
  user?: {
    _id: string
    username: string
    favoriteReviews: object[]
  }
  filledHeart?: boolean
  deleteForum?: (reviewId: string) => void
  handleFavoriteForum?: (userId: string, forum: object) => void
}

export default function ReviewTiles({
  forum,
  user,
  filledHeart = false,
  deleteForum,
  handleFavoriteForum,
}: ForumTilesProps) {
  const { _id, description, name, author, threads } = forum
  const [filteredForum] = useState(
    Object.fromEntries(Object.entries(forum).filter(([key]) => key !== '__v'))
  )

  const generateStarRatings = (num: number) =>
    new Array(num).fill('').map((_, i) => {
      return (
        <Icon className={styles.reviewTile__ratingIcon} key={i} iconName='star' size='md' filled />
      )
    })

  const isForumFavorited = !!user?.favoriteReviews?.find(
    ({ _id }: any) => _id === filteredForum._id
  )

  return (
    <Tile className={styles.reviewTile}>
      {deleteForum && (
        <Icon
          className={styles.reviewTile__deleteIcon}
          iconName='delete'
          handleClick={() => deleteForum?.(_id!)}
        />
      )}
      {user?.username !== author && handleFavoriteForum && (
        <Icon
          className={classNames({
            [styles.reviewTile__heartIcon]: true,
            // [styles['reviewTile__heartIcon--isFavoritePage']]: true,
          })}
          iconName='favorite'
          handleClick={() => handleFavoriteForum?.(user?._id!, filteredForum)}
          filled={filledHeart || isForumFavorited}
        />
      )}
      <P className={styles.reviewTile__createdby}>{author}</P>
      <H3 className={styles.reviewTile__productName}>{name}</H3>
      <P className={styles.reviewTile__createdby}>{description}</P>
      <P className={styles.reviewTile__createdby}>{threads.length} thread/s</P>
      {/* <Image className={styles.reviewTile__image} src={''} /> */}
      {/* {rating ? generateStarRatings(rating) : 'No rating'} */}
    </Tile>
  )
}
