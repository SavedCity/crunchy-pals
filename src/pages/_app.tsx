import type { AppProps } from 'next/app'
import 'styles/base.scss'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
