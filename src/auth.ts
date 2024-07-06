import { z } from 'zod'

import NextAuth, { User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';

import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
import { getServerSession } from "next-auth"

import { authConfig } from '@/auth.config'
import { signIn } from '@/actions/auth/sign-in'

declare module 'next-auth' {
  interface User {
    id: string
    accessToken: string
    email: string 
  }

  interface Session {
    id: string
    accessToken: string
    username: string
  }
}

async function authenticate(email: string, password: string) {
  try {
    const data = await signIn({email, password})
    console.log(`* data from authenticate for ${email}`, data.access_token) // TODO: remove

    if (!data) {
      return null
    }

    return {
      id: data.id,
      accessToken: data.access_token,
      email: data.email,
    }
  } catch (error) {
    return null
  }
}

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authConfig)
}

export default NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const schema = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
            // workspaceId: z.string(),
          })
          .safeParse(credentials)

        // authenticate
        if (schema.success) return await authenticate(schema.data.email, schema.data.password) as User;
        else return null;
      },
    }),
  ],
})
