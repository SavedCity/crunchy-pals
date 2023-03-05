import classNames from 'classnames'
import Avatar from 'components/_atoms/Avatar'
import EditProfile from './EditProfile'
import FileUploader from 'components/_molecules/FileUploader'
import { useAllUsers } from 'contexts/users'
import { useEffect, useState } from 'react'

import styles from './index.module.scss'

export default function ProfilePage({ user }: any) {
  const { users } = useAllUsers()

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
    </div>
  )
}
