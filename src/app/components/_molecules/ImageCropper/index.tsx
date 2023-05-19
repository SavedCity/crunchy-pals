import { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../cropImage'

import styles from './index.module.scss'

interface ImageCropperProps {
  imageSrc: string
  setProfileImage: (image: string) => void
}

export default function ImageCropper({ imageSrc, setProfileImage }: ImageCropperProps) {
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
  const [croppedImage, setCroppedImage] = useState<string | null>(null)

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage: any = await getCroppedImg(imageSrc, croppedAreaPixels, rotation)
      console.log('done', { croppedImage })
      setCroppedImage(croppedImage)
      if (croppedImage) {
        setProfileImage(croppedImage)
      }
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  // const onClose = useCallback(() => {
  //   setCroppedImage(null)
  // }, [])

  return (
    <div className={styles.imageCropper}>
      <div>
        <Cropper
          image={imageSrc}
          crop={crop}
          onCropChange={setCrop}
          rotation={rotation}
          onRotationChange={setRotation}
          zoom={zoom}
          onZoomChange={setZoom}
          aspect={5 / 5}
          cropShape='round'
          onCropComplete={onCropComplete}
        />
      </div>
      <div style={{ position: 'relative' }}>
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
        {/* <div>
          Rotation
          <input
            type='range'
            value={rotation}
            min={0}
            max={360}
            step={1}
            aria-labelledby='Rotation'
            onChange={(e: any, rotation: SetStateAction<number>) => setRotation(rotation)}
          />
        </div> */}
        <button onClick={showCroppedImage}>Show Result</button>
      </div>
      <div>
        <img src={croppedImage ?? ''} alt='Cropped image' />
      </div>
    </div>
  )
}
