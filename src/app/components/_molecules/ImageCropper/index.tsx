import { useCallback, useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'
import handleImageCrop from '../../../helpers/cropImage'

import styles from './index.module.scss'
import FileUploader from '../FileUploader'
import { useMyUser } from 'contexts/users/my'

interface ImageCropperProps {
  id: string
}

export default function ImageCropper({ id }: ImageCropperProps) {
  const { user } = useMyUser()
  const { image } = user || {}

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState<number>(0)
  const [zoom, setZoom] = useState<number>(1)
  const [croppedImageAreaPixels, setCroppedImageAreaPixels] = useState<{
    x: number
    y: number
    width: number
    height: number
  }>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })
  const [croppedImage, setCroppedImage] = useState<string>()

  const getCroppedImage = useCallback(async () => {
    try {
      const croppedImage: any = await handleImageCrop(image, croppedImageAreaPixels)
      setCroppedImage(croppedImage)
      return croppedImage
    } catch (error) {
      console.error(error)
      return null
    }
  }, [image, croppedImageAreaPixels])

  return (
    <div className={styles.imageCropper}>
      <div>
        <Cropper
          image={image}
          crop={crop}
          onCropChange={setCrop}
          rotation={rotation}
          onRotationChange={setRotation}
          zoom={zoom}
          onZoomChange={setZoom}
          aspect={5 / 5}
          cropShape='round'
          onCropComplete={(_, croppedImageAreaPixels) =>
            setCroppedImageAreaPixels(croppedImageAreaPixels)
          }
        />
      </div>
      <div className={styles.imageCropper__controls}>
        <div>
          Zoom
          <input
            type='range'
            value={zoom}
            min={1}
            max={3}
            step={0.01}
            aria-labelledby='Zoom'
            onChange={e => setZoom(Number(e.target.value))}
          />
        </div>
        <FileUploader
          id={id}
          isCroppingComponent
          getCroppedImage={getCroppedImage}
          croppedImageAreaPixels={croppedImageAreaPixels}
        />
        <img src={croppedImage} alt='profile image' />
      </div>
    </div>
  )
}
