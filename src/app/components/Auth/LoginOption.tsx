import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

import styles from './index.module.scss'

export default function LoginOption() {
  const { data: session } = useSession()

  if (session) {
    return (
      <button className={styles.signOut} onClick={() => signOut()}>
        Sign out
      </button>
    )
  }
  return (
    <Link className={styles.signIn} href={'/login'}>
      Sign in
    </Link>
  )
}
