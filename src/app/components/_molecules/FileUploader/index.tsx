import { useState } from 'react'
import styles from './index.module.scss'

export default function FileUploader() {
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

    setImageSrc(data.secure_url)
    setUploadedData(data)
    fileInput.value = ''
  }

  // TODO: store imageSrc into database then we can fetch it and apply it

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <form
          className={styles.form}
          method='post'
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
        >
          <p>
            <input type='file' name='file' />
          </p>

          {imageSrc && !uploadedData && (
            <div>
              <img src={imageSrc} />
              <p>
                <button>Upload Files</button>
              </p>
            </div>
          )}
        </form>
      </main>
    </div>
  )
}
