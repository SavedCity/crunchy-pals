import classNames from 'classnames'
import Avatar from 'components/_atoms/Avatar'
import EditProfile from '../../components/_organisms/EditProfile'
import FileUploader from 'components/_molecules/FileUploader'
import { useMyUser } from 'contexts/users/my'
import { useMyReviews } from 'contexts/reviews/my'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAllReviews } from 'contexts/reviews/all-reviews'
import H3 from 'components/_atoms/H3'
import P from 'components/_atoms/P'
import H1 from 'components/_atoms/H1'
import ReviewTiles from 'components/_organisms/ReviewTiles'

import styles from './index.module.scss'

export default function ProfilePage() {
  const { user } = useMyUser()
  const { myReviews } = useMyReviews()

  const { _id, username, email, createdAt, image } = user || {}

  return (
    <div
      className={classNames({
        [styles.profile]: true,
      })}
    >
      <section className={styles.profile__avatar}>
        <Avatar fill src={image} />
      </section>

      <FileUploader id={_id} />

      <br />
      <span>
        Username: <b>{username}</b>
      </span>
      <br />
      <span>
        Email: <b>{email}</b>
      </span>
      <br />
      <span>
        Member since: <b>{createdAt}</b>
      </span>

      <EditProfile user={user} />

      <H1>My Reviews: </H1>
      {myReviews?.map((review: any, i: number) => {
        return <ReviewTiles review={review} key={i} />
      })}
    </div>
  )
}
