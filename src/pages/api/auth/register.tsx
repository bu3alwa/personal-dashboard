import { NextApiResponse, NextApiRequest } from 'next';
import { User } from '../../../models';
import dbConnect from '../../../utils/mongodb';

/**
 * Register api function to register user for the application
 * with POST method.
 * @param req NextApiRequest
 * @param res NextApit Reponse
 * @returns  return status code 201 on success and 500 on error
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Deconstruct body
    const { username, password } = req.body;

    await dbConnect();
    // Check if a user exists
    const filter = {};
    const query = await User.exists(filter);
    if (query) {
      res.status(200).json({ message: 'Cannot create user' });
    }

    try {
      // password will autohash
      const user = new User({
        username: username,
        password: password,
      });

      await user.save();
      return res.status(201).json({});
    } catch (error) {
      // Change once logging is implemented
      console.log(error);
      return res.status(500).json({});
    }
  } else {
    // 405 Method Not Allowed
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
