import Logger from '../../../../common/helpers/Logger';
import { sleep } from '../../../../common/utils/asyncUtils';
import { WorkerCmd } from '../../../serverTypes';

let logger: Logger;

process.on('message', async (message: WorkerCmd) => {
  switch (message.type) {
    case 'START': {
      await sleep(1500);

      logger = new Logger(`${message.data.namespace}:child`);

      const count = message.data.count + 1;
      process.send({
        type: 'UPDATE',
        data: { count },
      });

      logger.info({ count });
      break;
    }
    case 'UPDATE': {
      await sleep(1500);

      const count = message.data.count + 1;
      process.send({
        type: 'UPDATE',
        data: { count },
      });

      if (logger) logger.info({ count });
      break;
    }
    default: {
      console.error(`Unrecognized worker command: "${message}"`);
    }
  }
});
