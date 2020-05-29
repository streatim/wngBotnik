const common = require('../common.js');

it('returns basic information with badCall', () => {
  const badCall = common.badCall('test');
  
  // Should include the name of the command that caused the badCall
  expect(badCall).toContain('test');
  // Should contain a prompt to use help
  expect(badCall).toContain('!wghelp');
})

it('returns random rolls within the correct range with dice()', () => {
  expect(common.dice(3)).toBeLessThanOrEqual(3);
  expect(common.dice(3)).toBeLessThanOrEqual(3);
  expect(common.dice(3)).toBeLessThanOrEqual(3);

  expect(common.dice(6)).toBeLessThanOrEqual(6);
  expect(common.dice(6)).toBeLessThanOrEqual(6);
  expect(common.dice(6)).toBeLessThanOrEqual(6);
})