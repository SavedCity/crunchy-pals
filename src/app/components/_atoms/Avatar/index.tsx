import Image from '../Image'

interface AvatarProps {
  src: string
  size: number
}

export default function Avatar({ src, size }: AvatarProps) {
  const altText = src?.match(/^.*?([^\\/.]*)[^\\/]*$/)?.[1] + ' avatar' || 'Avatar'

  return <Image src={src} alt={altText} width={size} height={size} />
}
