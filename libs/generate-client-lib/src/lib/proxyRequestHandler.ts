import { IncomingHttpHeaders } from 'http'
import { baseUrlFromHeaders } from './utils'

export interface CreateProxyRequestHandler<
  Handler extends (...args: any) => any,
> {
  (
    headers: IncomingHttpHeaders,
    opts?: Parameters<Handler>[0],
  ): ReturnType<Handler>
  (
    headers: IncomingHttpHeaders,
    body: Parameters<Handler>[0],
    opts?: Parameters<Handler>[1],
  ): ReturnType<Handler>
}

export const createProxyRequestHandler = <
  Handler extends (...args: any) => any,
>(
  handler: Handler,
): CreateProxyRequestHandler<Handler> => {
  return (
    headers: IncomingHttpHeaders,
    body?: Parameters<Handler>[0],
    opts?: Parameters<Handler>[1],
  ): ReturnType<Handler> => {
    const baseURL = baseUrlFromHeaders(headers)

    if (handler.length === 1) {
      // no body is expected by handler, so only opts
      body ||= {}
      body.baseURL = baseURL
      body.headers = {
        ...headers,
        ...body.headers,
      }
    } else {
      opts ||= {}
      opts.baseURL = baseURL
      opts.headers = {
        ...headers,
        ...opts.headers,
      }
    }

    return handler(body, opts)
  }
}
