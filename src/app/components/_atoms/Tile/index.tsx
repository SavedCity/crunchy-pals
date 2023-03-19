import classNames from 'classnames'
import Icon from 'components/_atoms/Icon'

import styles from './index.module.scss'

interface tileProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Tile({
  children,
  className = '',
  ...props
}: tileProps) {
  return (
    <div
      className={classNames({
        [styles.tile]: true,
        [className]: !!className,
      })}
      {...props}
    >
      {children}
    </div>
  )
}
