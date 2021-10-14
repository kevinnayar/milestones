import { Application } from 'express';
import { IDatabase } from 'pg-promise';
import Logger from '../common/helpers/Logger';

export type DBClient = IDatabase<Record<string, unknown>, any>;

export type ServiceHandlerOpts = {
  app: Application;
  client: DBClient;
  logger: Logger;
};

type WorkerCmdStart = {
  type: 'START';
  data: {
    count: number;
    namespace: string;
  }
};

type WorkerCmdUpdate = {
  type: 'UPDATE';
  data: {
    count: number;
  }
};

export type WorkerCmd = WorkerCmdStart | WorkerCmdUpdate;




