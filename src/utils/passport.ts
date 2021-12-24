import { JWT_SECRET } from './secrets';
import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { User, IUser } from '../../models/user';
import { NativeError } from 'mongoose';


/**
 * Serialize the username into session
 */
passport.serializeUser((user, done) => {
    done(null, user);
});

/**
 * Deserialize the username back into the user object
 */
passport.deserializeUser((id, done) => {
    const user = User.findById(id);
    done(null, user)
});

/**
 * Sign in strategy using user and password with passport
 */
passport.use(
  'local',
  new LocalStrategy(function (username, password, done) {
  User.findOne({ username: username }, function (err: NativeError, user: IUser) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'User or Password Incorrect' }) }
    user.comparePassword(password, (err: Error, isMatch: boolean) => {
      if(err) { return done(err); }
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { message: "Invalid user or password." })
    });
  });
}));

/**
 * JWT verfication strategy
 */
passport.use(
  'jwt', 
  new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  }, (jwtPayload, done) => {
    return User.findOne({ jwtPayload }).then(user => {
      return done(null, user);
    }).catch(err => done(err));
  }))

export default passport