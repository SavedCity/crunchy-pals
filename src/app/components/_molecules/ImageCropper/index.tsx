import { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'

import styles from './index.module.scss'

interface FileUploaderProps {
  imageSrc: string
}

export default function ImageCropper({ imageSrc }: FileUploaderProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation)
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  return (
    <div>
      <div>
        <Cropper
          image={imageSrc}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div>
        <div>
          Zoom
          <input
            type='range'
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby='Zoom'
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </div>
        <div>
          Rotation
          <input
            type='range'
            value={rotation}
            min={0}
            max={360}
            step={1}
            aria-labelledby='Rotation'
            onChange={(e, rotation) => setRotation(rotation)}
          />
        </div>
        <button onClick={showCroppedImage}>Show Result</button>
      </div>
      {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
      <div>
        <img src={imageSrc} alt='Cropped' />
      </div>
    </div>
  )
}
