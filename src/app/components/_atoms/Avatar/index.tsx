import Image from '../Image'
import placeholder from 'public/avatars/user-placeholder.png'

interface AvatarProps {
  src: string
  size?: number
  fill?: boolean
}

export default function Avatar({ src, size = 50, fill = false, ...props }: AvatarProps) {
  return (
    <Image
      alt='profile avatar'
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
