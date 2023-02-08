import React, { useContext, useEffect, useState } from 'react'
import UserContext from 'contexts/user'

import Field from 'components/_molecules/Field'
import classNames from 'classnames'
import axios from 'axios'

import styles from './index.module.scss'

interface EditProfileProps {
  username: string
  id: string
}

export default function EditProfile({ username, id }: EditProfileProps) {
  const { setUserData }: object | any = useContext(UserContext)
  // const { id, username } = userData || {}

  const [newUsername, setNewUsername] = useState<string>(username || '')

  const updateProfile = async () => {
    const res = await axios
      .put(`/api/users/update-user/${id}`, {
        username: newUsername,
      })
      .then(res => {
        console.log(res?.data?.user)
        setUserData(res?.data?.user)
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
        type='text'
        placeholder='Username'
        label='Username'
        leftIcon='person'
        value={newUsername}
        onChange={e => setNewUsername(e.target.value)}
      />
      <button onClick={updateProfile}>Update</button>
    </div>
  )
}
