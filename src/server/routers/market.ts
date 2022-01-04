import { createRouter } from '@/server/createRouter';
import { TRPCError } from '@trpc/server';
import { jwtMiddleware } from '../utils/jwt';
import axios from 'axios';
import { RAPID_API_KEY } from '@/utils/secrets';

/**
 * CRUD Api for tasks
 */
export const marketRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    const token = jwtMiddleware(ctx.req);

    if (!token) throw new TRPCError({ code: 'UNAUTHORIZED' });

    return next();
  })
  .query('get-movers', {
    async resolve({}) {
      const options = {
        url: 'https://yh-finance.p.rapidapi.com/market/v2/get-movers',
        params: { region: 'US', lang: 'en-US', count: '6', start: '0' },
        headers: {
          'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
          'x-rapidapi-key': RAPID_API_KEY,
        },
      };

      try {
        const res = await axios(options);
        const data = res.data;
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });
