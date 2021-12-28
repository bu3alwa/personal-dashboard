import feeds from '../../../data/rss';
import type { NextApiResponse } from 'next';

export default async (res: NextApiResponse) => {
  res.status(200).json(feeds);
};
