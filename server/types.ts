import { Application } from 'express';
import { IDatabase } from 'pg-promise';
import Logger from '../shared/helpers/Logger';

export type DBClient = IDatabase<Record<string, unknown>, any>;

export type ServiceHandlerOpts = {
  app: Application;
  client: DBClient;
  logger: Logger;
};
