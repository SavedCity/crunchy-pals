import { useContext, useState } from 'react'
import axios from 'axios'
import { useMyUser } from 'contexts/users/my'
import FieldInput from 'components/_atoms/FieldInput'
import H4 from 'components/_atoms/H4'

import styles from './index.module.scss'

interface FileUploaderProps {
  id: string
  isCroppingComponent?: boolean
  handleCroppedImage?: () => void
  croppedImage?: string
}

export default function FileUploader({
  id,
  isCroppingComponent = false,
  handleCroppedImage,
  croppedImage,
}: FileUploaderProps) {
  const { setUserData } = useMyUser()

  const [imageSrc, setImageSrc] = useState<string>('')
  const [uploadedData, setUploadedData] = useState<any>()

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64Data = reader.result?.toString()
        setImageSrc(base64Data || '')
        setUploadedData(undefined)
      }
      reader.readAsDataURL(file)
    } else {
      setImageSrc('')
    }
  }

  const handleButtonClick = async () => {
    if (imageSrc) {
      try {
        const formData = new FormData()
        formData.append('file', imageSrc)
        formData.append('upload_preset', 'profile_avatar')

        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/savedcity/image/upload',
          formData
        )

        const { secure_url } = response.data

        updateProfile(secure_url)
        setUploadedData(response.data)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleCroppedImageUpload = async () => {
    try {
      handleCroppedImage!()
      const formData = new FormData()
      formData.append('file', croppedImage)
      formData.append('upload_preset', 'profile_avatar')

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/savedcity/image/upload',
        formData
      )

      const { secure_url } = response.data

      updateProfile(secure_url)
      setUploadedData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const updateProfile = async (image: string) => {
    try {
      const res = await axios.patch(`/api/users/update-user/${id}`, {
        image,
      })
      setUserData(res.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.fileUploader}>
      <div>
        {isCroppingComponent ? (
          <button onClick={handleCroppedImageUpload}>Upload Cropped Image</button>
        ) : (
          <FieldInput type='file' name='file' onChange={handleFileInputChange} />
        )}
      </div>

      {imageSrc && !uploadedData && (
        <div>
          <img src={imageSrc} alt='Uploaded File' />
          <p>
            <button onClick={handleButtonClick}>Upload File</button>
          </p>
        </div>
      )}

      {uploadedData && <H4>Uploaded!</H4>}
    </div>
  )
}
