import React, { useContext, useEffect, useState } from 'react'
import UserContext from 'contexts/user'

import Field from 'components/_molecules/Field'
import classNames from 'classnames'
import axios from 'axios'

import styles from './index.module.scss'
import Router from 'next/router'

interface EditProfileProps {
  user: {
    username: string
    _id: string
  }
}

export default function EditProfile({ user }: EditProfileProps) {
  const { setUserData }: object | any = useContext(UserContext)
  const { _id, username } = user || {}

  const [newUsername, setNewUsername] = useState<string>(username || '')
  const [newImageUrl, setNewImageUrl] = useState<string>(username || '')

  const updateProfile = async () => {
    const res = await axios
      .put(`/api/users/update-user/${_id}`, {
        username: newUsername,
      })
      .then(res => {
        console.log(res?.data?.user)
        setUserData(res?.data?.user)
        Router.push(`/profile/${newUsername}`)
      })
      .catch(err => console.log(err))
  }

  return (
    <div
      className={classNames({
        [styles.fields]: true,
      })}
    >
      <Field
        placeholder='Username'
        label='Username'
        leftIcon='person'
        value={newUsername}
        onChange={e => setNewUsername(e.target.value)}
      />
      <Field
        placeholder='Image'
        label='Image'
        leftIcon='image'
        value={newImageUrl}
        onChange={e => setNewImageUrl(e.target.value)}
      />
      <button onClick={updateProfile}>Update</button>
    </div>
  )
}
