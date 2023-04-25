import classNames from 'classnames'
import axios from 'axios'
import Avatar from 'components/_atoms/Avatar'
import EditProfile from '../../components/_organisms/EditProfile'
import FileUploader from 'components/_molecules/FileUploader'
import { useMyUser } from 'contexts/users/my'
import { useMyReviews } from 'contexts/forums/my'
import H1 from 'components/_atoms/H1'
import ReviewTiles from 'components/_organisms/ReviewTiles'

import styles from './index.module.scss'

export default function ProfilePage() {
  const { user } = useMyUser()
  const { myReviews, setMyReviews } = useMyReviews()

  const { _id, username, email, createdAt, image } = user || {}

  const deleteReview = async (reviewId: string) => {
    const reviews = await axios
      .delete(`/api/reviews/delete-review`, {
        data: {
          _id: reviewId,
        },
      })
      .then(res => {
        console.log(res.data.review)
        setMyReviews(myReviews.filter((r: { _id: string }) => r._id !== res.data.review._id))
      })
      .catch(err => console.log(err))
  }

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

      <div className={styles.profile__reviews}>
        <H1>My Reviews: </H1>
        <div className={styles['profile__reviews--tiles']}>
          {myReviews?.map((review: any, i: number) => {
            return <ReviewTiles key={i} review={review} deleteReview={deleteReview} />
          })}
        </div>
      </div>
    </div>
  )
}
