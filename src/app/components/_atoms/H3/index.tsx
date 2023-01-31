import React from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

export interface H1Props {
  children: React.ReactNode
  className?: string
}

const H3 = ({ children, className = '', ...props }: H1Props) => (
  <h3
    className={classNames({
      [styles.h3]: true,
      [className]: !!className,
    })}
    {...props}
  >
    {children}
  </h3>
)

export default H3
