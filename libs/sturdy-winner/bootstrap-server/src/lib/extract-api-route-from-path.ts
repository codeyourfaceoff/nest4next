import { getStackTrace } from './getStackTrace';

export function extractApiRouteFromPath(): string {
  const stack = getStackTrace();

  const trace = stack.find((trace) => trace.includes('pages/api'));
  if (!trace) return '';
  const apiRoute = trace.split('pages/')[1].split(/\.(t|j)s.*/)[0];

  return pipeValue(apiRoute).through(
    trimTrailingIndex,
    removeDynamicPath,
    trimTrailingSlash
  );

  function removeDynamicPath(route: string) {
    return route.replace(/\[.*\]/, '');
  }

  function trimTrailingIndex(route: string) {
    return route.replace(/index$/, '');
  }

  function trimTrailingSlash(route: string) {
    return route.replace(/\/$/gm, '');
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pipe(...functions: any[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (x: any) => functions.reduce((acc, fn) => fn(acc), x);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pipeValue(value: any) {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    through: (...fns: any[]) => pipe(...fns)(value),
  };
}
