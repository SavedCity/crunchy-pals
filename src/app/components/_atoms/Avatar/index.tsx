import Image from "../Image";
import placeholder from "public/avatars/user-placeholder.png";

interface AvatarProps {
  src: string;
  size?: number;
  fill?: boolean;
}

export default function Avatar({ src, size = 50, fill = false }: AvatarProps) {
  const altText =
    src?.match(/^.*?([^\\/.]*)[^\\/]*$/)?.[1] + " avatar" || "Avatar";

  return (
    <Image
      fill={fill}
      src={src || placeholder}
      alt={altText}
      width={!fill ? size : undefined}
      height={!fill ? size : undefined}
    />
  );
}
