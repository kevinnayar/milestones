import * as dotenv from 'dotenv';
import { isStringOrThrow, isNumberOrThrow } from '../utils/typeUtils';

dotenv.config();

// Config should not be imported directly -> use `clientConfig` instead
// Config should not be imported directly -> use `serverConfig` instead

export default {
  app: {
    protocol: isStringOrThrow(process.env.APP_PROTOCOL, 'No APP_PROTOCOL defined'),
    host: isStringOrThrow(process.env.APP_HOST, 'No APP_HOST defined'),
    port: isStringOrThrow(process.env.APP_PORT, 'No APP_PORT defined'),
    baseUrl: `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}/`,
  },
  api: {
    protocol: isStringOrThrow(process.env.API_PROTOCOL, 'No API_PROTOCOL defined'),
    host: isStringOrThrow(process.env.API_HOST, 'No API_HOST defined'),
    port: isStringOrThrow(process.env.API_PORT, 'No API_PORT defined'),
    baseUrl: `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/`,
  },
  db: {
    database: isStringOrThrow(process.env.PGDATABASE, 'No DATABASE config env variable'),
    host: isStringOrThrow(process.env.PGHOST, 'No DATABASE HOST config env variable'),
    port: isNumberOrThrow(parseInt(process.env.PGPORT || '5432', 10), 'No DATABASE PORT config env variable'),
    user: isStringOrThrow(process.env.PGUSER, 'No DATABASE USER config env variable'),
    baseUrl: `${process.env.PGHOST}://${process.env.PGDATABASE}:${process.env.PGPORT}/`,
  },
};



