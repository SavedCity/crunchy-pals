import { useSession } from 'next-auth/react'
import Link from 'next/link'
import ProfileMenu from 'components/_organisms/ProfileMenu'
import IconLink from 'components/_molecules/LinkIcon'
import classNames from 'classnames'
import { useMyUser } from 'contexts/users/my'

import styles from './index.module.scss'

export default function Nav() {
  const { user } = useMyUser()
  const numberOfForums = user?.favoriteForums?.length

  return (
    <div
      className={classNames({
        [styles.nav]: true,
      })}
    >
      <section>
        <Link href={'/'} className={styles.nav__brandName}>
          Crunchy Pals
        </Link>
      </section>

      <section className={styles.nav__rightSide}>
        {/* <div className={styles[`nav__rightSide--icon`]}> */}
        <IconLink
          size='xxl'
          IconName='favorite'
          href='/favorites'
          className={styles[`nav__rightSide--favoriteLink`]}
        >
          <div>{numberOfForums}</div>
        </IconLink>
        {/* </div> */}

        <ProfileMenu />
      </section>
    </div>
  )
}
