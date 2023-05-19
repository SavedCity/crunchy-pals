import Image from '../Image'
import placeholder from 'public/avatars/user-placeholder.png'
import classNames from 'classnames'

import styles from './index.module.scss'

interface AvatarProps {
  src: string
  size?: number
  fill?: boolean
  className?: string
}

export default function Avatar({
  src,
  className = '',
  size = 50,
  fill = false,
  ...props
}: AvatarProps) {
  return (
    <Image
      className={classNames({
        [styles.avatar]: true,
        [className]: !!className,
      })}
      alt='Profile avatar'
      fill={fill}
      src={src || placeholder.src}
      width={!fill ? size : undefined}
      height={!fill ? size : undefined}
      sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
      // priority={!src}
      blurDataURL={src}
      {...props}
    />
  )
}
