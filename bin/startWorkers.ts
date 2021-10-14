import * as fs from 'fs';
import * as path from 'path';
import { fork } from 'child_process';
import Logger from '../common/helpers/Logger';
import { sleep } from '../common/utils/asyncUtils';
import { WorkerCmd } from '../server/serverTypes';

type Args = {
  service: string,
  worker: string,
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const argv: Args = require('yargs')
  .usage('Usage: yarn start:worker --service SERVICE --worker WORKER')
  .option('service', { type: 'string', default: '', description: 'Service Name' })
  .option('worker', { type: 'string', default: '', description: 'Worker Name' })
  .example('yarn start:worker --service teams --worker teamsTest').argv;

try {
  const { service, worker } = argv;
  const workerPath = path.join(__dirname, `../server/services/${service}/workers/${worker}.ts`);

  const valid = Boolean(fs.existsSync(workerPath) && !fs.lstatSync(workerPath).isDirectory());
  if (!valid) throw new Error(`service: "${service} - worker: "${worker}" not found`);

  const child = fork(workerPath);
  const namespace = `api:service:${service}:worker:${worker}`;
  const logger = new Logger(`${namespace}:parent`);

  logger.info('✅ Ready');

  child.send({
    type: 'START',
    data: {
      count: 0,
      namespace,
    },
  });

  child.on('message', async (message: WorkerCmd) => {
    if (message.type === 'UPDATE') {
      await sleep(1500);

      const count = message.data.count + 1;
      child.send({
        type: 'UPDATE',
        data: { count },
      });

      logger.info({ count });
    }
  });

  child.on('close', (code) => {
    logger.info('child process exited with code: ', code);
  });
} catch (e) {
  console.log('starting workers failed');
  console.error(e);
  process.exit(1);
}

