import Image from 'next/image'
import React, { useContext } from 'react'
import UserContext from 'src/app/contexts/user'

import cat from 'public/avatars/cat.png'
import Avatar from 'components/_atoms/Avatar'

export default function ProfilePage() {
  const { userData }: object | any = useContext(UserContext)
  const { username, email, createdAt } = userData

  return (
    <div>
      <Avatar src={cat?.src} size={80} />
      <br />
      <span>
        Username - <b>{username}</b>
      </span>
      <br />
      <span>
        Email - <b>{email}</b>
      </span>
      <br />
      <span>
        Member since - <b>{createdAt}</b>
      </span>
    </div>
  )
}
