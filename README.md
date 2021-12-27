This is a work in progress of a personal dashboard where it fits daily needs and wants in one location.

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
- [] Task list feature
- [] News reader rss feature
- [] Finacial top gainers and loser feature
- [] Dashboard page
