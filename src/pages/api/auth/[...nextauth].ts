import { JWT_SECRET, SECRET } from '@/utils/secrets';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
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
      async authorize(credentials) {
        const username = credentials?.username;
        const password = credentials?.password;

        // Check for undefined
        if (username == null || password == null) return null;

        const query = await prisma.user.findUnique({
          where: { name: username },
        });

        type userType = typeof query;
        const user: userType = query;

        if (!user) return null;

        const hashcompare = await bcrypt.compare(password, user.password);

        if (!hashcompare) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token;

      return session;
    },
  },
  jwt: {
    secret: JWT_SECRET,
    maxAge: 60 * 60 * 24,
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
  secret: SECRET,
  pages: {
    signOut: 'signout',
    signIn: '/signin',
  },
});
