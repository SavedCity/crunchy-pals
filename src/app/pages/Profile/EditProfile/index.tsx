import React, { useContext, useEffect, useState } from 'react'
import UserContext from 'contexts/user'

import Field from 'components/_molecules/Field'
import classNames from 'classnames'
import axios from 'axios'

import styles from './index.module.scss'

export default function EditProfile() {
  const { userData, setUserData }: object | any = useContext(UserContext)
  const { _id } = userData || {}

  const [username, setUsername] = useState<string>('')

  console.log(userData)

  const updateProfile = async () => {
    const res = await axios
      .put(`/api/users/update-user/${_id}`, {
        username,
      })
      .then(res => {
        console.log(res?.data?.user)
        setUserData(res?.data?.user)
      })
      .catch(err => console.log(err))
  }

  // useEffect(() => {}, [])

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
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button onClick={updateProfile}>Update</button>
    </div>
  )
}
