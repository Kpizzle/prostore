import NextAuth, { NextAuthConfig } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './db/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge'

export const config: NextAuthConfig = {
	pages:
	{
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
						email: credentials.email as string
					}
				})

				console.log('located user:', user)

				if (user && user.password) {
					const isMatch = compareSync(credentials.password as string, user.password)

					//if password is match, return user
					if (isMatch) {
						return {
							id: user.id,
							name: user.name,
							email: user.email,
							role: user.role

						}
					}
				}

				//if user or password do not match, return null
				return null;
			}
		})
	],
	callbacks: {
		async session({ session, user, trigger, token }: any) {
			//set the user id from the token

			session.user.id = token.sub;

			//if there is an update, set the user name
			if (trigger === 'update') {
				session.user.name = user.name;
			}
			return session
		},
	}

}

export const { handlers, auth, signIn, signOut } = NextAuth(config)