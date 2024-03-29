import { useEffect, useState } from 'react'
import classNames from 'classnames'
import axios from 'axios'
import Avatar from 'components/_atoms/Avatar'
import EditProfile from '../../components/_organisms/EditProfile'
import FileUploader from 'components/_molecules/FileUploader'
import { useMyUser } from 'contexts/users/my'
import { useMyForums } from 'contexts/forums/my'
import H1 from 'components/_atoms/H1'
import Forum from 'components/_organisms/Forum'
import ImageCropper from 'components/_molecules/ImageCropper'
import Modal from 'components/_atoms/Modal'

import styles from './index.module.scss'

export default function ProfilePage() {
  const { user, profileImage } = useMyUser()
  const { _id, username, email, createdAt } = user || {}

  const { myForums, setMyForums } = useMyForums()

  const deleteForum = async (forumId: string) => {
    const forum = await axios
      .delete(`/api/forums/delete-forum`, {
        data: {
          _id: forumId,
        },
      })
      .then(res => {
        console.log(res.data.forum)
        setMyForums(myForums.filter((r: { _id: string }) => r._id !== res.data.forum._id))
      })
      .catch(err => console.log(err))
  }

  // const getCroppedImage = async () => {
  //   try {
  //     const croppedImage: any = await handleImageCrop(image, croppedImageAreaPixels)
  //     setCroppedProfileImage(croppedImage)
  //     return croppedImage
  //   } catch (error) {
  //     console.error(error)
  //     return null
  //   }
  // }

  // useEffect(() => {
  //   if (Object.keys(user).length) {
  //     getCroppedImage()
  //   }
  // }, [user])

  return (
    <div
      className={classNames({
        [styles.profile]: true,
      })}
    >
      <Avatar className={styles.profile__avatar} src={profileImage} size={200} />

      <Modal openButtonText='Crop Image'>
        <ImageCropper id={_id} />
      </Modal>

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

      <div className={styles.profile__forums}>
        <H1>My Forums: </H1>
        <div className={styles['profile__forums--tiles']}>
          {myForums?.map((forum: any, i: number) => {
            return <Forum key={i} forum={forum} deleteForum={deleteForum} />
          })}
        </div>
      </div>
    </div>
  )
}
