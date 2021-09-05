import * as dotenv from 'dotenv';
import { isStringOrThrow, isNumberOrThrow } from '../utils/typeUtils';

dotenv.config();

// Config should not be imported directly -> use `clientConfig` instead
// Config should not be imported directly -> use `serverConfig` instead

const msg = (id: string) => `No ${id} defined`;

export default {
  app: {
    protocol: isStringOrThrow(process.env.APP_PROTOCOL, msg('app.protocol')),
    host: isStringOrThrow(process.env.APP_HOST, msg('app.host')),
    port: isStringOrThrow(process.env.APP_PORT, msg('app.port')),
    baseUrl: `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}`,
  },
  api: {
    protocol: isStringOrThrow(process.env.API_PROTOCOL, msg('api.protocol')),
    host: isStringOrThrow(process.env.API_HOST, msg('api.host')),
    port: isStringOrThrow(process.env.API_PORT, msg('api.port')),
    baseUrl: `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}`,
  },
  db: {
    database: isStringOrThrow(process.env.PGDATABASE,  msg('db.database')),
    host: isStringOrThrow(process.env.PGHOST,  msg('db.host')),
    port: isNumberOrThrow(parseInt(process.env.PGPORT || '5432', 10), msg('db.port')),
    user: isStringOrThrow(process.env.PGUSER,  msg('db.user')),
    baseUrl: `${process.env.PGHOST}://${process.env.PGDATABASE}:${process.env.PGPORT}`,
  },
  auth: {
    domain: isStringOrThrow(process.env.AUTH0_DOMAIN, msg('auth.domain')),
    clientId: isStringOrThrow(process.env.AUTH0_CLIENT_ID, msg('auth.clientId')),
    audience: isStringOrThrow(process.env.AUTH0_AUDIENCE, msg('auth.audience')),
    issuer: isStringOrThrow(process.env.AUTH0_ISSUER, msg('auth.issuer')),
  },
};



