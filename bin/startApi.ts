/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */
import * as fs from 'fs';
import * as path from 'path';
import config from '../shared/config/serverConfig';
import logger from '../shared/helpers/logger';
import app from '../server/api/api';
import client from '../server/db/db';
import { ServiceHandlerOpts } from '../server/types';

type ServiceDefinition = {
  name: string;
  handler: (_opts: ServiceHandlerOpts) => void;
};

try {
  const apiServer = app.listen(config.api.port, () => {
    logger('api').info(`API Server: ${config.api.baseUrl}`);
  });

  apiServer.keepAliveTimeout = 0;
  apiServer.timeout = 60 * 60 * 1000;

  fs.readdir(path.join(__dirname, '../server/services'), (err, services) => {
    if (err) throw new Error('problem running api');

    for (const name of services) {
      const source = path.join(__dirname, `../server/services/${name}/api`);
      const { handler } = require(source);

      const service: ServiceDefinition = {
        name: `api:service:${name}`,
        handler,
      };

      const log = logger(service.name);

      const opts: ServiceHandlerOpts = {
        app,
        client,
        log,
      };

      service.handler(opts);
      log.info('✅ Ready');
    }
  });
} catch (e) {
  console.log('starting api failed');
  console.error(e);
  process.exit(1);
}
