export function getStackTrace(): string[] {
  try {
    throw new Error();
  } catch (err) {
    const error = err as unknown as Error;
    return error.stack?.split('\n') || [];
  }
}
