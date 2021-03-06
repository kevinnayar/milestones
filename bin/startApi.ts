import * as fs from 'fs';
import * as path from 'path';
import config from '../server/serverConfig';
import Logger from '../common/helpers/Logger';
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

    // @notes[Services] Each API service exports a typed handler function `handler: (opts: ServiceHandlerOpts) => void` from its `api.ts` file
    // @notes[Services] It expects `opts: { app: Application, client: DBClient, logger: Logger }`

    for (const name of services) {
      const filePath = path.join(__dirname, `../server/services/${name}/api.ts`);

      if (fs.existsSync(filePath)) {
        /* eslint-disable @typescript-eslint/no-var-requires, import/no-dynamic-require */
        const { handler } = require(filePath);

        // @notes[Services] Then each service is started via the `startApi` script
        // @notes[Services] A `ServiceDefinition` is defined with the service `name` (for logging) and the `handler` function is executed

        const service: ServiceDefinition = {
          name: `api:service:${name}`,
          handler,
        };

        const serviceOpts: ServiceHandlerOpts = {
          app,
          client,
          logger: new Logger(service.name),
        };

        service.handler(serviceOpts);
        serviceOpts.logger.info('✅ Ready');
      }
    }
  });
} catch (e) {
  console.log('starting api failed');
  console.error(e);
  process.exit(1);
}
