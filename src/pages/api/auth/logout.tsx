
import { NextApiRequest, NextApiResponse } from 'next';
import nc from "next-connect";
import jwtVerify from '../../../src/middleware/jwt';


/**
 * Logout handler function 
 * Logs the user out and returns 204
 */
const handler = nc<NextApiRequest, NextApiResponse>();
handler
.use(jwtVerify)
  .post((req, res) => {
    // TODO: implement token invalidation
    res.status(204).end();
});

export default handler;