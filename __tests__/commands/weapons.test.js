const { dict, utils, weapons } = require('../../commands/weapons.js');

it('getSearchTerm correctly capitalizes the keyword', () => {
  const searchTerm = utils.getSearchTerm('hello world');
  expect(searchTerm).toEqual('HELLO WORLD');
});

it('getSearchTerm correct replaces alternate searches with the correct keyword', () => {
  const searchTerm = utils.getSearchTerm('bolter');
  expect(searchTerm).toEqual('BOLT');
});

it('searchByKeyword correctly returns keyword matches', () => {
  const results = utils.searchByKeyword('primaris');
  expect(results.length).toEqual(3);
});

it('correctly outputs a weapon', () => {
  const result = weapons('bolt rifle');
  expect(result.split('\r')).toEqual(
    expect.arrayContaining([
      'Name: Bolt Rifle',
      '[Damage]: 10 [ED]: 1 [AP]: -1',
      '[Short]: 15 [Medium]: 30 [Long]: 45',
      '[Salvo]: 2',
      '[Traits]: Brutal, Rapid Fire [2]',
      '[Keywords]: BOLT, IMPERIUM, ADEPTUS ASTARTES, PRIMARIS'
    ])
  );
});