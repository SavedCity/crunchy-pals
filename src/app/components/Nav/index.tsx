import { useSession } from 'next-auth/react'
import Link from 'next/link'
import ProfileMenu from 'components/_organisms/ProfileMenu'
import IconLink from 'components/_molecules/LinkIcon'
import classNames from 'classnames'
import { useMyUser } from 'contexts/users/my'

import styles from './index.module.scss'

export default function Nav() {
  const { user } = useMyUser()
  const numberOfReviews = user?.favoriteReviews?.length

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
        {/* <div className={styles[`nav__rightSide--icon`]}> */}
        <IconLink IconName='favorite' href='/favorites'>
          <div className={styles[`nav__rightSide--numberOfReviews`]}>{numberOfReviews}</div>
        </IconLink>
        {/* </div> */}
        <ProfileMenu />
      </section>
    </div>
  )
}
