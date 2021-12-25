import { NextApiRequest, NextApiResponse } from 'next';
import passport from '../../../src/utils/passport';
import nc from "next-connect";
import auth from '../../../src/middleware/auth';
import { JWT_SECRET } from '../../../src/utils/secrets';
import jwt from 'jsonwebtoken';

/**
 * Middleware handler using next-connect
 * Authentication of user on POST request.
 */
const handler = nc<NextApiRequest, NextApiResponse>();
handler
.use(auth)
.post(
  passport.authenticate("local"), (req, res) => {
    const user = req.body.username
    const token = jwt.sign(
      { user: user },
      JWT_SECRET,
      {
        expiresIn: "2h",
      });
    res.status(201).json({ username: user, token: token })
  }
);

export default handler;