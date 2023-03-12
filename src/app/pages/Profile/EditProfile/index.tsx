import React, { useContext, useEffect, useState } from 'react'
import { useMyUser } from 'contexts/users/my'

import Field from 'components/_molecules/Field'
import classNames from 'classnames'
import axios from 'axios'

import styles from './index.module.scss'
import Router from 'next/router'

interface EditProfileProps {
  user: {
    _id: string
    username: string
    image: string
    dob: string
  }
}

export default function EditProfile({ user }: EditProfileProps) {
  const { setUserData } = useMyUser()
  const { _id, username, image, dob } = user || {}

  const [newUsername, setNewUsername] = useState<string>('')
  const [newDob, setNewDob] = useState<string>('')
  // const [newImageUrl, setNewImageUrl] = useState<string>(image || '')

  const updateProfile = async () => {
    const res = await axios
      .patch(`/api/users/update-user/${_id}`, {
        username: newUsername,
        // image: newImageUrl,
        dob: newDob,
      })
      .then(res => {
        console.log(res?.data?.user)
        setUserData(res?.data?.user)
        Router.push(`/profile/${newUsername}`)
      })
      .catch(err => console.log(err))
  }

  const setInputValues = () => {
    setNewUsername(username)
    setNewDob(dob)
    // setNewImageUrl(image)
  }

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setInputValues()
    }
  }, [user])

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
      {/* <Field
        placeholder='Image'
        label='Image'
        leftIcon='image'
        value={newImageUrl}
        onChange={e => setNewImageUrl(e.target.value)}
      /> */}
      <Field
        // type='date'
        placeholder='Date of birth'
        label='Date of birth'
        leftIcon='calendar_month'
        value={newDob}
        onChange={e => setNewDob(e.target.value)}
      />
      <button onClick={updateProfile}>Update</button>
    </div>
  )
}
