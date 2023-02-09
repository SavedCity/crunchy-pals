import classNames from 'classnames'
import cat from 'public/avatars/cat.png'
import Avatar from 'components/_atoms/Avatar'
import EditProfile from './EditProfile'

import styles from './index.module.scss'

export default function ProfilePage({ user }: any) {
  const { _id, username, email, createdAt } = user || {}

  return (
    <div
      className={classNames({
        [styles.profile]: true,
      })}
    >
      <Avatar src={cat?.src} size={80} />
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
