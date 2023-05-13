import React from 'react'
import classNames from 'classnames'
import Image, { ImageProps, ImageLoaderProps } from 'next/image'

import styles from './index.module.scss'

export interface ImageProps_ extends Omit<ImageProps, 'alt'> {
  // lazy?: Boolean;
  src: string
  alt: any
}

const Image_ = ({
  children,
  src,
  alt,
  className = '',
  // lazy = true,
  ...props
}: ImageProps_) => {
  // const altText = src?.match(/^.*?([^\\/.]*)[^\\/]*$/)?.[1] || "";

  return (
    <Image
      src={src}
      alt={alt}
      className={classNames({
        [styles.image]: true,
        [className]: !!className,
      })}
      {...props}
    />
  )
}

export default Image_
