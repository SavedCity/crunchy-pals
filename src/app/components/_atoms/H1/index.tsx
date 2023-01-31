import React from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

export interface H1Props {
  children: React.ReactNode
  className?: string
}

const H1 = ({ children, className = '', ...props }: H1Props) => (
  <h1
    className={classNames({
      [styles.h1]: true,
      [className]: !!className,
    })}
    {...props}
  >
    {children}
  </h1>
)

export default H1
