// utils/trpc.ts
import type { AppRouter } from '@/server/routers/_app';
import { createReactQueryHooks } from '@trpc/react';
import type { inferProcedureOutput } from '@trpc/server';

export const trpc = createReactQueryHooks<AppRouter>();

export type inferQueryResponse<TRouteKey extends keyof AppRouter['_def']['queries']> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
>;
