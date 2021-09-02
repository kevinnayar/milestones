import { v4 } from 'uuid';

export function formatError(error: string | Error): string {
  return typeof error === 'object' && 'message' in error ? error.message.toString() : error;
}

export function createGuid(type?: string): string {
  return type ? `${type}_${v4()}` : v4();
}


