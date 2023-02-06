import React from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

export interface FieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const FieldInput = ({ className = '', id, ...props }: FieldInputProps) => {
  return (
    <input
      id={id}
      {...props}
      className={classNames({
        [styles.input]: true,
        [className]: !!className,
      })}
    />
  )
}

export default FieldInput
