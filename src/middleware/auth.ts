import nextConnect from 'next-connect'
import passport from '../utils/passport'
import dbConnect from '../utils/mongodb';

const auth = nextConnect()
  .use(async (req, res, next) => {
    // Handle cors
    req.headers["Access-Control-Allow-Origin"] = "*";
    req.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, PUT, PATCH, DELETE";
    req.headers["Access-Control-Allow-Headers"] = "x-access-token, Origin, X-Requested-With, Content-Type, Accept";

    // connect to database
    await dbConnect();
    next()
  })
  .use(passport.initialize())
  .use(passport.authenticate('local', {session: false}))

export default auth