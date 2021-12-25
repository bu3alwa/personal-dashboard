import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/utils/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { trpc } from '@/utils/trpc';

/**
 * NextAuth provider implementation
 */
export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
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

        if (username == null || password == null) return null;

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
});
