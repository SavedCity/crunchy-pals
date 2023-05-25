import { useState } from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

interface Modal {
  openButtonText: string
  children: React.ReactNode
}

export default function Modal({ children, openButtonText, ...props }: Modal) {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)

  return (
    <>
      <button onClick={() => setIsModalOpened(true)}>{openButtonText}</button>
      {isModalOpened && (
        <div
          className={classNames({
            [styles.modal]: true,
          })}
          {...props}
        >
          <div className={styles.modal__content}>
            {children}
            <button
              className={styles['modal__content--close']}
              onClick={() => setIsModalOpened(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
