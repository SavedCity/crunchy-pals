import { useSession } from 'next-auth/react'
import Link from 'next/link'
import ProfileMenu from 'components/ProfileMenu'

import styles from './index.module.scss'

export default function Nav() {
  const { data: session } = useSession()
  const user: object | undefined | any = session ? session.user : {}

  return (
    <div className={styles.navContainer}>
      <Link href={'/'} className={styles.brandName}>
        ReviewT
      </Link>

      <ProfileMenu />
    </div>
  )
}
