import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { UserProvider } from 'src/app/contexts/user'

import Layout from 'components/Layout'

import 'styles/base.scss'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </SessionProvider>
  )
}
