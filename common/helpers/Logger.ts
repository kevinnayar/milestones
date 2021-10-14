import * as chalk from 'chalk';
import { DateTime } from 'luxon';
import { Request } from 'express';

function redactPII<T extends Record<string, any>>(inputData: T): T {
  const redactedKeys: Record<string, true> = {
    roleId: true,
    role_id: true,
    password: true,
    fullName: true,
    full_name: true,
  };
  const redactedData: Record<string, any> = {};

  for (const [key, value] of Object.entries(inputData)) {
    if (redactedKeys[key]) {
      redactedData[key] = '**REDACTED**';
    }
    if (typeof value === 'object' && value !== null) {
      redactedData[key] = redactPII(value);
    }
  }

  return {
    ...inputData,
    ...redactedData,
  };
}


export default class Logger {
  namespace: string;

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  info(...messages: any) {
    console.log(chalk.magenta(this.namespace), chalk.green('[INFO]'), ...messages);
  }

  warn(...messages: any) {
    console.info(chalk.magenta(this.namespace), chalk.yellow('[WARN]'), ...messages);
  }

  error(e: Error | string) {
    const err = e instanceof Error ? { name: e.name, message: e.message, stack: e.stack } : e;
    console.error(chalk.magenta(this.namespace), chalk.red('[ERROR]'), err);
  }

  logRequest(req: Request) {
    const messages = {
      url: req.url,
      method: req.method,
      body: redactPII(req.body),
      params: redactPII(req.params),
      query: redactPII(req.query),
      utcTimestamp: DateTime.now().toMillis(),
    };

    console.log(chalk.magenta(this.namespace), chalk.cyan('[REQUEST]'), messages);
  }
}
