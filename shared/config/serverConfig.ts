import config from './_config';

export default {
  api: config.api,
  app: config.app,
  db: config.db,
  auth: {
    audience: config.auth.audience,
    issuer: config.auth.issuer,
  },
};
