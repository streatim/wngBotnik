const common = require('./../common.js');

const utils = {
  getSearchTerm: (keyword) => {
    let searchTerm = keyword.toUpperCase();
    // Common alternates
    const alternates = {
      'BOLTER': 'BOLT'
    };
    if (alternates[searchTerm]) {
      // Set the alternative keyword to the one used in the book
      searchTerm = alternates[searchTerm];
    }

    return searchTerm
  },
  print: (arr) => {
    // Always assumes array of results
    let output = []
    arr.forEach(weapon => {
      output = output.concat([
        'Name: ' + weapon.name,
        '[Damage]: ' + weapon.damage + ' [ED]: ' + weapon.ed + ' [AP]: ' + weapon.ap,
        '[Short]: ' + weapon.rangeShort + ' [Medium]: ' + weapon.rangeMedium + ' [Long]: ' + weapon.rangeLong,
        '[Salvo]: ' + weapon.salvo,
        '[Traits]: ' + weapon.traits.join(', '),
        // Let's ignore value and rarity for now
        // value: 4,
        // rarity: 'Uncommon',
        '[Keywords]: ' + weapon.keywords.join(', ')
      ]);
    });

    return output.join('\r');
  },
  searchByKeyword: (keyword) => {
    const results = []
    const searchTerm = utils.getSearchTerm(keyword);

    Object.keys(dict).forEach(name => {
      const entry = dict[name];
      const keywords = entry.keywords || [];
      if (keywords.indexOf(searchTerm) > -1) {
        results.push(entry);
      }
    })

    return results;
  }
}

const weapons = function(context) {
  try {
    // By name
    if (context in dict) {
      return utils.print([dict[context]]);
    }
    // By keyword
    const results = utils.searchByKeyword(context);
    return utils.print(results);
  } catch (e) {
    console.log(e)
    return common.badCall('weapons')
  }
}

// Weapons dictionary
const dict = {
  'bolt pistol': {
    name: 'Bolt Pistol',
    damage: '10',
    ed: '1',
    ap: '-',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 1,
    traits: ['Brutal, Pistol'],
    value: 4,
    rarity: 'Uncommon',
    keywords: ['BOLT', 'IMPERIUM'],
  },
  'heavy bolt pistol': {
    name: 'Heavy Bolt Pistol',
    damage: '10',
    ed: '1',
    ap: '-1',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 1,
    traits: ['Brutal, Pistol'],
    value: 7,
    rarity: 'Very Rare',
    keywords: ['BOLT', 'IMPERIUM', 'ADEPTUS ASTARTES', 'PRIMARIS'],
  },
  'boltgun': {
    name: 'Boltgun',
    damage: '10',
    ed: '1',
    ap: '-',
    rangeShort: 12,
    rangeMedium: 24,
    rangeLong: 36,
    salvo: 2,
    traits: ['Brutal, Rapid Fire [2]'],
    value: 6,
    rarity: 'Uncommon',
    keywords: ['BOLT', 'IMPERIUM'],
  },
  'bolt rifle': {
    name: 'Bolt Rifle',
    damage: '10',
    ed: '1',
    ap: '-1',
    rangeShort: 15,
    rangeMedium: 30,
    rangeLong: 45,
    salvo: 2,
    traits: ['Brutal, Rapid Fire [2]'],
    value: 7,
    rarity: 'Very Rare',
    keywords: ['BOLT', 'IMPERIUM', 'ADEPTUS ASTARTES', 'PRIMARIS'],
  },
  'storm bolter': {
    name: 'Storm Bolter',
    damage: '10',
    ed: '1',
    ap: '-',
    rangeShort: 12,
    rangeMedium: 24,
    rangeLong: 36,
    salvo: 4,
    traits: ['Brutal, Heavy [3], Rapid Fire [2]'],
    value: '6',
    rarity: ['Rare'],
    keywors: ['BOLT', 'IMPERIUM'],
  },
  'assault bolter': {
    name: 'Assault Bolter',
    damage: '12',
    ed: '2',
    ap: '-1',
    rangeShort: 9,
    rangeMedium: 18,
    rangeLong: 27,
    salvo: 3,
    traits: ['Assault, Brutal'],
    value: 8,
    rarity: 'Very Rare',
    keywords: ['BOLT', 'IMPERIUM', 'ADEPTUS ASTARTES', 'PRIMARIS'],
  },
  'heavy bolter': {
    name: 'Heavy Bolter',
    damage: '12',
    ed: '2',
    ap: '-1',
    rangeShort: 18,
    rangeMedium: 36,
    rangeLong: 54,
    salvo: 3,
    traits: ['Brutal, Heavy [4]'],
    value: 6,
    rarity: 'Uncommon',
    keywords: ['BOLT', 'IMPERIUM'],
  }
}

module.exports = {
  dict,
  utils,
  weapons,
};
