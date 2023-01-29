import LoginBtn from 'components/Auth/LoginBtn'
import styles from './index.module.scss'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Nav() {
  const { data: session } = useSession()
  const user: object | undefined | any = session ? session.user : {}

  return (
    <section className={styles.navContainer}>
      <a href='/' className={styles.brandName}>
        ReviewT
      </a>

      <section className={styles.linksContainer}>
        <Link href={'/profile'}>Profile</Link>
        <Link href={'/favorites'}>Favorites</Link>
        <LoginBtn />
        <span>{user?.name || user?.email}</span>
      </section>
    </section>
  )
}
