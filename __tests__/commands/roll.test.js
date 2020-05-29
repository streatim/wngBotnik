const roll = require('../../commands/roll.js');

it('successfully rolls a d3', () => {
  const result = roll('d3');
  expect(result).toContain('Roll [d3]');
});