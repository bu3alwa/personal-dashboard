import { createRouter } from '@/server/createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';

export const userRouter = createRouter()
  // TODO: Protect this endpoint and only return same user
  // from provided token
  .query('get', {
    input: z.object({
      username: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { username } = input;
      const user = await ctx.prisma.user.findUnique({
        where: { name: username },
      });
      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user with username '${username}'`,
        });
      }
      return { username: user.name };
    },
  })
  .mutation('login', {
    input: z.object({
      username: z.string(),
      password: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { username, password } = input;
      const user = await ctx.prisma.user.findUnique({
        where: { name: username },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No username or password`,
        });
      }

      const hashcompare = await bcrypt.compare(password, user.password);
      if (!hashcompare) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No username or password`,
        });
      }
      return {
        name: user.name,
        id: user.id,
      };
    },
  })
  .mutation('create', {
    input: z.object({
      username: z.string(),
      password: z.string(),
    }),
    async resolve({ ctx, input }) {
      const any = await ctx.prisma.user.findMany({
        select: {
          id: true,
        },
      });

      // only one user in our database is allowed
      if (any.length > 0) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'User already exist',
        });
      }
      const { username, password } = input;
      const passwordHash = await bcrypt.hashSync(password, 10);
      const user = await ctx.prisma.user.create({
        data: {
          name: username,
          password: passwordHash,
        },
      });
      return { username: user.name };
    },
  });
