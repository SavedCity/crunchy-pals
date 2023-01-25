import React, { ReactNode } from 'react'
import Head from '../Head'
import Nav from '../Nav'
import Footer from '../Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
