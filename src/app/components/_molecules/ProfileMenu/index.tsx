import cat from 'public/avatars/cat.png'
import Avatar from 'components/_atoms/Avatar'
import { useContext, useState } from 'react'
import UserContext from 'contexts/user'
import Link from 'next/link'
import P from 'components/_atoms/P'

import styles from './index.module.scss'

export default function ProfileMenu() {
  const [openMenu, setOpenMenu] = useState<boolean>(true)

  // const { userData }: object | any = useContext(UserContext)
  // const { username, email, createdAt } = userData

  return (
    <div className={styles.profile}>
      <section className={styles.profile__avatar} onClick={() => setOpenMenu(!openMenu)}>
        <Avatar src={cat?.src} size={40} />
      </section>

      {openMenu && (
        <section className={styles.profile__menu}>
          <P>Signed in as </P>
          <Link href={'/profile'}>Profile</Link>
          <Link href={'/favorites'}>Favorites</Link>
        </section>
      )}
    </div>
  )
}
