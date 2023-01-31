import React from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

export interface H1Props {
  children: React.ReactNode
  className?: string
}

const P = ({ children, className = '', ...props }: H1Props) => (
  <p
    className={classNames({
      [styles.p]: true,
      [className]: !!className,
    })}
    {...props}
  >
    {children}
  </p>
)

export default P
