const {badCall} = require('./../../common.js');

//Build an array of conditions.
const traitArray = {
    'assault shield': [
                        'An assault shield grants a +2 armour save modifier (to a maximum of 2+) against melee attacks that originate from within the fighter\'s vision arc (the 90° arc to their front), and a +1 armour save modifier against ranged attacks that originate from within the fighter\'s vision arc; check this before the fighter is placed Prone and is Pinned. If it is not clear whether the attacker is within the target\'s front arc, use a Vision Arc template to check – if the centre of the attacker\'s base is within the arc, the assault shield can be used. Against attacks with the Blast trait, use the centre of the Blast marker in place of the attacker. If the target does not have a facing (for example, if they are Prone), the assault shield cannot be used'
                    ],
    'backstab'	    : [
                        'If the attacker is not within the target\'s vision arc, add 1 to the attack\'s Strength.'
    ],
    'blast'         : [
                        'The weapon utilises a blast marker, as described on page 65 of the Necromunda Rulebook.'
    ],
    'blaze'         : [
                        'After an attack with the Blaze trait has been resolved, roll a D6 if the target was hit but not taken Out of Action. On a 4, 5, or 6 they become subject to the Blaze condition. When activated, a fighter subject to the Blaze condition suffers an immediate Strength 3, AP -1, Damage 1 hit before acting as follows:',
                        '- If Prone and Pinned the fighter immediately becomes Standing and Active and acts as described below.',
                        '- If Standing and Active the fighter moves 2d6" in a random direction, determined by the Scatter dice. The fighter will stop moving if this movement would bring them within 1" of an enemy fighter or into base contact with impassable terrain. If this movement brings them within 1/2 " of the edgeo f a level or platform, they risk falling as described on page 63 of the Necromunda Rulebook. If this movement takes the fighter beyond the edge of a level or platform, they will simply fall. At the end of this move, the fighter may choose to become Prone and Pinned. The fighter may then attempt to put the fire out.',
                        '- If Standing and Engaged or Prone and Seriously Injured, the fighter does not move and attempts to put the fire out.',
                        'To attempt to put the fire out, roll a D6, adding 1 to the result for each other Active friendly fighter within 1". On a result of 6 or more , the flames go out and the Blaze marker is removed. Pinned or Seriously Injured fighters add 2 to the result of the roll to see if the flames go out.'
    ],
    'burrowing'     : [
                        'Burrowing weapons can be fired at targets outside of the firer\'s line of sight. When firing at a target outside of line of sight do not make an attack roll, instead place the 3" Blast marker anywhere on the battlefield, then move it 2D6" in a direction determined by the Scatter dice. If a Hit is rolled on the Scatter dice, the Blast marker does not move. At the start of the End phase of the round in which this weapon was fired, before step 1, any fighters touched by the marker are hit by the weapon.',
                        'Note that this Blast marker can move through impassable terrain such as walls and may move off the battlefield. If the Blast marker does move off the battlefield, the attack will have no effect. Burrowing weapons are capable of digging through several levels of wall and flooring, and can be used regardless of where the fighter is positioned on the battlefield.'

    ],
    'chem delivery' : [
                        'When a weapon with the Chem Delivery trait is used, the fighter declares what kind of chem they are firing at the target. This can be any chem the fighter is equipped with (note that firing the weapon does not cost a dose of the chem and that friendly fighters cannot be targeted), or if the weapon also has the Toxin or Gas trait, the fighter can use these Traits instead. Instead of making a Wound roll for a Chem Delivery attack, roll a D6. If the result is equal to or higher than the target’s Toughness, or is a natural 6, the target is affected by the chosen chem just as if they had taken a dose. If the roll is lower than the target’s Toughness, they shrug off the chem’s effects.'
    ],
    'combi'         : [
                        'A combi-weapon has two profiles. When it is fired, pick one of the two profiles and use it for the attack. Due to the compact nature of the weapons, they often have less capacity for ammunition, and are prone to jams and other minor issues. When making an Ammo check for either of the weapons, roll twice and apply the worst result. However, unlike most weapons that have two profiles, ammo for the two parts of the combi-weapon are tracked separately – if one profile runs Out of Ammo, the other can still fire unless it has also run Out of Ammo.'
    ],
    'concussion'    : [
                        'Any model hit by a Concussion weapon has their Initiative reduced by 2 to a minimum of 6+ until the end of the round.'
    ],
    'cursed'        : [
                        'A fighter hit by a weapon with the Cursed trait must make a Willpower check or gain the Insane condition.'
    ],
    'defoliate'     : [
                        'Carnivorous Plants hit by a weapon with the Defoliate Trait immediately take D3 Damage. Brainleaf Zombies hit by a weapon with the Defoliate Trait lose a wound and are removed from the battlefield if they suffer an Out of Action result on the Injury dice.'
    ],
    'demolitions'   : [
                        'Grenade with the Demolitions trait can be used when making close combat attacks against scenery targets (such as locked doors or scenario objectives). A fighter who uses a grenade in this way makes one attack (regardless of how many Attack dice they would normally roll), which hits automatically.'
    ],
    'digi'          : [
                        'A digi weapon is worn mounted on a ring or hidden inside a glove. It can be used in addition to any other Melee weapon or Pistol carried by the fighter granting either an additional shot or an additional close combat attack. A weapon with this trait does not count towards the maximum number of weapons a fighter can carry, however the maximum number of weapon with this trait a fighter can carry is 10.'
    ],
    'disarm'        : [
                        'If the hit roll for an attack made with a Disarm weapon is a natural 6, the target cannot use any weapons when '
    ],
    'drag'          : [
                        'If a fighter is hit by a Drag weapon but not taken Out of Action, the attacker can attempt to drag the target closer after the attack has been resolved. If a they do, roll a d6. If the score is equal to or higher than the target’s Strength, the target is dragged D3’’ straight towards the attacker, stopping if they hit any terrain. If they move into another fighter (other than the attacker), both fighters are moved the remaining distance towards the attacker.',
                        'If the weapon also has the Impale special rule and hits more than one fighter, only the last fighter to be hit can be dragged.'
    ],
    'energy shield': [
                        'An energy shield grants a +2 armour save modifier (to a maximum of 2+) against melee attacks that originate from within the fighter\'s vision arc (the 90° arc to their front), and a +1 armour save modifier against ranged attacks that originate from within the fighter\'s vision arc; check this before the fighter is placed Prone and is Pinned. If it is not clear whether the attacker is within the target\'s front arc, use a Vision Arc template to check – if the centre of the attacker\'s base is within the arc, the energy shield can be used. Against attacks with the Blast trait, use the centre of the Blast marker in place of the attacker. If the target does not have a facing (for example, if they are Prone), the energy shield cannot be used'
    ],
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
    'web'           : [
                        'If the wound roll for a Web attack is successful, no wound is inflicted, and no save roll or Injury roll is made. Instead, the target automatically becomes Webbed. Treat the fighter as if they were Seriously Injured and roll for Recovery for them during the End phase (Web contains a powerful sedative capable of rendering the strongest fighter unconscious). If a Flesh Wound result is rolled during Recovery, apply the result to the fighter as usual and remove the Webbed condition. If a Serious Injury is rolled, the fighter remains Webbed. If an Out of Action result is rolled, the fighter succumbs to the powerful sedative and is removed from play, automatically suffering a result of 12-26 (Out Cold) on the Lasting Injuries table.',
                        'A fighter that is Webbed at the end of the game does not succumb to their Injuries and will automatically recover. However, during the Wrap Up, when rolling to determine if any enemy fighters are Captured at the end of the game, add +1 to the dice roll for each enemy fighter currently Webbed and include them among any eligible to be Captured.' 
    ]
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
                '```'+traitArray[trait].join('\n\n')+'```'
            ];
            return traitOutput.join('\n');
        } else {
            return badCall(prefix);
        }
    }, 
};