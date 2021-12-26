import { JWT_SECRET } from '@/utils/secrets';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { trpc } from '@/utils/trpc';
import { prisma } from '@/utils/prisma';

/**
 * NextAuth provider implementation
 */
export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const username = credentials?.username;
        const password = credentials?.password;

        // Check for undefined
        if (username == null || password == null) return null;

        // Query requested user
        const userQuery = await trpc.useQuery(['user.get', { username }]);

        // On error return null
        if (userQuery.error) return null;

        // If no error and we have user data, return it
        const { data } = userQuery;
        if (data) {
          const res = await bcrypt.compare(password, data.password);
          if (res) return data;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user?.type) {
        token.status = user.type;
      }
      if (user?.username) {
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.type = token.type;
      session.username = token.username;
      return session;
    },
  },
  jwt: {
    secret: JWT_SECRET,
    maxAge: 60 * 60 * 24,
  },
});
