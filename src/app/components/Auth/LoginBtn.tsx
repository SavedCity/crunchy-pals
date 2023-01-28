import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function LoginBtn() {
  const { data: session } = useSession()
  // const user: object | undefined | any = session ? session.user : {}

  const logOut = () => {
    signOut()
  }

  if (session) {
    return (
      <>
        <button onClick={logOut}>Sign out</button>
      </>
    )
  }
  return (
    <>
      {/* <button onClick={() => signIn()}>Sign In</button> */}
      <Link href={'/login'}>Sign in</Link>
    </>
  )
}
