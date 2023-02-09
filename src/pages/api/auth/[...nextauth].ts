import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { compare } from 'bcrypt'
import clientPromise from 'lib/mongodb'
import dbConnect from 'lib/dbConnect'
import User from 'utils/schema/User'
import type { NextAuthOptions } from 'next-auth'

// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    GoogleProvider({
      clientId: <string>process.env.GOOGLE_ID,
      clientSecret: <string>process.env.GOOGLE_SECRET,
    }),
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>',
    // }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        // connect to the DB and find the user
        await dbConnect()
        // find user with email
        const user = await User.findOne({
          email: credentials?.email,
        })
        // email not found
        if (!user) throw new Error('Email is not registered')
        // check hashed password in DB
        const isPasswordCorrect = await compare(credentials!.password, user.hashedPassword)
        // incorrect password
        if (!isPasswordCorrect) throw new Error('Password is incorrect')

        return user
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt' },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
