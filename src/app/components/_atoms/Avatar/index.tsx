import Image from 'next/image'

interface AvatarProps {
  src: string
  size: number
}

export default function Avatar({ src, size }: AvatarProps) {
  const altText = src?.match(/^.*?([^\\/.]*)[^\\/]*$/)?.[1] + ' avatar' || 'Avatar'

  return (
    <Image style={{ borderRadius: '100%' }} src={src} width={size} height={size} alt={altText} />
  )
}
