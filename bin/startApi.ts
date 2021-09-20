import * as fs from 'fs';
import * as path from 'path';
import config from '../server/serverConfig';
import Logger from '../shared/helpers/Logger';
import app from '../server/api/api';
import client from '../server/db/db';
import { ServiceHandlerOpts } from '../server/serverTypes';

type ServiceDefinition = {
  name: string;
  handler: (_opts: ServiceHandlerOpts) => void;
};

try {
  const apiServer = app.listen(config.api.port, () => {
    const logger = new Logger('api');
    logger.info(`API Server: ${config.api.baseUrl}`);
  });

  apiServer.keepAliveTimeout = 0;
  apiServer.timeout = 60 * 60 * 1000;

  fs.readdir(path.join(__dirname, '../server/services'), (err, services) => {
    if (err) throw new Error('problem running api');

    // @notes[services] Each service exports a typed (`ServiceDefinition`) service handler from its `api.ts`
    for (const name of services) {
      const file = `../server/services/${name}/api.ts`;
      const validFile = fs.existsSync(path.join(__dirname, file))
        ? path.join(__dirname, file)
        : null;

      if (validFile) {
        /* eslint-disable @typescript-eslint/no-var-requires, import/no-dynamic-require */
        const { handler } = require(validFile);

        const service: ServiceDefinition = {
          name: `api:service:${name}`,
          handler,
        };

        // @notes[services] They are passed the Express app, the DB client, and a namespaced logging utility

        const opts: ServiceHandlerOpts = {
          app,
          client,
          logger: new Logger(service.name),
        };

        service.handler(opts);

        opts.logger.info('✅ Ready');
      }
    }
  });
} catch (e) {
  console.log('starting api failed');
  console.error(e);
  process.exit(1);
}
