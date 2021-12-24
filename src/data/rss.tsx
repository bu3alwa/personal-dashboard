import Parser from 'rss-parser';

type CustomFeed = {url: string};
type CustomItem = {item: number};

const parser: Parser<CustomFeed, CustomItem> = new Parser({
  customFields: {
    feed: ['url'],
    item: ['item']
  }
});

//'http://feeds.marketwatch.com/marketwatch/topstories/',
//'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'
/**
 * Parses a given feed and outputs in json
 * @returns Parsed feed in json
 */
const feeds = async () => {
  const feed = await parser.parseURL('https://www.reddit.com/.rss');
  console.log(feed.title);
  feed.items.forEach((item: any) => {
    console.log(item.title + ':' + item.link)
  })
  return feed;
}

export default feeds;