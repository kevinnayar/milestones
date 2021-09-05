import config from './_config';

export default {
  api: config.api,
  app: config.app,
  auth: {
    domain: config.auth.domain,
    clientId: config.auth.clientId,
    audience: config.auth.audience,
  },
};
