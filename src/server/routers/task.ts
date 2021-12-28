import { createRouter } from '@/server/createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { jwtMiddleware, jwtUserId } from '../utils/jwt';

export const taskRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    const token = jwtMiddleware(ctx.req);

    if (!token) throw new TRPCError({ code: 'UNAUTHORIZED' });

    return next();
  })
  .query('byId', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      const task = await ctx.prisma.task.findUnique({
        where: { id: id },
      });

      if (!task) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No task with '${id}'`,
        });
      }
      return task;
    },
  })
  .query('all', {
    async resolve({ ctx }) {
      const userId = await jwtUserId(ctx.req);
      const task = await ctx.prisma.task.findMany({
        where: {
          userId: userId,
        },
      });

      return task;
    },
  })
  .mutation('create', {
    input: z.object({
      task: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { task } = input;
      const userId = await jwtUserId(ctx.req);

      if (!userId) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Could not create task`,
        });
      }

      const taskQ = await ctx.prisma.task.create({
        data: {
          task: task,
          userId: userId,
        },
      });
      if (!taskQ) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Could not create task`,
        });
      }

      return taskQ;
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      const task = await ctx.prisma.task.delete({
        where: {
          id: id,
        },
      });

      if (!task) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Could not delete task`,
        });
      }
      return task;
    },
  })
  .mutation('update', {
    input: z.object({
      task: z.string(),
      taskId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { task, taskId } = input;
      const userId = await jwtUserId(ctx.req);

      if (!userId) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Could not create task`,
        });
      }

      const taskQ = await ctx.prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          task: task,
        },
      });
      if (!taskQ) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Could not create task`,
        });
      }

      return taskQ;
    },
  });
