import * as pgPromise from 'pg-promise';
import { IMain } from 'pg-promise';
import config from '../../shared/config/serverConfig';
import { DBClient } from '../types';

const pgp: IMain = pgPromise();
const client: DBClient = pgp(config.db);

export default client;

