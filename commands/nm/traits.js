const {badCall, buildlist} = require('./../../common.js');

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
    'entangle'      : [
                        'Hits scored by weapons with the Entangle trait cannot be negated by the Parry trait. In addition, if the hit roll for an Entangle weapon is a natural 6, any Reaction attacks made by the target have an additional -2 hit modifier.'
    ],
    'fear'          : [
                        'Instead of making an Injury roll for an attack with the Fear trait, the opposing player makes a Nerve test for the target, subtracting 2 from the result. If the test fails, the target is immediately Broken and runs for cover.'
    ],
    'flare'         : [
                        'A fighter who takes a hit from a weapon with the Flare Trait, or who is touched by a Blast marker fired from a weapon with the Flare Trait, is Revealed if the battlefield is in darkness (see Pitch Black). If a weapon has both the Flare Trait and the Blast Trait after determining where the Blast marker ends up, leave it in place. In the End phase, roll a D6. On a 4 or more, the flare goes out and the marker is removed, otherwise it remains in play. While the Blast marker is on the board, all models at least touched by it are illuminated as if they had a Blaze marker or a Revealed marker.'
    ],
    'flash'         : [
                        'If a fighter is hit by a Flash weapon, no wound roll is made. Instead, make an Initiative check for the target. If it is failed, they are blinded. A blinded fighter loses their Ready marker; if they do not have a Ready marker, they do not gain a Ready marker at the start of the following round. Until the next time the fighter is activated, they cannot make any attacks other than reaction attacks, for which any hit rolls will only succeed on a natural 6.'
    ],
    'gas'           : [
                        'When a fighter is hit by an attack made by a Gas weapon, they are not Pinned and a wound roll is not made. Instead, roll a D6. If the result is equal to or higher than the target’s Toughness, or is a natural 6, make an Injury roll for them (regardless of their Wounds characteristic). If the roll is lower than the target’s Toughness, they shrug off the effects of the gas – no save roll can be made'
    ],
    'graviton pulse': [
                        'Instead of rolling to wound normally with this weapon, any model caught in the blast must instead roll to or under their Strength on a D6 (a roll of 6 always counts as a fail). After the weapon has been fired, leave the Blast marker in place. For the remainder of the round, any model moving through this area will use 2" of their movement for every 1" they move. Remove the Blast marker during the End phase.'
    ],
    'grenade'       : [
                        'Despite being Wargear, grenades are treated as a special type of ranged weapon. A fighter equipped with grenades can throw one as a Shoot (Basic) action. Grenades do not have a Short range, and their Long range is determined by multiplying the fighter’s Strength by the amount shown.',
                        'A fighter can only carry a limited number of grenades. The Firepower dice is not rolled when attacking with a grenade. Instead, after the attack has been resolved, an Ammo check is made automatically. If this is failed, grenades cannot be reloaded; the fighter has run out of that type of grenade and cannot use them for the remainder of the battle. '
    ],
    'gunk'          : [
                        'A fighter hit by a weapon with the Gunk Trait becomes subject to the Gunked condition. Gunked fighters reduce their Movement characteristic by 1 to a minimum of 1 and don’t add D3" to their movement when making a Charge action. In addition, they subtract 1 from the dice roll when making an Initiative check. Gunked fighters are also more flammable and catch fire on a 2+, rather than a 4+, when hit by a weapon with the Blaze trait.',
                        'The Gunked condition lasts until the End phase or until the fighter catches fire after being hit by a weapon with the Blaze Trait.'
    ],
    'hexagrammatic' : [
                        'The ammo used by this weapon has been specially treated to defeat psychic defences and severely harm Psykers. Hits from weapons with this Trait ignore saves provided by psychic powers. Additionally, weapons with this Trait will inflict double damage against Psykers.'
    ],
    'impale'        : [
                        'If an attack made by this weapon hits and wounds the target, and the save roll is unsuccessful (or no save roll is made), the projectile continues through them and might hit another fighter! Trace a straight line from the target, directly away from the attacker. If there are any fighters within 1" of this line, and within the weapon\'s Long Range, the one that is closest to the target is at risk of being hit. Roll a D6 – on a 3 or more, resolve the weapon’s attack against that fighter, subtracting 1 from the Strength. The projectile can continue through multiple fighters in this way, but if the Strength is reduced to 0, it cannot hit any more fighters.'
    ],
    'knockback'     : [
                        'If the hit roll for a weapon with the Knockback trait is equal to or higher than the target’s Strength, they are immediately moved 1" directly away from the attacking fighter. If the fighter cannot be moved the full 1" because of impassable terrain or another fighter, they move as far as possible and the attack’s Damage is increased by 1. If a Blast weapon has the Knockback trait, roll a D6 for each fighter that is hit. If the result is equal to or higher than their Strength, they are knocked back as described above – however, they are moved directly away from the centre of the Blast marker instead. If the centre of the Blast marker was over the centre of their base, roll a Scatter dice to determine which way they are moved. If a Melee weapon has the Knockback trait, the attacking fighter can choose to follow the target up, moving directly towards them after they have been knocked back to remain in base contact. If the attack was made across a barricade, the attacker cannot do this. If any part of the knocked back fighter\'s base crosses the edge of a platform, make an Initiative check. If this is failed, they will fall. If this is passed, they stop moving at the edge of the platform'
    ],
    'limited'       : [
                        'This special rule is applied to some special ammo types which can be purchased for weapons. If a weapon fails an Ammo check while using limited ammo, they have run out – that ammo type is deleted from their fighter card, and cannot be used again until more of that special ammo is purchased from the Trading Post. This is in addition to the normal rules for the weapon running Out of Ammo. The weapon can still be reloaded as normal, using its remaining profile(s).'
    ],
    'melee'         : ['This weapon can be used during close combat attacks.'],
    'melta'         : [
                        'If a Short range attack from a weapon with this Trait reduces a fighter to 0 wounds, no Injury dice are rolled – instead, any Injury dice that would be rolled cause an automatic Out of Action result.'
    ],
    'paired'        : [
                        'A fighter that is armed with Paired weapons counts as being armed with dual weapons with the Melee trait for the purposes of calculating the number of Attack dice they will roll. Additionally, when making a Charge (Double) action, their Attacks characteristic is doubled.'
    ],
    'parry'         : [
                        'After an enemy makes close combat attacks against a fighter armed with a Parry weapon, the defending fighter’s owning player can force the attacking player to re-roll one successful hit. If the defending fighter is armed with two Parry weapons, their owning player can force the attacking player to re-roll two successful hits instead.'
    ],
    'plentiful'     : [
                        'Ammunition for this weapon is incredibly common. When reloading it, no Ammo check is required – it is automatically reloaded.'
    ],
    'power'         : [
                        'The weapon is surrounded by a crackling power field. Attacks made by Power weapons cannot be parried except by other Power weapons. In addition, if the hit roll for a Power weapon is a 6, no save roll can be made against the attack and its Damage is increased by 1.'
    ],
    'pulverise'     : [
                        'After making an Injury roll for an attack made by this weapon, the attacking player can roll a D6. If the result is equal to or higher than the target\'s Toughness, or is a natural 6, they can change one Injury dice from a Flesh Wound result to a Serious Injury result.'
    ],
    'rad phage'     : [
                        'After fully resolving any successful hits a fighter suffers from a weapon with this Trait, roll an additional D6. If the roll is a 4 or higher, the fighter will suffer an additional Flesh Wound.'
    ],
    'rapid fire'    : [
                        'When firing with a Rapid Fire weapon, a successful hit roll scores a number of hits equal to the number of bullet holes on the Firepower dice. In addition the controlling player can roll more than one Firepower dice, up to the number shown in brackets (for example, when firing a Rapid Fire (2) weapon, up to two firepower dice can be rolled). Make an Ammo check for each Ammo symbol that is rolled. If any of them fail, the gun runs Out of Ammo. If two or more of them fail, the gun has jammed and cannot be used for the rest of the battle.',
                        'If a Rapid Fire weapon scores more than one hit, the hits can be split between multiple targets. The first must be allocated to the initial target, but the remainder can be allocated to other fighters within 3’’ of the first who are also within range and line of sight. These must not be any harder to hit than the original target – if a target in the open is hit, an obscured target cannot have hits allocated to it. Allocate all of the hits before making any wound rolls.'
    ],
    'reckless'      : [
                        'Reckless weapons are indiscriminate in what they target. Weapons with this Trait ignore the normal target priority rules. Instead, before making an attack with a weapon with this Trait, randomly determine the target of the attack from all eligible models within the fighter’s line of sight.'
    ],
    'rending'       : ['If the roll to wound with a Rending weapon is a natural 6 the attack causes 1 extra point of damage.'],
    'scarce'        : [
                        'Ammunition is hard to come by for Scarce weapons, and as such they cannot be reloaded – once they run Out of Ammo, they cannot be used again during the battle. '
    ],
    'scattershot'   : ['When a target is hit by a scattershot attack, make D6 wounds roll instead of 1.'],
    'seismic'       : [
                        'If the target of a Seismic attack is Active, they are always Pinned – even if they have an ability that would normally allow them to avoid being Pinned by ranged attacks. In addition, if the wound roll for a Seismic weapon is a natural 6, no save roll can be made against that attack.'
    ],
    'sever'         : [
                        'If a wound roll from a weapon with this Trait reduces a fighter to 0 wounds, no Injury dice are rolled – instead, any Injury dice that would be rolled cause an automatic Out of Action result.'
    ],
    'shield breaker': [
                        'Weapons with this Trait ignore the effects of the Assault Shield and Energy Shield traits. In addition, when a target equipped with Field Armour is wounded by a weapon with this Trait, they must roll two dice when making a Field Armour save and choose the lower result.'
    ],
    'shock'         : [
                        'If the hit roll for a Shock weapon is a natural 6, the wound roll is considered to automatically succeed (no wound roll needs to be made).',
    ],
    'shred'         : [
                        'If the roll to wound with a weapon with this trait is a natural 6, then the Armour Penetration of the weapon is doubled.'
    ],
    'sidearm'       : [
                        'Weapons with this Trait can be used to make ranged attacks, and can also be used in close combat to make a single attack. Note that their Accuracy bonus only applies when making a ranged attack, not when used to make a close combat attack.'
    ],
    'silent'        : [
                        'In scenarios that use the Sneak Attack special rules, there is no test to see whether the alarm is raised when this weapon is fired. Additionally, if using the Pitch Black rules, a fighter using this weapon that is Hidden does not become Revealed.'
    ],
    'single shot'   : [
                        'This weapon can only be used once per game. After use it counts as having automatically failed an Ammo Check. There is no need to roll the Firepower dice unless the weapon also has the Rapid Fire (X) trait.'
    ],
    'smoke'         : [
                        'Smoke weapons do not cause hits on fighters – they do not cause Pinning and cannot inflict Wounds. Instead, mark the location where they hit with a counter. They generate an area of dense smoke, which extends 2.5’’ out from the centre of the counter; a 5’’ Blast marker can be used to determine this area, but it should be considered to extend vertically as well as horizontally. Fighters can move through the smoke, but it blocks line of sight, so attacks cannot be made into, out of or through it. In the End phase, roll a D6. On a 4 or less, the cloud dissipates and the counter is removed.'
    ],
    'template'      : ['Template weapons use the Flame template to determine how many targets they hit.'],
    'toxin'         : [
                        'Instead of making a wound roll for a Toxin attack, roll a D6. If the result is equal to or higher than the target’s Toughness, or is a natural 6, make an Injury roll for them (regardless of their Wounds characteristic). If the roll is lower than the target’s Toughness, they shrug off the toxin’s effects.'
    ],
    'unstable'      : [
                        'If the Ammo Symbol is rolled on the Firepower dice when attacking with this weapon, there is a chance the weapon will overheat in addition to needing an Ammo check. Roll a D6. On a 1, 2 or 3, the weapon suffers a catastrophic overload and the attacker is taken Out of Action. The attack is still resolved against the target.'
    ],
    'unwieldy'      : [
                        'A Shoot action made with this weapon counts as a Double action as opposed to a Single action. In addition, a fighter who uses a weapon with both the Unwieldy and Melee traits in close combat cannot use a second weapon at the same time – this one requires both hands to use.'
    ],
    'versatile'     : [
                        'The wielder of a Versatile weapon does not need to be in base contact with an enemy fighter in order to Engage them in melee during their activation. They may Engage and make close combat attacks against an enemy fighter during their activation, so long as the distance between their base and that of the enemy fighter is equal to or less than the distance shown for the Versatile weapon’s Long range characteristic. For example, a fighter armed with a Versatile weapon with a Long range of 2" may Engage an enemy fighter that is up to 2" away.',
                        'The enemy fighter is considered to be Engaged, but may not in turn be Engaging the fighter armed with the Versatile weapon unless they too are armed with a Versatile weapon, and so may not be able to make Reaction attacks.',
                        'At all other times other than during this fighter’s activation, Versatile has no effect.'
    ],
    'web'           : [
                        'If the wound roll for a Web attack is successful, no wound is inflicted, and no save roll or Injury roll is made. Instead, the target automatically becomes Webbed. Treat the fighter as if they were Seriously Injured and roll for Recovery for them during the End phase (Web contains a powerful sedative capable of rendering the strongest fighter unconscious). If a Flesh Wound result is rolled during Recovery, apply the result to the fighter as usual and remove the Webbed condition. If a Serious Injury is rolled, the fighter remains Webbed. If an Out of Action result is rolled, the fighter succumbs to the powerful sedative and is removed from play, automatically suffering a result of 12-26 (Out Cold) on the Lasting Injuries table.',
                        'A fighter that is Webbed at the end of the game does not succumb to their Injuries and will automatically recover. However, during the Wrap Up, when rolling to determine if any enemy fighters are Captured at the end of the game, add +1 to the dice roll for each enemy fighter currently Webbed and include them among any eligible to be Captured.' 
    ]
};

module.exports = {
    name: 'traits',
    description: [
        'Provides more information about the weapon traits.',
        buildlist('List of currently-loaded traits:', Object.keys(traitArray)),
    ],
    usage: [
        'traits {trait}'
    ],
    aliases: [
        'trait'
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