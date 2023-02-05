import classNames from 'classnames'
import Icon from 'components/_atoms/Icon'
import Link from 'next/link'

import styles from './index.module.scss'

interface LinkWithIconProps {
  href: string
  IconName: string
  className?: string
  children: React.ReactNode
}

export default function LinkWithIcon({
  href = '/',
  IconName,
  className = '',
  children,
}: LinkWithIconProps) {
  return (
    <Link
      className={classNames({
        [styles.link]: true,
        [className]: !!className,
      })}
      href={href}
    >
      <Icon name={IconName} />
      {children}
    </Link>
  )
}
