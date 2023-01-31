import React from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

export interface H1Props {
  children: React.ReactNode
  className?: string
}

const H5 = ({ children, className = '', ...props }: H1Props) => (
  <h5
    className={classNames({
      [styles.h5]: true,
      [className]: !!className,
    })}
    {...props}
  >
    {children}
  </h5>
)

export default H5
