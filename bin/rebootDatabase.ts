import * as fs from 'fs-extra';
import * as path from 'path';
import db from '../server/db/db';
import { DBClient } from '../server/types';
import { formatError } from '../shared/utils/baseUtils';

async function execSqlStatementsFromFile(client: DBClient, filePath: string) {
  const fullPath = path.join(__dirname, filePath);
  const sql = await fs.readFile(fullPath, { encoding: 'UTF-8' });
  const statements: string[] = sql.split(/;\s*$/m);

  for (const statement of statements) {
    if (statement.length > 3) {
      await client.query(statement);
    }
  }
}

async function dbDropTablesAll(client: DBClient): Promise<void> {
  try {
    await execSqlStatementsFromFile(client, '../server/db/dbDropAll.pgsql');
  } catch (err) {
    console.error(`Failed: dbDropTablesAll: ${formatError(err)}`);
    throw err;
  }
}

async function dbCreateTablesAll(client: DBClient): Promise<void> {
  try {
    await execSqlStatementsFromFile(client, '../server/db/dbCreateAll.pgsql');
  } catch (err) {
    console.error(`Failed: dbCreateTablesAll: ${formatError(err)}`);
    throw err;
  }
}

(async () => {
  try {
    await dbDropTablesAll(db);
    await dbCreateTablesAll(db);
    process.exit(0);
  } catch (e) {
    console.log('reboot database failed');
    console.error(e);
    process.exit(1);
  }
})();

