import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'

export default function SignUpPage() {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const redirectToHome = () => {
    const { pathname } = Router
    if (pathname === '/sign-up') Router.push('/')
  }

  const registerUser = async (e: any) => {
    e.preventDefault()
    const res = await axios
      .post(
        '/api/auth/register-user',
        {
          username,
          email,
          password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      .then(async () => {
        redirectToHome()
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      <section>
        <p>Don't have an account?</p>
        <Link href={'/login'}>Log In</Link>
      </section>

      <form onSubmit={registerUser}>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          placeholder='Username'
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='text'
          placeholder='Email'
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor='password'>Password</label>
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
