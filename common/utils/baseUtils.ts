import { v4 } from 'uuid';

export function formatError(error: string | Error): string {
  return typeof error === 'object' && 'message' in error ? error.message.toString() : error;
}

export function createGuid(type?: string): string {
  return type ? `${type}_${v4()}` : v4();
}

export function slugify(text: string): string {
  return text.toLowerCase()
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/[^\w-]+/g, '') // remove all non-word chars
    .replace(/--+/g, '-') // replace multiple - with single -
    .replace(/^-+/, '') // trim - from start of text
    .replace(/-+$/, ''); // trim - from end of text
}




