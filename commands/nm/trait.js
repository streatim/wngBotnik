const {badCall} = require('./../../common.js');

//Build an array of conditions.
const traitArray = {
    'backstab'	    : ['If the attacker is not within the target\'s vision arc, add 1 to the attack\'s Strength.'],
    'blast'         : ['The weapon utilises a blast marker, as described on page 65 of the Necromunda Rulebook.'],
    'blaze'         : ['After an attack with the Blaze trait has been resolved, roll a D6 if the target was hit but not taken Out of Action. On a 4, 5, or 6 they become subject to the Blaze condition. When activated, a fighter subject to the Blaze condition suffers an immediate Strength 3, AP -1, Damage 1 hit before acting as follows: \r',
                        '- If Prone and Pinned the fighter immediately becomes Standing and Active and acts as described below.\r',
                        '- If Standing and Active the fighter moves 2d6" in a random direction, determined by the Scatter dice. The fighter will stop moving if this movement would bring them within 1" of an enemy fighter or into base contact with impassable terrain. If this movement brings them within 1/2 " of the edgeo f a level or platform, they risk falling as described on page 63 of the Necromunda Rulebook. If this movement takes the fighter beyond the edge of a level or platform, they will simply fall. At the end of this move, the fighter may choose to become Prone and Pinned. The fighter may then attempt to put the fire out.\r',
                        '- If Standing and Engaged or Prone and Seriously Injured, the fighter does not move and attempts to put the fire out.\r',
                        'To attempt to put the fire out, roll a D6, adding 1 to the result for each other Active friendly fighter within 1". On a result of 6 or more , the flames go out and the Blaze marker is removed. Pinned or Seriously Injured fighters add 2 to the result of the roll to see if the flames go out.'
                    ],
    'combi'         : '',
    'concussion'    : '',
    'demolitions'   : '',
    'digi'          : '',
    'disarm'        : 'If the hit roll for an attack made with a Disarm weapon is a natural 6, the target cannot use any weapons when ',
    'drag'          : '',
    'energy shield' : '',
    'entangle'      : '',
    'fear'          : '',
    'flash'         : '',
    'gas'           : '',
    'graviton pulse': '',
    'grenade'       : '',
    'impale'        : '',
    'knockback'     : '',
    'limited'       : '',
    'melee'         : ['This weapon can be used during close combat attacks.'],
    'melta'         : '',
    'parry'         : '',
    'plentiful'     : '',
    'power'         : '',
    'pulverise'     : '',
    'rad-phage'     : '',
    'rapid-fire'    : '',
    'rending'       : '',
    'scarce'        : '',
    'scattershot'   : '',
    'seismic'       : '',
    'shock'         : '',
    'sidearm'       : '',
    'silent'        : '',
    'single shot'   : '',
    'smoke'         : '',
    'template'      : '',
    'toxin'         : '',
    'unstable'      : '',
    'unwieldy'      : '',
    'versatile'     : '',
    'web'           : ''
};

module.exports = {
    name: 'trait',
    description: [
        'Provides more information about the weapon traits.',
        'List of currently-loaded traits:',
        '```',
        'backstab      blast',
        'blaze         melee',
        '```'
    ],
    usage: [
        'trait {trait}'
    ],
    execute(context, prefix){
        const trait = context.trim();
        
        //This function provides information about the conditions listed.
        if(trait in traitArray){
            const traitOutput = [
                '[**'+trait.toUpperCase()+'**]',
                '```'+traitArray[trait].join('\r')+'```'
            ];
            return traitOutput.join('\r');
        } else {
            return badCall(prefix);
        }
    }, 
};