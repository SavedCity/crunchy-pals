import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { UserProvider } from 'src/app/contexts/user'

import 'styles/base.scss'
import { useState } from 'react'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [name, setname] = useState<string>('andy')
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </SessionProvider>
  )
}
