const common = require('./common.js');

const mutationArray = {
    'values': [
        {name:'Hint of Red Eyes',
        page:'288'},
       {name:'Voice of the Aurelian',
        page:'288'},
       {name:'Living Shadow',
        page:'288'},
       {name:'Gossamer Flesh',
        page:'288'},
       {name:'Visions',
        page:'289'},
       {name:'Echos',
        page:'289'},
       {name:'Blighted Soul',
        page:'289'},
       {name:'Wyrdling',
        page:'290'},
       {name:'Misshapen',
        page:'290'},
       {name:'Grotesque',
        page:'290'},
       {name:'Bestial Hide',
        page:'290'},
       {name:'Brute',
        page:'290'},
       {name:'Horns, Spines, Fangs, or Claws',
        page:'290'},
       {name:'Corrosive Miasma',
        page:'291'},
       {name:'Toxic Blood',
        page:'291'},
       {name:'Extra Appendages',
        page:'291'},
       {name:'Aberration',
        page:'292'},
       {name:'Corrupted Flesh',
        page:'292'},
       {name:'Wings',
        page:'293'},
       {name:'Serpentine Body',
        page:'293'},
       {name:'Cannibalistic Drive',
        page:'293'},
       {name:'Withered',
        page:'293'},
       {name:'Vile Alacrity',
        page:'293'},
       {name:'Fleshmetal',
        page:'293'},
       {name:'Corrosive Bile',
        page:'294'},
       {name:'Corpulent',
        page:'294'},
       {name:'An Excess of Eyes',
        page:'294'},
       {name:'Enduring Life',
        page:'294'},
       {name:'Aquatic',
        page:'294'},
       {name:'Amorphous',
        page:'295'},
       {name:'Afflicted',
        page:'295'},
       {name:'The Warp Made Manifest',
        page:'295'}
    ],
    'matrix': {
        1: {
            'type': 'Subtle',
            1: [0, 0, 0, 0, 0, 0],
            2: [1, 1, 1, 1, 1, 1],
            3: [2, 2, 2, 3, 3, 3],
            4: [4, 4, 4, 5, 5, 5],
            5: [6, 6, 6, 7, 7, 7]
        },
        2: {
            'type': 'Minor',
            1: [8, 8, 8, 8, 8, 8],
            2: [9, 9, 9, 9, 9, 9],
            3: [10, 10, 10, 11, 11, 11],
            4: [11, 11, 11, 12, 12, 12],
            5: [13, 13, 13, 14, 14, 14]
        },
        3: {
            'type': 'Severe',
            1: [15, 15, 16, 16, 17, 17],
            2: [18, 18, 19, 19, 20, 20],
            3: [21, 21, 22, 22, 23, 23],
            4: [24, 24, 25, 25, 26, 26],
            5: [27, 27, 28, 28, 29, 29],
            6: [30, 30, 30, 31, 31, 31]
        }
    }
}

const mutation = function mutation(context) {
    const mutations = parseInt(context); //The number of previous mutations a character had. Each add +10 (essentially +1 to rollOne).
    const mutationAdd = (isNaN(mutations)) ? 0 : mutations;
    severity = common.dice(3);
    //Start rolling on the tables. If rollOne+mutationAdd is >6 and severity is <3, increase the table severity and reroll.
    do{
        reroll=false;
        mutationRollOne = common.dice(6); 
        mutationCheck = mutationRollOne+mutationAdd;			
        if(mutationCheck>=6&&severity<3){severity++;reroll=true;}
    }while(reroll==true);
    if(mutationCheck>6){mutationCheck=6;}
    //We can now roll the second d6. It wasn't necessary for the previous loop, so rather than rerolling it we saved it for when we were on the right table/rollOne combo.
    const mutationRollTwo = common.dice(6);
    const mutationIndex = mutationArray['matrix'][severity][mutationCheck][mutationRollTwo-1];
    const mutationOutput = [
        '[**'+mutationArray['matrix'][severity]['type']+' Mutation**] ('+mutationCheck.toString()+mutationRollTwo.toString()+')',
        mutationArray['values'][mutationIndex]['name'],
        '*See page '+mutationArray['values'][mutationIndex]['page']+' in the rulebook.*'
    ]
    
    return mutationOutput.join('\r');
}

module.exports = mutation;