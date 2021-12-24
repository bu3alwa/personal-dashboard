import pino from 'pino';

/**
 * Helper function for logging. Changes settings based 
 * production and dev.
 */
const logger = pino(
  { level: 'error' },
);

export default logger;