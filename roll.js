const common = require('./common.js');

const types = {
  EXTRA_DAMAGE: 'ed',
  D6: 'd6',
  D3: 'd3',
  D66: 'd66',
  WRATH: 'wrath',
}

const roll = function(context) {
  try {
    const requestType = utils.identify(context.trim());

    switch (requestType) {
      case types.EXTRA_DAMAGE:
        return utils.extraDamage(context);
      case types.D3:
        return utils.d3();
      case types.D6:
        return utils.d6();
      case types.D66:
        return utils.d66();
      default:
        return utils.rollWrath(context);
    }
  } catch (e) {
    console.log(e)
    return utils.badCall()
  }
}

const utils = {
  badCall() {
    return ': Please see !wghelp roll for instructions on how to use the !wgroll command.';
  },

  d3() {
    return ': Roll [d3]`: You rolled a (**' + common.dice(3) + '**)!';  
  },

  d6() {
    return ': Roll [d6]`: You rolled a (**' + common.dice(6) + '**)!';
  },

  d66() {
    return ': Roll [d66]`: You rolled a (**' + common.dice(6) + common.dice(6) + '**)!';    
  },

  extraDamage(context) {
    const diceString = context.split('ed');
    const rollDice = parseInt(diceString[0]);
    let damage = 0;
    
    const pool = (diceString[1].trim() == 'brutal') ?
      utils.getBrutalPool() :
      utils.getPool();
    
    const rollList = new Array();
    for (let i = 0; i < rollDice; i++) {
      const result = common.dice(6);
      rollList.push(result);
      damage += pool[result - 1];
    }

    return output = ': You deal **' + damage + '** additional damage!\r[Extra Dice] *' + rollList + '*';
  },

  identify(context) {
    if (context.includes('ed')) {
      return types.EXTRA_DAMAGE;
    } else if (context === 'd6') {
      return types.D6;
    } else if (context === 'd3') {
      return types.D3;
    } else if (context === 'd66') {
      return types.D66;
    }

    return types.WRATH;
  },

  getPool() {
    return [0 ,0 ,0, 1, 1, 2];
  },

  getBrutalPool() {
    return [0, 0, 1, 1, 2, 2];
  },

  rollWrath(context) {
    const diceString = context.split('w');
    const wrath = isNaN(parseInt(diceString[1])) ? 1 : parseInt(diceString[1]);
    const regular = parseInt(diceString[0]) - wrath;	
    const pool = utils.getPool();

    let iconCount = 0;
    let exaltedIconCount = 0;
    let perilsCount = 0;    
    let complication = false;
    let glory = false;
    const rollList = [];
    const wrathList = [];

    for (let i = 0; i < regular; i++) {
      let result = common.dice(6);
      rollList.push(result);
      iconCount += pool[result - 1];
      
      if (result == 6) {
        exaltedIconCount += 1;
      }
    }

    for (let i = 0; i < wrath; i++) {
      result = common.dice(6);
      wrathList.push(result);
      iconCount += pool[result - 1];

      if (result == 1) {
        perilsCount++;
        complication = true;
      }
      if (result == 6) { 
        exaltedIconCount++;
        glory = true;
      }
    }

    const output = [
      '',
      ': Roll ['+context+']: You obtain (**' + iconCount + '**) Icons!',
      '[Standard] *' + rollList + '* ',
      '[Wrath] *' + wrathList + '*',
      '[Exalted Icons] ' + exaltedIconCount,
      '[Perils] ' + perilsCount,
    ]

    if (glory == true) {
      output.push('*You bring* __**Glory**__ *to your team!!*');
    }
    if (complication == true) {
      output.push('*You experience a* __**Complication**__*!!*');
    }

    // Join output with line breaks
    return output.join('\r');
  }
}

module.exports = roll;
