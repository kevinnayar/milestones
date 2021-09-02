import * as chalk from 'chalk';
import { Request } from 'express';

export function logReq(req: Request) {
  const messages = [
    `url=${req.url}`,
    `method=${req.method}`,
    `params=${JSON.stringify(req.params)}`,
    `query=${JSON.stringify(req.query)}`,
    `body=${JSON.stringify(req.body)}`,
  ];
  return messages.join(',');
}

export type Logger = {
  info: (..._messages: any) => void;
  warn: (..._messages: any) => void;
  error: (_e: Error | string) => void;
};

export default function logger(namespace: string): Logger {
  function info(...messages: any) {
    console.info(chalk.magenta(namespace), chalk.green('[INFO]'), ...messages);
  }

  function warn(...messages: any) {
    console.info(chalk.magenta(namespace), chalk.yellow('[WARN]'), ...messages);
  }

  function error(e: Error | string) {
    const err =
      e instanceof Error
        ? {
          name: e.name,
          message: e.message,
          stack: e.stack,
        }
        : e;

    console.error(chalk.magenta(namespace), chalk.red('[ERROR]'), err);
  }

  return {
    info,
    warn,
    error,
  };
}
