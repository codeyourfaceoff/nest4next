import { IncomingHttpHeaders } from 'http';

export function baseUrlFromHeaders(headers: IncomingHttpHeaders): string {
  const proto = headers['x-forwarded-proto'] || headers.origin?.split('://')[0];
  const baseUrl = `${proto}://${headers.host}`;
  return baseUrl;
}
