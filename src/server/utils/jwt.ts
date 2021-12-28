import { getToken } from 'next-auth/jwt';
import { JWT_SECRET } from '@/utils/secrets';
import { NextApiRequest } from 'next';

export async function jwtMiddleware(req: NextApiRequest) {
  const token = await getToken({ req, secret: JWT_SECRET });
  if (token) return true;
  return false;
}

export async function jwtUserId(req: NextApiRequest) {
  const token = await getToken({ req, secret: JWT_SECRET });
  return token?.userId;
}
