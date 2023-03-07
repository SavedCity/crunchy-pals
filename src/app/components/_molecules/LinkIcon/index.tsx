import classNames from 'classnames'
import Icon from 'components/_atoms/Icon'
import Link from 'next/link'
import { IconSize } from 'components/_atoms/Icon'

import styles from './index.module.scss'

interface IconLinkProps {
  href: string
  IconName: string
  className?: string
  children?: React.ReactNode
  size?: IconSize
  filled?: boolean
}

export default function IconLink({
  href = '/',
  IconName,
  className = '',
  children,
  size,
  filled,
}: IconLinkProps) {
  return (
    <Link
      className={classNames({
        [styles.link]: true,
        [className]: !!className,
      })}
      href={href}
    >
      <Icon iconName={IconName} size={size} filled={filled} />
      {children}
    </Link>
  )
}
