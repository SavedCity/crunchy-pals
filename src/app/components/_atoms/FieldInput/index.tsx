import React from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

export interface FieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const FieldInput = ({ className = '', ...props }: FieldInputProps) => {
  return (
    <input
      {...props}
      className={classNames({
        [styles.input]: true,
        [className]: !!className,
      })}
    />
  )
}

export default FieldInput
