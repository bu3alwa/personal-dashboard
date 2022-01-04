import Parser from 'rss-parser';
import { createRouter } from '../createRouter';

/**
 * Api handler that gets all the required
 * feeds for the news page.
 */
export const feedRouter = createRouter().query('get', {
  async resolve() {
    const parser: Parser = new Parser({
      customFields: {
        item: [['media:content', 'media']],
      },
    });
    const feed = await parser.parseURL('https://finance.yahoo.com/news/rssindex');
    return feed;
  },
});
