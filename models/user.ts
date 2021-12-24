import mongoose, { Document, Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import passportLocalMongoose from "passport-local-mongoose";

/**
 * Auth Token interface containing token and its kind
 */
export interface AuthToken {
  accessToken: string;
  kind: string;
}

/**
 * User Interface for User Model
 */
export interface IUser extends Document {
  username: string;
  password: string;
  tokens: AuthToken[];

  comparePassword: comparePasswordFunction;
}

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => void) => void;

/**
 * Mongoose UserSchema
 */
const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: Array
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next) {
  const passwordhash = await bcrypt.hashSync(this.password, 10);
  this.password = passwordhash;
  next();
})


UserSchema.methods.comparePassword = async function (candidate: string, cb: (err: Error, isMatch: boolean) => void) {
  await bcrypt.compare(candidate, this.password, function (err, isMatch) {
    cb(err, isMatch);
  });
}


// plugin for passport-local-mongoose
UserSchema.plugin(passportLocalMongoose);

/**
 * Export User Model
 */
export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);