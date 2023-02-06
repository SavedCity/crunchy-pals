import cat from 'public/avatars/cat.png'
import Avatar from 'components/_atoms/Avatar'
import { useContext, useEffect, useState, useRef } from 'react'
import UserContext from 'contexts/user'
import Link from 'next/link'
import P from 'components/_atoms/P'
import LoginOption from 'components/Auth/LoginOption'
import LinkWithIcon from 'components/_molecules/LinkWithIcon'
import Router from 'next/router'

import styles from './index.module.scss'

function useOutsideAlerter(ref: any, setOpenMenu: any, openMenu: boolean) {
  useEffect(() => {
    function handleClickOutside(e: any) {
      let clickedMenuLink = Array.from(document.getElementsByTagName('a')).includes(e.target)
      let clickedMenuIcon = Array.from(
        document.getElementsByClassName('material-symbols-outlined')
      ).includes(e.target)
      if (openMenu && (!ref.current?.contains(e.target) || clickedMenuLink || clickedMenuIcon)) {
        // if the click is inside the menu and the click is an anchor tag ('<a>' tag)
        if (ref.current?.contains(e.target) && (clickedMenuLink || clickedMenuIcon)) {
          Router.push(e.target.href || e.target.parentNode.href)
        }
        setOpenMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, openMenu])
}

export default function ProfileMenu() {
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const { userData }: object | any = useContext(UserContext)
  const { username } = userData

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, setOpenMenu, openMenu)

  return (
    <div ref={wrapperRef} className={styles.profile}>
      <section className={styles.profile__avatar} onClick={() => setOpenMenu(!openMenu)}>
        <Avatar src={cat?.src} size={40} />
      </section>

      {openMenu && (
        <div className={styles.profile__menu}>
          <section className={styles.profile__signedAs}>
            <P>
              Signed in as <em>{username}</em>
            </P>
          </section>

          <section className={styles.profile__links}>
            <LinkWithIcon href='/profile' IconName='account_circle'>
              Profile
            </LinkWithIcon>
            <LinkWithIcon href='/favorites' IconName='favorite'>
              Favorites
            </LinkWithIcon>
          </section>

          <section className={styles.profile__loginOption}>
            <LoginOption />
          </section>
        </div>
      )}
    </div>
  )
}
