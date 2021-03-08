const {badCall} = require('./../../common.js');

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
        '**' + weapon.name + '**',
        '[Damage]: ' + weapon.damage + ' [ED]: ' + weapon.ed + ' [AP]: ' + weapon.ap,
        '[Short]: ' + weapon.rangeShort + ' [Medium]: ' + weapon.rangeMedium + ' [Long]: ' + weapon.rangeLong + ' [Salvo]: ' + weapon.salvo,
        // Let's ignore value and rarity for now
        // value: 4,
        // rarity: 'Uncommon',
        '[Traits]: ' + weapon.traits.join(', ') + ' [Keywords]: ' + weapon.keywords.join(', ')
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
        results.push(entry.name);
      }
    })

    const output = [
      `You searched [**${keyword}**] (${results.length})`,
      `*${results.join(', ')}*`
    ]

    return output;
  }
}

// Weapons dictionary
const dict = {
  'knife': {
    name: 'Knife',
    damage: '(S)+2',
    ed: '2',
    ap: '-',
    rangeShort: 1,
    rangeMedium: 'Thrown: (S)x4',
    rangeLong: 'Thrown: (S)x4',
    traits: [],
    value: 2,
    rarity: 'Common',
    keywords: ['BLADE', '[ANY]'], 
  },
  'astartes combat knife': {
    name: 'Astartes Combat Knife',
    damage: '(S)+3',
    ed: '2',
    ap: '-1',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Reliable'],
    value: 3,
    rarity: 'Uncommon',
    keywords: ['BLADE', 'ADEPTUS ASTARTES'], 
  },
  'sword': {
    name: 'Sword',
    damage: '(S)+3',
    ed: '3',
    ap: '-',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Parry'],
    value: 3,
    rarity: 'Common',
    keywords: ['BLADE', '[ANY]'], 
  },  
  'mono knife': {
    name: 'Mono Knife',
    damage: '(S)+3',
    ed: '2',
    ap: '-1',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Rending (1)'],
    value: 3,
    rarity: 'Uncommon',
    keywords: ['BLADE', 'IMPERIUM', 'SCUM'], 
  },  
  'industrial bludgeon': {
    name: 'Industrial Bludgeon',
    damage: '(S)+4',
    ed: '2',
    ap: '-',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Brutal', 'Unwieldy (1)'],
    value: 3,
    rarity: 'Uncommon',
    keywords: ['[ANY]'], 
  },
  'chain bayonet': {
    name: 'Chain Bayonet',
    damage: '(S)+4',
    ed: '1',
    ap: '-',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Brutal'],
    value: 3,
    rarity: 'Rare',
    keywords: ['CHAIN', 'IMPERIUM', 'CHAOS'], 
  },    
  'chainsword': {
    name: 'Chainsword',
    damage: '(S)+5',
    ed: '4',
    ap: '-',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Brutal', 'Parry'],
    value: 4,
    rarity: 'Uncommon',
    keywords: ['CHAIN', 'AELDARI', 'IMPERIUM', 'CHAOS'], 
  },  
  'chain axe': {
    name: 'Chain Axe',
    damage: '(S)+5',
    ed: '5',
    ap: '-',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Brutal', 'Rending (1)'],
    value: 5,
    rarity: 'Rare',
    keywords: ['CHAIN', 'CHAOS'], 
  },  
  'eviscerator': {
    name: 'Eviscerator',
    damage: '(S)+6',
    ed: '6',
    ap: '-4',
    rangeShort: 2,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Brutal', 'Unwieldy (2)'],
    value: 6,
    rarity: 'Rare',
    keywords: ['CHAIN', '2-HANDED', 'ADEPTUS ASTARTES', 'ADEPTUS MINISTORUM', 'ADEPTUS SORORITAS', 'POWER FIELD'], 
  },  
  'chain fist': {
    name: 'Chain Fist',
    damage: '(S)+7',
    ed: '6',
    ap: '-4',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Brutal', 'Unwieldy (3)'],
    value: 10,
    rarity: 'Very Rare',
    keywords: ['CHAIN', 'POWER FIELD', 'IMPERIUM', 'CHAOS', 'ADEPTUS ASTARTES'], 
  },  
  'whip': {
    name: 'Whip',
    damage: '(S)+1',
    ed: '1',
    ap: '-',
    rangeShort: 4,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Agonising'],
    value: 2,
    rarity: 'Common',
    keywords: ['PRIMITIVE', '[ANY]'], 
  },  
  'neural whip': {
    name: 'Neural Whip',
    damage: '(S)+3',
    ed: '2',
    ap: '-2',
    rangeShort: 4,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Agonising'],
    value: 5,
    rarity: 'Rare',
    keywords: ['EXOTIC', 'ADEPTA SORORITAS'], 
  },  
  'shock whip': {
    name: 'Shock Whip',
    damage: '(S)+4',
    ed: '2',
    ap: '-',
    rangeShort: 4,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Agonising', 'Rending (2)'],
    value: 4,
    rarity: 'Very Rare',
    keywords: ['EXOTIC', '[ANY]'], 
  },  
  'shock maul': {
    name: 'Shock Maul',
    damage: '(S)+4',
    ed: '4',
    ap: '-1',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Agonising', 'Brutal'],
    value: 5,
    rarity: 'Uncommon',
    keywords: ['EXOTIC', 'ADEPTUS ARBITES'], 
  },    
  'force stave': {
    name: 'Force Stave',
    damage: '(S)+4',
    ed: '2',
    ap: '-1',
    rangeShort: 2,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Brutal', 'Force'],
    value: 2,
    rarity: 'Uncommon',
    keywords: ['FORCE', 'AELDARI', '2-HANDED', 'INQUISITION', 'ADEPTUS ASTARTES', 'ADEPTUS ASTRA TELEPATHICA'], 
  },    
  'force sword': {
    name: 'Force Sword',
    damage: '(S)+5',
    ed: '4',
    ap: '-3',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Force', 'Parry'],
    value: 6,
    rarity: 'Rare',
    keywords: ['FORCE', 'AELDARI', 'INQUISITON', 'ADEPTUS ASTARTES'], 
  },  
  'force axe': {
    name: 'Force Axe',
    damage: '(S)+5',
    ed: '5',
    ap: '-2',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Force'],
    value: 6,
    rarity: 'Very Rare',
    keywords: ['FORCE', 'INQUISITON', 'ADEPTUS ASTARTES'], 
  },  
  'nemesis daemon hammer': {
    name: 'Nemesis Daemon Hammer',
    damage: '(S)+8',
    ed: '6',
    ap: '-3',
    rangeShort: 2,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Brutal', 'Force', 'Unwieldy (2)'],
    value: 10,
    rarity: 'Unique',
    keywords: ['FORCE', '2-HANDED', 'INQUISITION', 'ADEPTUS ASTARTES'], 
  },  
  'death cult power blade': {
    name: 'Death Cult Power Blade',
    damage: '(S)+5',
    ed: '4',
    ap: '-2',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Parry'],
    value: 6,
    rarity: 'Very Rare',
    keywords: ['POWER FIELD', 'IMPERIUM', 'ADEPTUS MINISTORUM'], 
  },  
  'power sword': {
    name: 'Power Sword',
    damage: '(S)+5',
    ed: '4',
    ap: '-3',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Parry'],
    value: 6,
    rarity: 'Rare',
    keywords: ['POWER FIELD', 'IMPERIUM', 'AELDARI'], 
  },   
  'omnissian axe': {
    name: 'Omnissian Axe',
    damage: '(S)+5',
    ed: '5',
    ap: '-2',
    rangeShort: 2,
    rangeMedium: '-',
    rangeLong: '-',
    traits: [],
    value: 6,
    rarity: 'Very Rare',
    keywords: ['POWER FIELD', '2-HANDED', 'ADEPTUS MECHANICUS'], 
  },  
  'power axe': {
    name: 'Power Axe',
    damage: '(S)+5',
    ed: '5',
    ap: '-2',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Rending (1)'],
    value: 6,
    rarity: 'Rare',
    keywords: ['POWER FIELD', 'IMPERIUM', 'ADEPTUS ASTARTES', 'ADEPTUS MECHANICUS', 'AELDARI'], 
  },  
  'power fist': {
    name: 'Power Fist',
    damage: '(S)+5',
    ed: '5',
    ap: '-3',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Brutal', 'Unwieldy (2)'],
    value: 8,
    rarity: 'Very Rare',
    keywords: ['POWER FIELD', 'IMPERIUM', 'ADEPTUS ASTARTES'], 
  },  
  'thunder hammer': {
    name: 'Thunder Hammer',
    damage: '(S)+8',
    ed: '6',
    ap: '-3',
    rangeShort: 2,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Brutal', 'Unwieldy (2)'],
    value: 9,
    rarity: 'Unique',
    keywords: ['POWER FIELD', '2-HANDED', 'IMPERIUM', 'ADEPTUS ASTARTES', 'INQUISITION'], 
  },  
  'singing spear': {
    name: 'Singing Spear',
    damage: '(S)+6',
    ed: '5',
    ap: '-',
    rangeShort: 2,
    rangeMedium: 'Thrown: Sx5',
    rangeLong: 'Thrown: Sx5',
    traits: ['Assault', 'Force', 'Warp Weapon'],
    value: 11,
    rarity: 'Unique',
    keywords: ['FORCE', 'AELDARI', 'ASURYANI'], 
  },  
  'witchblade': {
    name: 'Witchblade',
    damage: '6',
    ed: '5',
    ap: '-',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Force', 'Parry', 'Warp Weapon'],
    value: 9,
    rarity: 'Very Rare',
    keywords: ['FORCE', 'AELDARI', 'ASURYANI'], 
  },  
  'void sabre': {
    name: 'Void Sabre',
    damage: '(S)+5',
    ed: '4',
    ap: '-3',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Brutal', 'Parry'],
    value: 6,
    rarity: 'Very Rare',
    keywords: ['POWER FIELD', 'AELDARI', 'ANHRATHE'], 
  },   
  'choppa': {
    name: 'Choppa',
    damage: '3',
    ed: '3',
    ap: '-',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Reliable (HA, SURE)', 'Waaagh!'],
    value: 2,
    rarity: 'Common',
    keywords: ['BLADE', 'ORK'], 
  },  
  'weirdboy staff': {
    name: 'Weirdboy Staff',
    damage: '4',
    ed: '1',
    ap: '-1',
    rangeShort: 2,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Force', 'Waaagh!'],
    value: 5,
    rarity: 'Very Rare',
    keywords: ['FORCE', '2-HANDED', 'ORK'], 
  },  
  'chain choppa': {
    name: 'Chain Choppa',
    damage: '5',
    ed: '4',
    ap: '-',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Brutal', 'Waaagh!'],
    value: 5,
    rarity: 'Very Rare',
    keywords: ['CHAIN', 'ORK'], 
  },  
  'big choppa': {
    name: 'Big Choppa',
    damage: '5',
    ed: '5',
    ap: '-1',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Waaagh!'],
    value: 4,
    rarity: 'Rare',
    keywords: ['BLADE', '2-HANDED', 'ORK'], 
  },  
  'power klaw': {
    name: 'Power Klaw',
    damage: '6',
    ed: '5',
    ap: '-3',
    salvo: '-',
    rangeShort: 1,
    rangeMedium: '-',
    rangeLong: '-',
    traits: ['Brutal', 'Unwieldy (3)'],
    value: 8,
    rarity: 'Very Rare',
    keywords: ['POWER FIELD', 'ORK'], 
  },  
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
  },
  'laspistol': {
    name: 'Laspistol',
    damage: '7',
    ed: '1',
    ap: '-',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 1,
    traits: ['Pistol', 'Reliable'],
    value: 3,
    rarity: 'Common',
    keywords: ['LAS', 'IMPERIUM'],
  }, 
  'hot-shot laspistol': {
    name: 'Hot-Shot Laspistol',
    damage: '7',
    ed: '1',
    ap: '-2',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 1,
    traits: ['Pistol', 'Reliable'],
    value: 6,
    rarity: 'Rare',
    keywords: ['LAS', 'IMPERIUM', 'ASTRA MILITARUM'],
  },  
  'master-crafted laspistol': {
    name: 'Master-Crafted Laspistol',
    damage: '10',
    ed: '1',
    ap: '-',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 1,
    traits: ['Pistol'],
    value: 6,
    rarity: 'Very Rare',
    keywords: ['LAS', 'IMPERIUM'],
  },  
  'lasgun': {
    name: 'Lasgun',
    damage: '7',
    ed: '1',
    ap: '-',
    rangeShort: 12,
    rangeMedium: 24,
    rangeLong: 36,
    salvo: 2,
    traits: ['Rapid Fire [1]', 'Reliable'],
    value: 3,
    rarity: 'Common',
    keywords: ['LAS', 'IMPERIUM'],
  },  
  'hot-shot lasgun': {
    name: 'Hot-Shot Lasgun',
    damage: '7',
    ed: '1',
    ap: '-2',
    rangeShort: 9,
    rangeMedium: 18,
    rangeLong: 27,
    salvo: 2,
    traits: ['Rapid Fire[1]', 'Reliable'],
    value: 6,
    rarity: 'Rare',
    keywords: ['LAS', 'IMPERIUM', 'ASTRA MILITARUM'],
  },  
  'hot-shot volley gun': {
    name: 'Hot-Shot Volley Gun',
    damage: '10',
    ed: '1',
    ap: '-2',
    rangeShort: 12,
    rangeMedium: 24,
    rangeLong: 36,
    salvo: 4,
    traits: ['Heavy[4]', 'Reliable'],
    value: 6,
    rarity: 'Rare',
    keywords: ['LAS', 'IMPERIUM', 'ASTRA MILITARUM'],
  },  
  'long las': {
    name: 'Long Las',
    damage: '10',
    ed: '1',
    ap: '-',
    rangeShort: 18,
    rangeMedium: 36,
    rangeLong: 54,
    salvo: 0,
    traits: ['Sniper [1]', 'Reliable'],
    value: 6,
    rarity: 'Uncommon',
    keywords: ['LAS', 'IMPERIUM', 'ASTRA MILITARUM'],
  },  
  'lascannon': {
    name: 'Lascannon',
    damage: '18',
    ed: '3',
    ap: '-3',
    rangeShort: 24,
    rangeMedium: 48,
    rangeLong: 72,
    salvo: 1,
    traits: ['Heavy [4]', 'Reliable'],
    value: 9,
    rarity: 'Uncommon',
    keywords: ['LAS', 'IMPERIUM'],
  },  
  'plasma pistol': {
    name: 'Plasma Pistol',
    damage: '15',
    ed: '1',
    ap: '-3',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 1,
    traits: ['Pistol', 'Supercharge'],
    value: 6,
    rarity: 'Rare',
    keywords: ['PROJECTILE', 'IMPERIUM'],
  },  
  'plasma gun': {
    name: 'Plasma Gun',
    damage: '15',
    ed: '1',
    ap: '-3',
    rangeShort: 12,
    rangeMedium: 24,
    rangeLong: 36,
    salvo: 2,
    traits: ['Rapid Fire[1]', 'Supercharge'],
    value: 6,
    rarity: 'Rare',
    keywords: ['PROJECTILE', 'IMPERIUM'],
  },  
  'plasma cannon': {
    name: 'Plasma Cannon',
    damage: '15',
    ed: '2',
    ap: '-3',
    rangeShort: 18,
    rangeMedium: 36,
    rangeLong: 54,
    salvo: 3,
    traits: ['Heavy [8]', 'Supercharge'],
    value: 7,
    rarity: 'Very Rare',
    keywords: ['PROJECTILE', 'IMPERIUM'],
  },  
  'inferno pistol': {
    name: 'Inferno Pistol',
    damage: '16',
    ed: '1',
    ap: '-4',
    rangeShort: 3,
    rangeMedium: 6,
    rangeLong: 9,
    salvo: 1,
    traits: ['Melta', 'Pistol'],
    value: 6,
    rarity: 'Very Rare',
    keywords: ['MELTA', 'IMPERIUM', 'ADEPTUS ASTARTES', 'ADEPTA SORORITAS'],
  },  
  'meltagun': {
    name: 'Meltagun',
    damage: '16',
    ed: '2',
    ap: '-4',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 1,
    traits: ['Rapid Fire [1]', 'Supercharge'],
    value: 6,
    rarity: 'Rare',
    keywords: ['MELTA', 'IMPERIUM'],
  },  
  'multi-melta': {
    name: 'Multi-Melta',
    damage: '16',
    ed: '3',
    ap: '-4',
    rangeShort: 12,
    rangeMedium: 24,
    rangeLong: 36,
    salvo: 1,
    traits: ['Heavy [8]', 'Melta'],
    value: 7,
    rarity: 'Very Rare',
    keywords: ['MELTA', 'IMPERIUM'],
  },  
  'autopistol': {
    name: 'Autopistol',
    damage: '7',
    ed: '1',
    ap: '-',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 2,
    traits: ['Pistol'],
    value: 3,
    rarity: 'Common',
    keywords: ['PROJECTILE', 'IMPERIUM', 'SCUM'],
  },  
  'hand cannon': {
    name: 'Hand Cannon',
    damage: '9',
    ed: '1',
    ap: '-1',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 1,
    traits: ['Pistol'],
    value: 4,
    rarity: 'Common',
    keywords: ['PROJECTILE', 'IMPERIUM', 'SCUM'],
  },  
  'autogun': {
    name: 'Autogun',
    damage: '7',
    ed: '1',
    ap: '-',
    rangeShort: 12,
    rangeMedium: 24,
    rangeLong: 36,
    salvo: 3,
    traits: ['Rapid Fire [1]'],
    value: 3,
    rarity: 'Common',
    keywords: ['PROJECTILE', 'IMPERIUM', 'SCUM'],
  },  
  'stubber': {
    name: 'Stubber',
    damage: '7',
    ed: '1',
    ap: '-',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 1,
    traits: ['Pistol'],
    value: 2,
    rarity: 'Common',
    keywords: ['PROJECTILE', 'IMPERIUM', 'SCUM'],
  },  
  'needle pistol': {
    name: 'Needle Pistol',
    damage: '8',
    ed: '2',
    ap: '-',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 1,
    traits: ['Agonizing', 'Inflict (Poisoned 4)', 'Pistol', 'Silent'],
    value: 6,
    rarity: 'Very Rare',
    keywords: ['PROJECTILE', 'IMPERIUM'],
  },  
  'stubcannon': {
    name: 'Stubcannon',
    damage: '9',
    ed: '1',
    ap: '-',
    rangeShort: 9,
    rangeMedium: 18,
    rangeLong: 27,
    salvo: 1,
    traits: ['Brutal'],
    value: 3,
    rarity: 'Common',
    keywords: ['PROJECTILE', 'IMPERIUM', 'SCUM'],
  },  
  'shotgun': {
    name: 'Shotgun',
    damage: '8',
    ed: '1',
    ap: '-',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 1,
    traits: ['Assault', 'Spread'],
    value: 3,
    rarity: 'Common',
    keywords: ['PROJECTILE', 'IMPERIUM', 'SCUM'],
  },  
  'combat shotgun': {
    name: 'Combat Shotgun',
    damage: '9',
    ed: '1',
    ap: '-',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 2,
    traits: ['Assault', 'Rapid Fire [1]', 'Spread'],
    value: 3,
    rarity: 'Uncommon',
    keywords: ['PROJECTILE', 'IMPERIUM'],
  },  
  'astartes shotgun': {
    name: 'Astartes Shotgun',
    damage: '10',
    ed: '1',
    ap: '-',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 2,
    traits: ['Assault', 'Spread', 'Reliable'],
    value: 6,
    rarity: 'Rare',
    keywords: ['PROJECTILE', 'IMPERIUM', 'ADEPTUS ASTARTES'],
  },  
  'needle rifle': {
    name: 'Needle Rifle',
    damage: '8',
    ed: '2',
    ap: '-',
    rangeShort: 14,
    rangeMedium: 28,
    rangeLong: 42,
    salvo: 2,
    traits: ['Agonizing', 'Silent', 'Inflict (Poisoned 4)'],
    value: 6,
    rarity: 'Very Rare',
    keywords: ['PROJECTILE', 'IMPERIUM'],
  },  
  'heavy stubber': {
    name: 'Heavy Stubber',
    damage: '10',
    ed: '2',
    ap: '-',
    rangeShort: 18,
    rangeMedium: 36,
    rangeLong: 54,
    salvo: 3,
    traits: ['Heavy [4]'],
    value: 5,
    rarity: 'Uncommon',
    keywords: ['PROJECTILE', 'IMPERIUM', 'SCUM'],
  },  
  'astartes sniper rifle': {
    name: 'Astartes Sniper Rifle',
    damage: '10',
    ed: '1',
    ap: '-',
    rangeShort: 18,
    rangeMedium: 36,
    rangeLong: 54,
    salvo: 0,
    traits: ['Sniper [2]'],
    value: 6,
    rarity: 'Uncommon',
    keywords: ['PROJECTILE', 'IMPERIUM', 'ADEPTUS ASTARTES'],
  },  
  'assault cannon': {
    name: 'Assault Cannon',
    damage: '14',
    ed: '2',
    ap: '-1',
    rangeShort: 12,
    rangeMedium: 24,
    rangeLong: 36,
    salvo: 6,
    traits: ['Heavy [8]'],
    value: 6,
    rarity: 'Uncommon',
    keywords: ['PROJECTILE', 'IMPERIUM', 'ADEPTUS ASTARTES'],
  },  
  'autocannon': {
    name: 'Autocannon',
    damage: '16',
    ed: '1',
    ap: '-1',
    rangeShort: 24,
    rangeMedium: 48,
    rangeLong: 72,
    salvo: 3,
    traits: ['Heavy [8]'],
    value: 5,
    rarity: 'Common',
    keywords: ['PROJECTILE', 'IMPERIUM'],
  },  
  'hand flamer': {
    name: 'Hand Flamer',
    damage: '7',
    ed: '1',
    ap: '-',
    rangeShort: 3,
    rangeMedium: 6,
    rangeLong: 9,
    salvo: 1,
    traits: ['Flamer', 'Pistol'],
    value: 5,
    rarity: 'Uncommon',
    keywords: ['FIRE', 'IMPERIUM'],
  },  
  'flamer': {
    name: 'Flamer',
    damage: '10',
    ed: '1',
    ap: '-',
    rangeShort: 4,
    rangeMedium: 8,
    rangeLong: 12,
    salvo: 1,
    traits: ['Assault', 'Flamer'],
    value: 5,
    rarity: 'Uncommon',
    keywords: ['FIRE', 'IMPERIUM'],
  },  
  'heavy flamer': {
    name: 'Heavy Flamer',
    damage: '12',
    ed: '2',
    ap: '-1',
    rangeShort: 4,
    rangeMedium: 8,
    rangeLong: 12,
    salvo: 2,
    traits: ['Flamer', 'Heavy (6)'],
    value: 5,
    rarity: 'Uncommon',
    keywords: ['FIRE', 'IMPERIUM'],
  },  
  'arc pistol': {
    name: 'Arc Pistol',
    damage: '14',
    ed: '1',
    ap: '-1',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 1,
    traits: ['Arc [2]', 'Pistol'],
    value: 5,
    rarity: 'Rare',
    keywords: ['ARC', 'ADEPTUS MECHANICUS'],
  },  
  'radium pistol': {
    name: 'Radium Pistol',
    damage: '7',
    ed: '1',
    ap: '-',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 1,
    traits: ['Pistol', 'Rad [2]'],
    value: 6,
    rarity: 'Rare',
    keywords: ['PROJECTILE', 'ADEPTUS MECHANICUS'],
  },  
  'galvanic rifle': {
    name: 'Galvanic Rifle',
    damage: '10',
    ed: '1',
    ap: '-',
    rangeShort: 15,
    rangeMedium: 30,
    rangeLong: 45,
    salvo: 2,
    traits: ['Rapid Fire [1]', 'Rending [1]'],
    value: 5,
    rarity: 'Rare',
    keywords: ['PROJECTILE', 'ADEPTUS MECHANICUS'],
  },  
  'arc rifle': {
    name: 'Arc Rifle',
    damage: '14',
    ed: '1',
    ap: '-1',
    rangeShort: 12,
    rangeMedium: 24,
    rangeLong: 36,
    salvo: 2,
    traits: ['Arc [2]', 'Rapid Fire [1]'],
    value: 6,
    rarity: 'Rare',
    keywords: ['ARC', 'ADEPTUS MECHANICUS'],
  },  
  'radium carbine': {
    name: 'Radium Carbine',
    damage: '7',
    ed: '1',
    ap: '-',
    rangeShort: 9,
    rangeMedium: 18,
    rangeLong: 27,
    salvo: 3,
    traits: ['Assault', 'Rad [2]'],
    value: 6,
    rarity: 'Very Rare',
    keywords: ['PROJECTILE', 'ADEPTUS MECHANICUS'],
  },  
  'volkite blaster': {
    name: 'Volkite Blaster',
    damage: '14',
    ed: '2',
    ap: '-',
    rangeShort: 12,
    rangeMedium: 24,
    rangeLong: 36,
    salvo: 2,
    traits: ['Blast (Small)', 'Heavy [4]', 'Inflict (On Fire)', 'Rapid Fire [2]'],
    value: 11,
    rarity: 'Unique',
    keywords: ['ADEPTUS MECHANICUS'],
  },  
  'frag grenade': {
    name: 'Frag Grenade',
    damage: '10',
    ed: '4',
    ap: '-',
    rangeShort: 'Thrown: Sx4',
    rangeMedium: '-',
    rangeLong: '-',
    salvo: '-',
    traits: ['Blast [Medium]'],
    value: 2,
    rarity: 'Common',
    keywords: ['EXPLOSIVE', 'IMPERIUM'],
  },  
  'plasma grenade': {
    name: 'Plasma Grenade',
    damage: '10',
    ed: '5',
    ap: '-1',
    rangeShort: 'Thrown: Sx4',
    rangeMedium: '-',
    rangeLong: '-',
    salvo: '-',
    traits: ['Blast [Medium]'],
    value: 7,
    rarity: 'Very Rare',
    keywords: ['EXPLOSIVE', 'AELDARI'],
  },  
  'krak grenade': {
    name: 'Krak Grenade',
    damage: '14',
    ed: '5',
    ap: '-2',
    rangeShort: 'Thrown: Sx4',
    rangeMedium: '-',
    rangeLong: '-',
    salvo: '-',
    traits: ['Blast [Small]'],
    value: 4,
    rarity: 'Uncommon',
    keywords: ['EXPLOSIVE', 'IMPERIUM'],
  },  
  'militarum tempustus grenade launcher': {
    name: 'Militarum Tempestus Grenade Launcher',
    damage: 'Use Grenade Profile',
    ed: 'Use Grenade Profile',
    ap: 'Use Grenade Profile',
    rangeShort: 14,
    rangeMedium: 28,
    rangeLong: 42,
    salvo: '-',
    traits: ['Assault'],
    value: 6,
    rarity: 'Uncommon',
    keywords: ['EXPLOSIVE', 'IMPERIUM', 'ASTRA MILITARUM'],
  },  
  'frag missile': {
    name: 'Frag Missile',
    damage: '10',
    ed: '5',
    ap: '-',
    rangeShort: '-',
    rangeMedium: '-',
    rangeLong: '-',
    salvo: '-',
    traits: ['Blast [Large]'],
    value: 4,
    rarity: 'Common',
    keywords: ['EXPLOSIVE', 'IMPERIUM', '[ANY]'],
  },  
  'krak missile': {
    name: 'Krak Missile',
    damage: '16',
    ed: '6',
    ap: '-2',
    rangeShort: '-',
    rangeMedium: '-',
    rangeLong: '-',
    salvo: '-',
    traits: ['Blast [Small]'],
    value: 6,
    rarity: 'Common',
    keywords: ['EXPLOSIVE', 'IMPERIUM'],
  },  
  'missile launcher': {
    name: 'Missile Launcher',
    damage: 'Use Missile Profile',
    ed: 'Use Missile Profile',
    ap: 'Use Missile Profile',
    rangeShort: 24,
    rangeMedium: 48,
    rangeLong: 72,
    salvo: '-',
    traits: ['Heavy [6]'],
    value: 4,
    rarity: 'Common',
    keywords: ['EXPLOSIVE', 'IMPERIUM'],
  },  
  'cyclone missile launcher': {
    name: 'Cyclone Missile Launcher',
    damage: 'Use Missile Profile',
    ed: 'Use Missile Profile',
    ap: 'Use Missile Profile',
    rangeShort: 18,
    rangeMedium: 36,
    rangeLong: 54,
    salvo: '-',
    traits: ['Heavy [8]'],
    value: 11,
    rarity: 'Very Rare',
    keywords: ['EXPLOSIVE', 'IMPERIUM', 'ADEPTUS ASTARTES'],
  },  
  'lasblaster': {
    name: 'Lasblaster',
    damage: '7',
    ed: '1',
    ap: '-',
    rangeShort: 12,
    rangeMedium: 24,
    rangeLong: 36,
    salvo: 4,
    traits: ['Assault'],
    value: 5,
    rarity: 'Very Rare',
    keywords: ['LAS', 'AELDARI'],
  },  
  'shuriken catapult': {
    name: 'Shuriken Catapult',
    damage: '10',
    ed: '1',
    ap: '-',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 3,
    traits: ['Assault', 'Rending [3]'],
    value: 6,
    rarity: 'Rare',
    keywords: ['SHURIKEN', 'AELDARI', 'ASURYANI'],
  },  
  'shuriken pistol': {
    name: 'Shuriken Pistol',
    damage: '10',
    ed: '1',
    ap: '-',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 2,
    traits: ['Pistol', 'Rending [3]'],
    value: 6,
    rarity: 'Rare',
    keywords: ['SHURIKEN', 'AELDARI', 'ASURYANI'],
  },  
  'ranger long rifle': {
    name: 'Ranger Long Rifle',
    damage: '10',
    ed: '1',
    ap: '-',
    rangeShort: 18,
    rangeMedium: 36,
    rangeLong: 54,
    salvo: '-',
    traits: ['Sniper [2]'],
    value: 7,
    rarity: 'Very Rare',
    keywords: ['LAS', 'AELDARI'],
  },  
  'fusion gun': {
    name: 'Fusion Gun',
    damage: '16',
    ed: '2',
    ap: '-4',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 1,
    traits: ['Assault', 'Melta'],
    value: 6,
    rarity: 'Very Rare',
    keywords: ['MELTA', 'AELDARI'],
  },  
  'slugga': {
    name: 'Slugga',
    damage: '10',
    ed: '1',
    ap: '-',
    rangeShort: 6,
    rangeMedium: 12,
    rangeLong: 18,
    salvo: 1,
    traits: ['Pistol', 'Waaagh!'],
    value: 3,
    rarity: 'Common',
    keywords: ['PROJECTILE', 'ORK'],
  },  
  'shoota': {
    name: 'Shoota',
    damage: '10',
    ed: '1',
    ap: '-',
    rangeShort: 9,
    rangeMedium: 18,
    rangeLong: 27,
    salvo: 2,
    traits: ['Assault', 'Waaagh!'],
    value: 4,
    rarity: 'Uncommon',
    keywords: ['PROJECTILE', 'ORK'],
  },  
  'burna': {
    name: 'Burna',
    damage: '10',
    ed: '1',
    ap: '-',
    rangeShort: 4,
    rangeMedium: 8,
    rangeLong: 12,
    salvo: 1,
    traits: ['Assault', 'Blast [Small]', 'Inflict (On Fire)', 'Spread'],
    value: 5,
    rarity: 'Uncommon',
    keywords: ['FIRE', 'ORK'],
  },  
  'big shoota': {
    name: 'Big Shoota',
    damage: '12',
    ed: '2',
    ap: '-',
    rangeShort: 18,
    rangeMedium: 36,
    rangeLong: 54,
    salvo: 3,
    traits: ['Assault', 'Waaagh!'],
    value: 5,
    rarity: 'Uncommon',
    keywords: ['PROJECTILE', 'ORK'],
  },  
  'snazzgun': {
    name: 'Snazzgun',
    damage: '12',
    ed: '2',
    ap: '-2',
    rangeShort: 12,
    rangeMedium: 24,
    rangeLong: 36,
    salvo: 3,
    traits: ['Heavy [4]', 'Kustom'],
    value: 8,
    rarity: 'Unique',
    keywords: ['ORK'],
  },  
  'rokkit launcha': {
    name: 'Rokkit Launcha',
    damage: '16',
    ed: '1d3',
    ap: '-2',
    rangeShort: 12,
    rangeMedium: 24,
    rangeLong: 36,
    salvo: 3,
    traits: ['Blast [Small]'],
    value: 7,
    rarity: 'Rare',
    keywords: ['EXPLOSIVE', 'ORK'],
  },
  'stikkbomb': {
    name: 'Stikkbomb',
    damage: '7',
    ed: '1',
    ap: '-',
    rangeShort: 'Throw: Sx4',
    rangeMedium: '-',
    rangeLong: '-',
    salvo: '-',
    traits: ['Blast [Medium]'],
    value: 2,
    rarity: 'Uncommon',
    keywords: ['EXPLOSIVE', 'ORK'],
  }  
}

module.exports = {
  name: 'weapons',
  description: [
    'A function to look up information for a weapon.',
  ],
  usage: [
    'weapon {weapon name}',
  ],
  execute(context, prefix){
    try {
      // By name
      if (context in dict) {
        return utils.print([dict[context]]);
      }
      // By keyword
      return utils.searchByKeyword(context);
    } catch (e) {
      console.log(e)
      return badCall(prefix)
    }
  },
};
