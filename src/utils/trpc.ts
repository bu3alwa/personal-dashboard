// utils/trpc.ts
import type { AppRouter } from '@/server/routers/_app';
import { createReactQueryHooks } from '@trpc/react';
import type { inferProcedureOutput } from '@trpc/server';

/**
 * A set of strongly-typed React hooks from your `AppRouter` type signature with `createReactQueryHooks`.
 * @link https://trpc.io/docs/react#3-create-trpc-hooks
 */
export const trpc = createReactQueryHooks<AppRouter>();

// export const transformer = superjson;
/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryResponse<TRouteKey extends keyof AppRouter['_def']['queries']> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
>;
