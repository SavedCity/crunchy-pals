import React from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

export interface H1Props {
  children: React.ReactNode
  className?: string
}

const H4 = ({ children, className = '', ...props }: H1Props) => (
  <h4
    className={classNames({
      [styles.h4]: true,
      [className]: !!className,
    })}
    {...props}
  >
    {children}
  </h4>
)

export default H4
