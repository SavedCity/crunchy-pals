import { useSession } from 'next-auth/react'
import Link from 'next/link'
import ProfileMenu from 'components/ProfileMenu'

import styles from './index.module.scss'
import LinkWithIcon from 'components/_molecules/LinkWithIcon'
import classNames from 'classnames'

export default function Nav() {
  const { data: session } = useSession()
  const user: object | undefined | any = session ? session.user : {}

  return (
    <div
      className={classNames({
        [styles.nav]: true,
      })}
    >
      <section>
        <Link href={'/'} className={styles.nav__brandName}>
          ReviewT
        </Link>
      </section>

      <section className={styles.nav__rightSide}>
        <LinkWithIcon IconName='favorite' href='/favorites' />
        <ProfileMenu />
      </section>
    </div>
  )
}
