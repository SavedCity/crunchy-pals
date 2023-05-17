import { useContext, useState } from 'react'
import axios from 'axios'
import { useMyUser } from 'contexts/users/my'

import FieldInput from 'components/_atoms/FieldInput'
import H4 from 'components/_atoms/H4'

import styles from './index.module.scss'

interface FileUploaderProps {
  id: string
}

export default function FileUploader({ id }: FileUploaderProps) {
  const { setUserData } = useMyUser()

  const [imageSrc, setImageSrc] = useState<string>('')
  const [uploadedData, setUploadedData] = useState()
  // const [uploadedData, setUploadedData] = useState<boolean>()

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent: React.ChangeEvent | any) {
    const reader = new FileReader()

    reader.onload = function (onLoadEvent: any) {
      setImageSrc(onLoadEvent.target.result)
      setUploadedData(undefined)
    }

    if (changeEvent.target.files.length > 0) {
      reader.readAsDataURL(changeEvent.target.files[0])
    } else {
      setImageSrc('')
    }
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(e: { preventDefault: () => void; currentTarget: any }) {
    e.preventDefault()
    const form = e.currentTarget
    const fileInput: any = Array.from(form.elements).find(({ name }: any) => name === 'file')
    const formData = new FormData()
    for (const file of fileInput.files) {
      formData.append('file', file)
    }
    formData.append('upload_preset', 'profile_avatar')

    const data = await fetch('https://api.cloudinary.com/v1_1/savedcity/image/upload', {
      method: 'POST',
      body: formData,
    }).then(r => r.json())

    updateProfile(data.secure_url)
    setImageSrc(data.secure_url)
    setUploadedData(data)
    fileInput.value = ''
  }

  const updateProfile = async (image: string) => {
    const res = await axios
      .patch(`/api/users/update-user/${id}`, {
        image,
      })
      .then(res => {
        setUserData(res.data.user)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.fileUploader}>
      <form
        className={styles.fileUploader__form}
        method='post'
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
      >
        <div>
          <FieldInput type='file' name='file' />
        </div>

        {imageSrc && !uploadedData && (
          <div>
            <img src={imageSrc} />
            <p>
              <button>Upload Files</button>
            </p>
          </div>
        )}

        {uploadedData && <H4>Uploaded!</H4>}
      </form>
    </div>
  )
}
