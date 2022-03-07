import { AxiosRequestConfig } from 'axios';
import { createProxyRequestHandler } from './proxyRequestHandler';

describe('createProxyRequestHandler', () => {
  it('should forward requests to the expected domain', () => {
    const mockAxiosRequest = (opts?: AxiosRequestConfig) => opts?.baseURL;

    const host = 'localhost:4000';
    const httpOrigin = 'http://' + host;
    const httpsOrigin = 'https://' + host;

    expect(
      createProxyRequestHandler(mockAxiosRequest)({
        origin: httpOrigin,
        host,
      })
    ).toEqual(httpOrigin);

    expect(
      createProxyRequestHandler(mockAxiosRequest)({
        origin: httpsOrigin,
        host,
      })
    ).toEqual(httpsOrigin);

    expect(
      createProxyRequestHandler(mockAxiosRequest)({
        ['x-forwarded-proto']: 'ppp',
        origin: httpsOrigin,
        host,
      })
    ).toEqual(`ppp://${host}`);
  });

  it('should forward on the headers', () => {
    const mock = (opts?: AxiosRequestConfig) => {
      return opts?.headers;
    };

    expect(
      createProxyRequestHandler(mock)({
        'some-random-key': 'value-here',
      })
    ).toEqual({
      'some-random-key': 'value-here',
    });
  });

  it.todo('should handle request with and without a body');
});
