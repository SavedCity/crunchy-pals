import { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../cropImage'

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
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number
    y: number
    width: number
    height: number
  }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  // const [profileImage, setProfileImage] = useState(image)

  const handleCroppedImage = useCallback(async () => {
    try {
      const croppedImage: any = await getCroppedImg(image, croppedAreaPixels, rotation)
      return croppedImage
    } catch (error) {
      console.error(error)
      return null
    }
  }, [image, croppedAreaPixels, rotation])

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
          onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
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
        <FileUploader id={id} isCroppingComponent handleCroppedImage={handleCroppedImage} />
      </div>
    </div>
  )
}
