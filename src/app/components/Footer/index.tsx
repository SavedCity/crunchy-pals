import Link from 'next/link'

import styles from './index.module.scss'

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <span>2023 Crunchy Pals ©</span>
      <Link href={'/about'}>About</Link>
    </div>
  )
}
