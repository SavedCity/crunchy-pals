import LoginBtn from 'components/Auth/LoginBtn'
import styles from './index.module.scss'

export default function Nav() {
  return (
    <section className={styles.navContainer}>
      <a href="/" className={styles.brandName}>
        ReviewT
      </a>

      <section className={styles.linksContainer}>
        <a href="#">Profile</a>
        <a href="#">Favorites</a>
        <LoginBtn />
      </section>
    </section>
  )
}
