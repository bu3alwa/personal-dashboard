import { IUser } from './models/user';

declare global {
   namespace next {
      interface NextApiRequest {
            user?: IUser;
      }
   }
}