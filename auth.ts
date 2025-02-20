import NextAuth, { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import clsx from 'clsx';

export const config: NextAuthConfig = {
  pages: {
    signIn: 'sign-in',
    error: 'sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, //30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        //find user in db
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );

          //if password is match, return user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }

        //if user or password do not match, return null
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      //set the user id from the token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      //if there is an update, set the user name
      if (trigger === 'update') {
        session.user.name = user.name;
      }
      return session;
    },
    async jwt({ token, user }: any) {
      //assign user fields to token

      if (user) {
        token.role = user.role;

        //if user has no name
        if (user.name === 'NO_NAME') {
          token.email = user.email!.split('@')[0];

          //update db to reflect token name
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }
      return token;
    },
    authorized({ request, auth }: any) {
      //Check for session cart cookie
      if (!request.cookies.get('sessionCartId')) {
        //Generate new session cart id cookie
        const sessionCartId = crypto.randomUUID();

        //clone request headers
        const newRequestHeaders = new Headers(request.headers);

        //create new response
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });
        //set new generated session cart id in the response cookies
        response.cookies.set('sessionCartId', sessionCartId);
        return response;
      } else {
        return true;
      }
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
