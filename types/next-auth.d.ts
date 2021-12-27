import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: String;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: String;
  }
}
