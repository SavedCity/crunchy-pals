import classNames from 'classnames'
import Avatar from 'components/_atoms/Avatar'
import EditProfile from './EditProfile'
import FileUploader from 'components/_molecules/FileUploader'
import { useAllUsers } from 'contexts/users'
import { useMyReviews } from 'contexts/reviews/my-reviews'
import { useEffect, useState } from 'react'

import styles from './index.module.scss'
import { useRouter } from 'next/router'
import { useAllReviews } from 'contexts/reviews/all-reviews'
import H3 from 'components/_atoms/H3'
import P from 'components/_atoms/P'
import H1 from 'components/_atoms/H1'

export default function ProfilePage({ user }: any) {
  const { users } = useAllUsers()
  const { myReviews } = useMyReviews()

  const [data, setData] = useState(user)
  const { _id, username, email, createdAt, image } = data || {}

  useEffect(() => {
    if (Object.keys(users).length) {
      setData(users)
    }
  }, [users])

  return (
    <div
      className={classNames({
        [styles.profile]: true,
      })}
    >
      <section
        className={classNames({
          [styles.profile__avatar]: true,
        })}
      >
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
  )
}
