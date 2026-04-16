// lib/logger.ts
import pino from 'pino';
import path from 'path';

// Define the base directory for logs
const logBaseDir = path.resolve(process.env.LOG_PATH || 'logs', 'logs');

// Define the transport targets for info and error logs
const transports = pino.transport({
  targets: [
    {
      target: 'pino-roll',
      level: 'info',
      options: {
        file: path.join(logBaseDir, 'info/info.log'),
        frequency: 'daily', // Rotate daily
        mkdir: true, // Create directory if it doesn't exist
        limit: { count: 15 }, // Keep up to 15 rotated files + 1 active file
        dateFormat: 'dd-MM-yyyy'
      },
    },
    {
      target: 'pino-roll',
      level: 'error',
      options: {
        file: path.join(logBaseDir, 'error/error.log'),
        frequency: 'daily',
        mkdir: true,
        limit: { count: 15 },
        dateFormat: 'dd-MM-yyyy'
      },
    },
    // Optional: add a target for development pretty printing if desired
    ...(process.env.NODE_ENV === 'development'
      ? [{
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        }]
      : []),
  ],
});

// Create the main logger instance
export const logger = pino({
  // Configure timestamp format (optional, ISO is standard)
  timestamp: pino.stdTimeFunctions.isoTime,
  // Set the minimum logging level (can be overridden per target)
  level: process.env.PINO_LOG_LEVEL || 'info',
}, transports);
