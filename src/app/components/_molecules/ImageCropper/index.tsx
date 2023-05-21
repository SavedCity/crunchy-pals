import { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../cropImage'

import styles from './index.module.scss'
import FileUploader from '../FileUploader'

interface ImageCropperProps {
  id: string
  profileImage: string
  setProfileImage: (image: string) => void
}

export default function ImageCropper({ profileImage, id, setProfileImage }: ImageCropperProps) {
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

  const handleCroppedImage = useCallback(async () => {
    console.log('yo')

    try {
      const croppedImage: any = await getCroppedImg(profileImage, croppedAreaPixels, rotation)
      if (croppedImage) {
        setProfileImage(croppedImage)
      }
    } catch (e) {
      console.error(e)
    }
  }, [profileImage, croppedAreaPixels, rotation, setProfileImage])

  return (
    <div className={styles.imageCropper}>
      <div>
        <Cropper
          image={profileImage}
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
        <FileUploader
          id={id}
          croppedImage={profileImage}
          isCroppingComponent
          handleCroppedImage={handleCroppedImage}
        />
      </div>
    </div>
  )
}
