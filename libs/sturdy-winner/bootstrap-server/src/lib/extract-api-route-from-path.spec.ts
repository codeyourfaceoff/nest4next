const getStackTraceMock = jest.fn();
jest.mock('./getStackTrace', () => ({
  getStackTrace: getStackTraceMock,
}));

import { extractApiRouteFromPath } from './extract-api-route-from-path';
describe('extractApiRouteFromPath', () => {
  it('should return the path of an api route in a nextjs app', () => {
    getStackTraceMock.mockReturnValueOnce([
      'testing1234',
      'some-nest-dir/pages/api/mocked-test.tsx',
    ]);

    const route = extractApiRouteFromPath();
    expect(route).toBe('api/mocked-test');
  });

  it('should account for nextjs route params', () => {
    getStackTraceMock.mockReturnValueOnce([
      'pages/api/mocked-test-with-params/[...param].ts',
    ]);

    const route = extractApiRouteFromPath();
    expect(route).toBe('api/mocked-test-with-params');
  });

  it('should ignore the index file if trailing', () => {
    getStackTraceMock.mockReturnValueOnce(['pages/api/index.ts']);

    const route = extractApiRouteFromPath();
    expect(route).toBe('api');

    getStackTraceMock.mockReturnValueOnce(['pages/api/index/nested.ts']);

    const _route = extractApiRouteFromPath();
    expect(_route).toBe('api/index/nested');
  });
});
