import classNames from 'classnames'

import styles from './index.module.scss'

// to search for icons: https://fonts.google.com/icons

export type IconSize = 'sm' | 'md' | 'lg' | 'xl'

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  iconName: string
  size?: IconSize
  filled?: boolean
}

const Icon = ({
  iconName,
  className = '',
  size = 'lg',
  filled = false,
}: IconProps) => {
  return (
    <span
      className={classNames({
        ['material-symbols-outlined']: true,
        [styles.icon]: true,
        [styles[`icon__${size}`]]: !!size,
        [styles['icon__filled']]: filled,
        [className]: !!className,
      })}
    >
      {iconName}
    </span>
  )
}

export default Icon
