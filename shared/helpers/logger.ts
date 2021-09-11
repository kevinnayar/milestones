import * as chalk from 'chalk';
import { Request } from 'express';

function redactPII<T>(inputData: T): T {
  const redactedKeys = ['roleId', 'role_id', 'password', 'firstName', 'first_name', 'lastName', 'last_name'];
  const redactedData = {};

  for (const key of redactedKeys) {
    if (key in inputData) redactedData[key] = '<REDACTED>';
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
      params: redactPII(req.params),
      query: redactPII(req.query),
      body: redactPII(req.body),
    };

    console.log(chalk.magenta(this.namespace), chalk.cyan('[REQUEST]'), messages);
  }
}
