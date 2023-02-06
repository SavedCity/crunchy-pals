import React from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {

}

const FieldLabel = ({ children, className = '', ...props }: FieldLabelProps) => (
  <label
    className={classNames({
      [styles.fieldLabel]: true,
      [className]: !!className,
    })}
    {...props}
  >
    {children}
  </label>
)

export default FieldLabel
