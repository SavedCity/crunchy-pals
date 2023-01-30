import cat from 'public/avatars/cat.png'
import Avatar from 'components/_atoms/Avatar'
import { useState } from 'react'
import Link from 'next/link'

import styles from './index.module.scss'

export default function ProfileMenu() {
  const [openMenu, setOpenMenu] = useState<boolean>(true)

  return (
    <div className={styles.profile}>
      <section className={styles.profile__avatar} onClick={() => setOpenMenu(!openMenu)}>
        <Avatar src={cat?.src} size={40} />
      </section>

      {openMenu && (
        <section className={styles.profile__menu}>
          <Link href={'/profile'}>Profile</Link>
          <Link href={'/favorites'}>Favorites</Link>
        </section>
      )}
    </div>
  )
}
