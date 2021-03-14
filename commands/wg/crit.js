const {dice} = require('./../../common.js');

//Build an array of critical hit results. Also include a matrix to identify the crit index with a d66 roll.
const critArray = {
    values: [
        {name: 'Headshot',
         description: 'A well-aimed shot tears ragged chunks of bone and brain from the opponent\'s skull. The foe reels from such a violent strike, unable to focus.',
         effect: 'Target suffers +1d3 Wounds and is Staggered.',
         glory: '+1 Wound for every Glory you spend.'
        },
        {name: 'Brutal Rupture',
         description: 'Mangled flesh, crushed bone, and ruptured organs make your foe gasp in wretched pain.',
         effect: 'Target suffers +1d3 Wounds and is Hindered (1).',
         glory: '+1 Wound for every Glory you spend.'
        },	
        {name: 'Ferocious Rending',
         description: 'The attack shreds the opponent\'s flesh to ribbons, leaving them open to attack.',
         effect: 'Target suffers +1d3 Wounds and is Vulnerable (2).',
         glory: '+1 Wound for every Glory you spend.'
        },
        {name: 'Merciless Strike',
         description: 'A blow to the foe\'s body steals the breath from their lungs, pulverising their innards with a nasty crunch.',
         effect: 'Target suffers a Mortal Wound.',
         glory: '+1 Mortal Wound for every Glory you spend.'
        },	
        {name: 'Vicious Vivisection',
         description: 'The fury of this blow causes horrific pain, dissecting pieces of the foe\'s body in a scene of carnage and woe.',
         effect: 'Target suffers +1d3 Mortal Wounds.',
         glory: '+1 Mortal Wound for every Glory you spend.'
        },	
        {name: 'Savage Attack',
         description: 'The assault leaves the opponent a mangled mess, slashing, burning, breaking or ripping into them with violent force.',
         effect: 'Target suffers one Mortal Wound. If the target survives, they immediately acquire a Memorable Injury.',
         glory: '+1 Mortal Wound for every Glory you spend.'
        },	
        {name: 'Visceral Blow',
         description: 'Crimson showers the ground. The battlefield is a gory spectacle of spilled blood and unsure footing.',
         effect: 'Target suffers one Mortal Wound. Each character Engaged with the target must pass an Agility Test (DN 3) or fall Prone.',
         glory: 'For every Glory you spend the target suffers +1 Mortal Wound and you may choose one of the following additional effects: "The target is Prone." or "The target suffers 2 Shock.".'
        },	
        {name: 'Murderous Onslaught',
         description: 'A thunderous blow sends the target sprawling. Shattered ribs pierce organs, jets of blood spew from the wound, and the foe lies writhing in pain.',
         effect: 'Target suffers 1d3 + 1 Mortal Wounds and is knocked Prone.',
         glory: '+1 Wound for every Glory you spend.'
        },	
        {name: 'Overpowering Assault',
         description: 'A stunning blow sends the foe lurching away, senses blurred by the brutal impact.',
         effect: 'Target suffers 1d6 Shock and is Staggered.',
         glory: '+2 Shock for every Glory you spend.'
        },	
        {name: 'Crimson Ash',
         description: 'The attack sears into the foe, fusing flesh into a charred ruin. The assault wreathes the target in burning fury, making a smouldering mess of sinew and bone.',
         effect: 'Target suffers 1d3+1 Wounds and is On Fire.',
         glory: '+1 Wound for every Glory you spend.'
        },	
        {name: 'Bone-shattering Impact',
         description: 'A crippling blow smashes the foe\'s body, reducing arms, legs, and ribs to fractured splinters.',
         effect: 'Target suffers 1d3+1 Wounds.',
         glory: 'The target is Restrained and takes +1 Wound for every Glory you spend.'
        },	
        {name: 'Unspeakable Carnage',
         description: 'A truly grievous strike, the attack is a terrifying display of martial prowess. A geyser of gore erupts from the foe\'s wound and ragged remnants of their body strewn are across the battlefield.',
         effect: 'Target suffers 1d3+3 Mortal Wounds.',
         glory: '+1 Mortal Wound for every Glory you spend.'
        },	
        {name: 'Appalling Detonation',
         description: 'Ill fortune causes the blow to strike the foe\'s volatile Wargear. A chain of explosions tears their body apart into grisly red mist.',
         effect: 'Target suffers 1d6 Wounds. If the target carried any explosives (such as grenades or ammunition), they detonate, inflicting 1d3 Mortal Wounds.',
         glory: 'For every point of Glory you spend, you can choose one of the following effects: "Affect an additional target within 10 metres." or "All targets suffer +1 Wound."'
        },	
        {name: 'Grisly Amputation',
         description: 'The foe\'s limb is removed with extreme prejudice, leaving their body in a crimson arc.',
         effect: 'Target suffers one Mortal Wound and one limb is destroyed. Roll 1d6. On an even result, the activating player may choose the limb. On an odd result, the GM chooses.',
         glory: '+1 Mortal Wound for every Glory you spend.'
        }		
    ],
    matrix: {
        1: [0, 0, 0, 0, 0, 0],
        2: [1, 1, 1, 2, 2, 2],
        3: [3, 3, 3, 4, 4, 4],
        4: [4, 4, 4, 5, 5, 6],
        5: [7, 7, 7, 8, 8, 9],
        6: [10, 10, 10, 11, 11, 12]
    }
};    

module.exports = {
    name: 'crit',
    description: [
        'Critical Hits command. Gives the name, description, effect, and glory effect for the crit that gets randomly selected.'
    ],
    usage: [
        'crit'
    ],
    execute(){
        const critRollOne = dice(6);
        const critRollTwo = dice(6);
        const critRollString = critRollOne.toString()+critRollTwo.toString();
        const critIndex = critArray['matrix'][critRollOne][critRollTwo-1];
    
        critOutput = [
            'Critical Hit ('+critRollString+'): ',
            '[**'+critArray['values'][critIndex]['name']+'**]',
            '*'+  critArray['values'][critIndex]['description']+'*',
            '[**Effect**]: '+critArray['values'][critIndex]['effect'],
            '[**Glory**]: '+critArray['values'][critIndex]['glory']
        ];
        return critOutput.join('\n');
    },
};