import { sturdyWinnerBootstrapServer } from './sturdy-winner-bootstrap-server';

describe('sturdyWinnerBootstrapServer', () => {
  it('should work', () => {
    expect(sturdyWinnerBootstrapServer()).toEqual(
      'sturdy-winner-bootstrap-server'
    );
  });
});
