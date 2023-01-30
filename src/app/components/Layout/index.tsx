import React, { ReactNode } from 'react'
import Head from '../Head'
import Nav from '../Nav'
import Footer from '../Footer'

import styles from './index.module.scss'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head />
      <Nav />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  )
}
