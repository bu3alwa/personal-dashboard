import logger from './logger';

/**
 * Centerlized location for all secrets for the app
 * take the env variable and make sure it exists. If
 * the variable does not exist then exit the application.
 */
export const MONGODB_URI: string = process.env.DB_URI ?? '';
export const JWT_SECRET: string = process.env.JWT_SECRET ?? '';
export const SECRET: string = process.env.SECRET ?? '';
export const RAPID_API_KEY: string = process.env.RAPID_API_KEY ?? '';

if (RAPID_API_KEY == '') {
  logger.error('Please define the RAPID_API_KEY environment variable inside .env.local');
  process.exit(1);
}

if (MONGODB_URI == '') {
  logger.error('Please define the DB_URI environment variable inside .env.local');
  process.exit(1);
}

if (JWT_SECRET == '') {
  logger.error('Please Define JWT_SECRET in the environment variable');
  process.exit(1);
}

if (SECRET == '') {
  logger.error('Please Define SECRET in the environment variable');
  process.exit(1);
}
