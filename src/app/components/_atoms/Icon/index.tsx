import Icon from '@mui/material/Icon'
import classNames from 'classnames'

import styles from './index.module.scss'

// to search for icons: https://fonts.google.com/icons

export type IconSize = 'sm' | 'md' | 'lg' | 'xl'

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: string
  size?: IconSize
  filled?: boolean
}

const Icon_ = ({ name, className = '', size = 'lg', filled = true }: IconProps) => {
  return (
    <span
      className={classNames({
        [styles.icon]: true,
        [styles[`icon__${size}`]]: !!size,
        ['material-symbols-outlined']: !filled,
        ['material-symbols-filled']: filled,
        [className]: !!className,
      })}
    >
      {name}
    </span>
  )
}

export default Icon_
