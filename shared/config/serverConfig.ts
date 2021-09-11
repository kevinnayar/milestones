import config from './_config';

export default {
  api: {
    protocol: config.api.protocol,
    host: config.api.host,
    port: config.api.port,
    baseUrl: config.api.baseUrl,
  },
  app: {
    protocol: config.app.protocol,
    host: config.app.host,
    port: config.app.port,
    baseUrl: config.app.baseUrl,
  },
  db: {
    database: config.db.database,
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
  },
  redis: {
    host: config.redis.host,
    port: config.redis.port,
  },
  auth: {
    jwtSecret: config.auth.jwtSecret,
    audience: config.auth.audience,
    issuer: config.auth.issuer,
  },
};
