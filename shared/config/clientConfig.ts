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
};
