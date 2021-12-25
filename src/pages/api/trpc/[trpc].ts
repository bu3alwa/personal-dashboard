import * as trpcNext from '@trpc/server/adapters/next';
import { inferProcedureOutput } from '@trpc/server';
import { AppRouter, appRouter } from '@/server/routers/_app';
import { createContext } from '@/server/context';

// tRPC's HTTP response handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error('Something went wrong', error);
    }
  },
  batching: {
    enabled: true,
  },
});

export type inferQueryResponse<TRouteKey extends keyof AppRouter['_def']['queries']> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
>;
