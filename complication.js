//Array of Complications, split between "Combat" and "Other" (which were listed on two separate pages).
const complicationArray = {
	combat: {
		values: [
		    {name:'Out of Ammo',
		     desc:'Must Reload to use again'},
		    {name:'Weapon Jam',
		     desc:'DN2 Tech (Int) Test to use again'},
		    {name:'Dropped Weapon',
		     desc:'Simple Action to recover weapon'},
		    {name:'Weapon Malfunction',
		     desc:'DN4 Tech (Int) Test to use again'},
		    {name:'Weapon Stuck',
		     desc:'DN3 Strength Test to recover weapon'},
		    {name:'Dropped Item',
		     desc:'Drop an item of Wargear'},
		    {name:'Falling Prone',
		     desc:'You\'re Prone'},
		    {name:'Restrained',
		     desc:'You\'re Restrained. DN4 Strength Test to recover'},
		    {name:'Blinded',
		     desc:'You\'re Blinded for 1 Round'},
		    {name:'Inconvenient Target',
		     desc:'GM picks a new target for your attack'}
	    	],
		matrix: {
			1: [0, 0, 0, 0, 0, 0],
			2: [0, 0, 0, 0, 0, 0],
			3: [1, 1, 1, 2, 2, 2],
			4: [3, 3, 3, 4, 4, 4],
			5: [5, 5, 5, 6, 6, 6],
			6: [7, 7, 8, 8, 9, 9] 
		}
    	},	
	other: {
		values: [
		    {name:'Lost Item',
		     desc:'You lose some of your Wargear. This could be something important, like your weapon, or something as small as a point of Ammo. The loss might be temporary or permanent.'},
		    {name:'Physical Mishap',
		     desc:'You\'re clumsy or tongue tied; you do or say something you didn\'t mean to, causing a problem.'},
		    {name:'Past Problems',
		     desc:'Something from your past comes back to haunt you. An old wound flares up in pain or you\'re distracted by a memory.'},
		    {name:'Machine Spirit',
		     desc:'Some technology in the scene malfunctions. This could be something you own, something you\'re interacting with, or something in the environment — a stray Servo-skull or a Cherub could interrupt whatever you\'re doing.'},
		    {name:'Harsh Environment',
		     desc:'The environment changes. Masonry collapses, revealing another path or a potential foe. The terrain becomes difficult, flooded, or visibility lowers.'},
		    {name:'Warp Interference',
		    desc:'The Chaos Gods are watching. For a moment, you feel the eyes of one of the Ruinous Powers on you; they frighten you, learn one of your secrets, or cause a supernatural mishap.'}
		],		
        	matrix: {
			1: [0, 0, 0, 0, 0, 0],
			2: [1, 1, 1, 1, 1, 1],
			3: [2, 2, 2, 2, 2, 2],
			4: [3, 3, 3, 3, 3, 3],
			5: [4, 4, 4, 4, 4, 4],
			6: [5, 5, 5, 5, 5, 5] 
		}	
    	}
};

const complication = function complication(context) {
	const complicationType = utils.identify(context.trim());		
	const compTable = (complicationType == 'combat') ? 'combat' : 'other';
	const compRollOne = dice(6);
	const compRollTwo = dice(6);
	const compIndex = complicationArray[compTable]['matrix'][compRollOne][compRollTwo-1];
	const output = [];
	output.push(': Complication ('+compRollOne.toString()+compRollTwo.toString()+') : ');
	output.push('[**'+complicationArray[compTable]['values'][compIndex]['name']+'**]');
	output.push('*'+complicationArray[compTable]['values'][compIndex]['desc']+'*');
    	return output.join('\r');
}