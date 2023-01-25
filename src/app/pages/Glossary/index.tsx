import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function GlossaryPage() {
  return <h1 className={inter.className}>I am the mighty glossary</h1>
}
