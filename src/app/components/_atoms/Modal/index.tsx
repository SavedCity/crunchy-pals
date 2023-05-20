import classNames from 'classnames'

import styles from './index.module.scss'

interface Modal {
  children: React.ReactNode
  closeModal: () => void
}

export default function Modal({ children, closeModal, ...props }: Modal) {
  return (
    <div
      className={classNames({
        [styles.modal]: true,
      })}
      {...props}
    >
      <div className={styles.modal__content}>
        {children}
        <button className={styles['modal__content--close']} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  )
}
