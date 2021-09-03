import * as chalk from 'chalk';
import { Request } from 'express';

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
    const msgs = [
      `url=${req.url}`,
      `method=${req.method}`,
      `params=${JSON.stringify(req.params)}`,
      `query=${JSON.stringify(req.query)}`,
      `body=${JSON.stringify(req.body)}`,
    ].join(',');

    this.info(msgs);
  }
}
