import { getStackTrace } from './getStackTrace';

describe('getStackTrace', () => {
  it('should generate a stack trace from a file', () => {
    const stackTrace = getStackTrace();

    // stack trace starts with error
    expect(stackTrace[0].toString()).toEqual('Error: ');
    // caller is in the getStackTrace file
    expect(stackTrace[1].toString()).toContain(__filename.replace('.spec', ''));
    // this file which calls that
    expect(stackTrace[2]).toContain(__filename);
  });
});
