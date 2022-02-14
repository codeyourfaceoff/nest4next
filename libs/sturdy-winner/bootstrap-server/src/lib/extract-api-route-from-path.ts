import { getStackTrace } from './getStackTrace';

export function extractApiRouteFromPath(): string {
  const stack = getStackTrace();

  const trace = stack.find((trace) => trace.includes('pages/api'));
  if (!trace) return '';
  const apiRoute = trace.split('pages/')[1].split(/\.(t|j)s.*/)[0];

  if (pathIsDynamic(apiRoute)) {
    return removeDynamicPath(apiRoute);
  }
  return apiRoute;

  function pathIsDynamic(route: string) {
    return route.includes('[');
  }

  function removeDynamicPath(route: string) {
    return route.replace(/\[.*\]/, '');
  }
}
