import { useState } from 'react'
import Head from 'next/head'
import styles from './index.module.scss'

export default function FileUploader() {
  const [imageSrc, setImageSrc] = useState()
  const [uploadData, setUploadData] = useState()

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent: { target: { files: Blob[] } }) {
    const reader = new FileReader()

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result)
      setUploadData(undefined)
    }

    reader?.readAsDataURL(changeEvent?.target?.files?.[0])
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event: { preventDefault: () => void; currentTarget: any }) {
    event.preventDefault()

    const form = event.currentTarget
    const fileInput: any = Array.from(form.elements).find(({ name }) => name === 'file')

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
    setUploadData(data)
  }

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

          <img src={imageSrc} />

          {imageSrc && !uploadData && (
            <p>
              <button>Upload Files</button>
            </p>
          )}

          {uploadData && (
            <code>
              <pre>{JSON.stringify(uploadData, null, 2)}</pre>
            </code>
          )}
        </form>
      </main>
    </div>
  )
}
