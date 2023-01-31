import React from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

export interface H1Props {
  children: React.ReactNode
  className?: string
}

const H2 = ({ children, className = '', ...props }: H1Props) => (
  <h2
    className={classNames({
      [styles.h2]: true,
      [className]: !!className,
    })}
    {...props}
  >
    {children}
  </h2>
)

export default H2
