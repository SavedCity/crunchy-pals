import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import Router from 'next/router'

export default function LoginPage() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const redirectToHome = () => {
    const { pathname } = Router
    if (pathname === '/login') Router.push('/')
  }

  const loginUser = async (e: any) => {
    e.preventDefault()
    const res: any = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: `${window.location.origin}`,
    })
    res.error ? console.log(res.error) : redirectToHome()
  }

  return (
    <div>
      <section>
        <p>Don't have an account?</p>
        <Link href={'/sign-up'}>Sign Up</Link>
      </section>

      <form onSubmit={loginUser}>
        <label htmlFor='email'></label>
        <input
          id='email'
          type='text'
          placeholder='Email'
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor='password'></label>
        <input
          id='password'
          type='password'
          placeholder='Password'
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <input type='submit' />
      </form>
    </div>
  )
}
