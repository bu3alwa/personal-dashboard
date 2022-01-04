This is a personal dashboard that has daily
needs such as: RSS Feeds, Market Data,

## Getting Started

Start with docker-compose for intializing the database.

```
docker-compose up -d
```

then run the development server with the .env file
set to your config

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Todo

Todo:

- [x] Authentication with passport jwt
- [x] Mongoose implementation
- [x] Migrate authentication and ORM to prisma and nextauth
- [x] Task list feature
- [x] News reader rss feature
- [x] Finacial top gainers and loser feature
- [] Dashboard page
- [] unit testing

Future Work:

- Add custom rss links given by user
- Switch to tailwind css
- Add twitter feed
