import classNames from 'classnames'
import FieldInput from 'components/_atoms/FieldInput'
import FieldLabel from 'components/_atoms/FieldLabel'
import Icon from 'components/_atoms/Icon'

import styles from './index.module.scss'

interface fieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  leftIcon?: string
  rightIcon?: string
}

export default function Field({
  type = 'text',
  label = '',
  leftIcon,
  rightIcon,
  ...props
}: fieldProps) {
  const renderInput = (type: string) => {
    switch (type) {
      case 'text':
        return <FieldInput id={label} {...props} />
      // case 'select':
      //   return <FieldSelect {...inputProps} />
    }
  }

  return (
    <div
      className={classNames({
        [styles.field]: true,
      })}
    >
      {label && <FieldLabel htmlFor={label}>{label}</FieldLabel>}
      <div
        className={classNames({
          [styles.field__wrapper]: true,
        })}
      >
        {leftIcon && <Icon name={leftIcon} />}
        {renderInput(type)}
        {rightIcon && <Icon name={rightIcon} />}
      </div>
    </div>
  )
}
