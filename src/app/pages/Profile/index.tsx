import classNames from 'classnames'
import Avatar from 'components/_atoms/Avatar'
import EditProfile from './EditProfile'
import FileUploader from 'components/_molecules/FileUploader'
import UserContext from 'contexts/user'
import { useContext, useEffect, useState } from 'react'

import styles from './index.module.scss'

export default function ProfilePage({ user }: any) {
  const { userData }: object | any = useContext(UserContext)

  const [data, setData] = useState(user)
  const { _id, username, email, createdAt, image } = data || {}

  useEffect(() => {
    if (Object.keys(userData).length) {
      setData(userData)
    }
  }, [userData])

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

      <FileUploader id={_id} username={username}/>

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

      <br />
      <br />
      {image}

      <EditProfile user={user} />
    </div>
  )
}
