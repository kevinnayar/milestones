import * as dotenv from 'dotenv';
import { isStringOrThrow } from '../shared/utils/typeUtils';

dotenv.config();

const msg = (key: string) => `No "${key}" defined`;

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
};
