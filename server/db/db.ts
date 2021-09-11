import * as pgPromise from 'pg-promise';
import { IMain } from 'pg-promise';
import config from '../serverConfig';
import { DBClient } from '../serverTypes';

const pgp: IMain = pgPromise();
const client: DBClient = pgp(config.db);

export default client;

