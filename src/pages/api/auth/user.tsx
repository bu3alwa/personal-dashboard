import { NextApiResponse } from 'next';
import nc from 'next-connect';
import jwtVerify from '../../../middleware/jwt';

/**
 * Gets user that is logged in
 */
// figure out why global declartion of nextapirequest is not working
const handler = nc<any, NextApiResponse>();
handler.use(jwtVerify).get((req, res) => {
  const user = req.user;
  res.status(201).json({ username: user.username });
});

export default handler;
