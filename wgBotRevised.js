const Discord = require('discord.js');
const config = require('./auth.json');
const bot = new Discord.Client();

bot.login(config.token);
const roll = require('./roll.js');
//Declare the Arrays that are used by the Bot.
//Array of Complications, split between "Combat" and "Other" (which were listed on two separate pages).
complicationArray = {
	combat: [
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
	other: [
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
		desc:'The Chaos Gods are watching. For a moment, you feel the eyes of one of the Ruinous Powers on you; they frighten you, learn one of your secrets, or cause a supernatural mishap.'},
	]
};
//complicationMatrix's values are the index numbers in complicationArray['combat'] for the results of the dice rolls.
complicationMatrix = {
	1: [0, 0, 0, 0, 0, 0],
	2: [0, 0, 0, 0, 0, 0],
	3: [1, 1, 1, 2, 2, 2],
	4: [3, 3, 3, 4, 4, 4],
	5: [5, 5, 5, 6, 6, 6],
	6: [7, 7, 8, 8, 9, 9]
}

conditionArray = {
	'bleeding'	: '\rYou\'re bleeding, afflicted with a grievous wound that is difficult to treat. You suffer one Mortal Wound at the end of your Turn. Bleeding can be stopped with a successful Toughness Test (DN 4), or if another character aids you with the Medicae Skill. You can attempt to use Medicae on yourself but do so at +1DN.',
	'blinded'	: '\rYou\'re unable to see properly. Increase the DN for any sight-related task (including all combat Tests) by 4, replacing any lesser vision penalties. \r\rAt the GM\'s discretion you may use a Combat Action to remove the Blinded condition, using a narratively appropriate Skill.',
	'exhausted'	: '\rYou are weary from battle or persistent effort and suffer from fatigue. On your Turn, you can only Walk or Crawl, perform a basic Combat Action (attack with no combat options, such as Aim or Multi-Attack), or Fall Back. Additionally, you may not roll Determination. Any Shock suffered by an Exhausted character is immediately converted into Mortal Wounds. \r\rCertain circumstances directly inflict Exhaustion. You are automatically Exhausted if your Shock increases beyond your Maximum Shock. Certain weapons, psychic powers, or Ruin Actions can also cause you to become Exhausted even while you are below your Maximum Shock. \r\rIf you are Exhausted from a source other than exceeding your Maximum Shock, that effect determines how you remove the Exhausted condition. Otherwise, the Exhausted condition is removed whenever you recover Shock.',
	'fear'		: '\rYou\'re scared. Whatever is causing your Fear might also make you anxious, or trigger physical reactions like rapid breathing, shaking, and a lack of focus. \r\rWhen you encounter something that causes Fear, you roll your Resolve against a DN dictated by the source of Fear. Success allows you to act normally. If you fail, you suffer +2DN to all Tests. The penalty lasts until the end of the scene or until an ally passes a Leadership (Fel) Test of DN 2 + the source\'s Fear value. \r\rA being that causes Fear is immune to Fear and Intimidation Interaction Attacks.',
	'frenzied'	: '\rWhether whipped into a zealous fury or auto injecting Frenzon combat stims, you\'re Frenzied. You lose all sense of self-preservation and throw yourself into the thick of combat. \r\rWhen you become Frenzied, you may choose to embrace the frenzy or attempt to resist it. If you choose to resist, at the start of your Turn make a DN 3 Willpower Test. If you pass, the rage subsides and you resist the frenzy. \r\rIf the effect is triggered, embraced, or otherwise not resisted, you are Frenzied and must try to get into close combat as quickly as possible, charging the nearest visible enemy. If you are in cover, you break cover and move towards the nearest enemy. \r\rWhile Frenzied, you are immune to Fear and cannot be Pinned and must always use the All-Out Attack option, if possible. You gain +1 to your Strength Attribute While Frenzied.',
	'hindered'	: '\rSomething\'s holding you back. While Hindered increase the DN for all Tests by +1, or higher if the rules of whatever is hindering you say so. Hindered lasts for one Round, unless otherwise stated.',
	'on fire'	: '\rYou\'re on fire! You take 1d3 Mortal Wounds at the start of each of your Turns. After taking the Mortal Wound, you must pass a DN 3 Willpower Test or be Hindered until the end of the Round. More information can be found on p.201.',
	'pinned'	: '\rYou\'re under heavy fire, and there\'s a chance your Resolve breaks under the pressure. If you are targeted with a Pinning Attack attack, you may be Pinned. \r\rTo see if you are Pinned, make a Resolve Test with a DN equal to the Salvo value of the weapon, and add +1 DN for each additional enemy targeting you with a Pinning Attack (a Mob counts as a single attacker). If you fail, you lose your Movement and either hunker down behind existing cover or use your Movement to move towards the nearest cover on your next Turn. \r\rWhile Pinned, you can\'t Charge or leave cover. You suffer a +2 DN penalty to Ballistic Skill (A) Tests against the enemies using Pinning Attack While you are Pinned. \r\rAn ally may attempt to rally their comrades on their Turn by making a Leadership (Fel) Test with the same DN as the Resolve Test, adding an extra +1DN if a Pinned character has taken any damage during the combat. If the Test is successful, the character successfully rallies any Pinned allies within 5 metres, ending the effect.',
	'poisoned'	: '\rYou\'ve been inflicted with one of the galaxy\'s countless pathogens, plagues, or viruses. You could be suffering from neurotoxins injected into your system, alien acid splashed on you, or Nurgle\'s contagions. All of these dangers leave you Poisoned. \r\rYou suffer a +2 DN penalty to all Tests while Poisoned. Some poisons also inflict damage based on the poison. Some poisons may affect your ability to function instead of, or in addition to, causing damage. The Poisoned condition ends when you are treated using the Medicae Skill or you succeed on a Toughness Test (DN based on the poison) at the beginning of your Turn.',
	'prone'		: '\rYou\'re knocked down on the ground. Your Defence is reduced by 2 against any attack made by a Threat within 5 metres of you. Your Defence is increased by 1 when you\'re attacked from 6 or more metres away. If you become Prone while flying, you fall to the ground and suffer falling damage (p.201). \r\rStanding up when Prone is a Free Action on your Turn. If you stand up in this way, you can only use the Standard Movement option; you can\'t use combat options such as Brace or Aim. An adjacent character may use their Movement to help you stand up immediately when you\'re Prone.',
	'restrained': '\rYou\'re bound, possibly by some form of entangling attack such as an Genestealer Cultist Webber, a Barbed Strangler, or a good old-fashioned net. While Restrained you lose your Movement action for that Turn and your Defence is reduced by 2.',
	'staggered'	: '\rYou\'re off balance; you\'ve run too fast over rough terrain, ordnance has impacted nearby, or you\'ve been clipped by a stray bullet. \r\rWhen you move While Staggered, your Speed is reduced by half. You can\'t Run or Sprint unless otherwise stated. The Staggered condition ends at the beginning of the next Round.',
	'terror'	: '\rYou\'re overcome with a sense of intense dread and rational thought becomes impossible: this is allconsuming Terror. \r\rMake a Resolve Test against the DN of the source of Terror. If you pass, you may act normally on your Turn. If you fail, you suffer all of the effects of Fear, and you must use every action available on each of your Turns to move as far away as possible until you no longer have line of sight to the source of Terror. Terror lasts until the end of the scene or until an ally passes a Leadership (Fel) Test of DN 2 + the Terror value. \r\rAny effect that grants a bonus to Fear Tests also applies to Terror Tests. Any effect that grants immunity to Fear grants one extra Icon on your Resolve Test against Terror. A being that causes Terror is immune to Fear, Terror, and Intimidation Interaction Attacks.',
	'vulnerable': '\rYour defences are open! While Vulnerable, you suffer −1 to your Defence. Certain abilities and effects increase this penalty. Being Vulnerable lasts until the end of your next Turn.'
};

//Listen to messages for potential commands.
bot.on('message', msg=> {

	
	//Functions for the functions! Now, by my knowledge of scoping putting these outside of the bot.on statement should be fine...but for some reason putting them outside of the call doesn't work.
	//My preference would be to only have the if(msg.content.startsWith) SWITCH CASE statement in here (because that's the only real decision that needs to be made, everything else should theoretically
	//just be available on call).
	function badCall(funcName){
		output = ': Please see !wghelp '+funcName+' for instructions on how to use the !wg'+funcName+' command.';
		return output;
	}
	
	function dice(potential){
		output = Math.ceil(Math.random() * potential);
		return output;
	}

	function report(funcResult){
		msg.channel.send(msg.author+' ('+msg.content+') '+funcResult);
		return;
	}
	
	if(msg.content.startsWith('!wg')){
		//Gather everything after the ! but excluding any spaces. All commands can be expected to be !{command} {extra info for command}. Will sanitize the context in each function.
		var msgCommand = msg.content.substring(3).split(' ')[0].toLowerCase();
		var msgContext = msg.content.substring(msgCommand.length+4).toLowerCase();
		
		//Check to see what the command was. If it's an existing command, run that command and report back the result. Otherwise, run a basic help command with no context.
		switch (msgCommand){
			case 'roll':
				report(roll(msgContext));
				break;
			case 'complication':
				report(complication(msgContext));
				break;
			case 'condition':
				report(condition(msgContext));
				break;
			case 'crit':
				report(crit());
				break;
			case 'injury':
				report(injury(msgContext));
				break;	
			case 'mutation':
				report(mutation(msgContext));
				break;				
			case 'objective':
				report(objective(msgContext));
				break;
			case 'perils':
				report(perils(msgContext));
				break;	
			case 'trinket':
				report(trinket());
				break;				
			case 'help':
				report(wghelp(msgContext));
				break;		
			default:
				report(wghelp(''));
				break;
		}
	}

	//Functions for the Bot.
/* Commented out the Tim Roll Function for the Ryan Roll Function (included in the const at the top). Going to go over, potentially delete this as necessary.	
	function roll(context){
		//The standard pool of Icon results.
		var pool = [0,0,0,1,1,2];
		if(context.includes('ed')){
			//Calculating Extra Damage.
			var diceString = context.split('ed');
			var rollDice = parseInt(diceString[0]);
			var damage = 0;
			if(isNaN(rollDice)){return(badCall('roll'));}
			if(diceString[1].trim() == 'brutal'){pool = [0, 0, 1, 1, 2, 2];}
			rollList = new Array();
			for (var i = 0; i < rollDice; i++){
				roll = dice(6);
				rollList.push(roll);
				damage += pool[roll-1];
			}
			output = ': You deal **'+damage+'** additional damage!\r[Extra Dice] *'+rollList+'*';			
		} else if(context.trim() == 'd6'){
			//Rolling a d6.
			roll = dice(6);
			output = ': Roll [d6]`: You rolled a (**' + roll + '**)!';
		} else if(context.trim() == 'd3'){
			//Rolling a d3.
			roll = dice(3);
			output = ': Roll [d3]`: You rolled a (**' + roll + '**)!';	
		} else if(context.trim() == 'd66'){
			//Rolling a d66.
			roll = parseInt(dice(6).toString()+dice(6).toString());
			output=': Roll [d66]`: You rolled a (**' + roll + '**)!';		
		} else if(!isNaN(parseInt(context))) {
			//Okay, it's a number. It could either be a regular roll (!roll 5) or with additional wrath (!roll 5w2).
			var diceString = context.split('w');
			diceString[0] = parseInt(diceString[0]);	
			//Check to see if there's wrath die specified. If there isn't, add 1, if there is, turn it into an integer.
			if(diceString.length == 1){diceString.push(1);}else{diceString[1] = parseInt(diceString[1]);}
			//Check diceString[0] and diceString[1] to make sure they're numbers.
			if(isNaN(diceString[0])||isNaN(diceString[1])){badCall('roll');return;}
			//Make sure that it hasn't been asked to roll more wrath dice than were in the pool (and offset the pool accordingly if not)
			var regRoll = diceString[0]-diceString[1];
			if(regRoll < 0){return(badCall('roll'));}
			//Okay, time to make rolls.
			iconCount = 0;
			exaltedIconCount = 0;
			perilsCount = 0;		
			complication = false;
			glory = false;
			rollList = new Array();
			wrathList = new Array();			
			//Roll regular pool.
			for (var i = 0; i < regRoll; i++){
				roll = dice(6);
				rollList.push(roll);
				iconCount += pool[roll-1];
				if(roll == 6){exaltedIconCount++;}
			}
			//Roll Wrath pool.
			for (var i = 0; i < diceString[1]; i++){
				roll = dice(6);
				wrathList.push(roll);
				iconCount += pool[roll-1];
				if(roll == 6){exaltedIconCount++; glory = true;}
				if(roll == 1){perilsCount++; complication = true;}
			}		
			output = ': Roll ['+context+']: You obtain (**'+iconCount+'**) Icons!'+'\r[Standard] *'+rollList+'*  [Wrath] *'+wrathList+'*  [Exalted Icons] '+exaltedIconCount+'  [Perils] '+perilsCount;
			if(glory == true){output+='*\rYou bring* __**Glory**__ *to your team!!*';}
			if(complication == true){output+='\r*You experience a* __**Complication**__*!!*';}
		} else {return(badCall('roll'));}
		return output;
	}
*/	

	function complication(context) {
		/*Roll on complication tables. There are two different tables: Regular and Combat. Combat uses a d66, while regular uses d6.
		  The potential results are stored in complicationArray, while the methods of finding the correct index are different.
		  The d6 is just d6-1 (because array), while I'm using a matrix(?) for d66 table lookups. Basically it's two d6 rolls, one in 
		  the tens (d6a) and the other in the ones (d6b), so a roll of 33 would be looked up in complicationMatrix[3][3-1], with a value of 1.
		  In my eyes this is cleaner than a series of IF THEN ELSEIF statements that check the roll against a range of potential numbers, 
		  though it does mean that any updates to the combat array need to be careful (because the order of items in the array are significant.*/
		if(context.trim() == 'combat'){
			table = 'combat';
			rollOne = dice(6);
			rollTwo = dice(6);
			rolld = rollOne.toString()+rollTwo.toString();
			entry = complicationMatrix[rollOne][rollTwo-1];			
		} else {
			//Just a regular complication roll.
			table = 'other';
			rolld = dice(6);
			entry = rolld-1;
		}	
		output = ': Complication ('+rolld+') : [**'+complicationArray[table][entry]['name']+'**] \r*'+complicationArray[table][entry]['desc']+'*';
		return output;
	}

	function condition(context){
	//This function provides information about the conditions listed.
		if(context.trim() in conditionArray){output = ': [**'+context.trim().toUpperCase()+'**]'+conditionArray[context.trim()];return(output);}else{return(badCall('condition'));}
	}

	function crit(){
		effectMatrix = {
			1: [0, 0, 0, 0, 0, 0],
			2: [1, 1, 1, 2, 2, 2],
			3: [3, 3, 3, 4, 4, 4],
			4: [4, 4, 4, 5, 5, 6],
			5: [7, 7, 7, 8, 8, 9],
			6: [10, 10, 10, 11, 11, 12]
		}
		effectList = [
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
		];
		
		rollOne = dice(6);
		rollTwo = dice(6);
		rolld = dice(6).toString()+dice(6).toString();
		index = effectMatrix[rollOne][rollTwo-1];
		output = ': `Critical Hit ('+rolld+'): '+
				 '\r[**'+effectList[index]['name']+'**]'+
				 '\r*'+effectList[index]['description']+'*'+
				 '\r[Effect]: '+effectList[index]['effect']+
				 '\r[Glory]: '+effectList[index]['glory'];
		return output;
	}

	function injury(context) {
		rolld = dice(6);
		if(context.trim() == 'traumatic'){
			//Check for side. TECHNICALLY 1-3 is left and 4-6 is right, but come on now. At least we're giving it 6 options, and it's still a 50% shot.
			if(dice(6)%2==0){side='left';}else{side='right';}
			injuryArray = [
				{injury: 'Hand',
				 effect: 'You suffer a severe hand injury. You can no longer use your '+side+' hand. If you have now lost both hands you are unable to hold any weapons or similar gear.'},
				{injury: 'Arm',
				 effect: 'You suffer a severe arm injury. You can no longer use your '+side+' arm. If you have now lost both arms you are unable to hold any weapons or similar gear.'},
				{injury: 'Foot',
				 effect: 'You suffer a severe foot injury. You can no longer use your '+side+' foot. If you have now lost both feet, you are unable to walk, run, or sprint, and may only crawl (pg. 180).'},
				{injury: 'Leg',
				 effect: 'You suffer a severe leg injury. You can no longer use your '+side+' leg. If you have now lost both legs, you are unable to walk, run, or sprint, and may only crawl (pg. 180).'},
				{injury: 'Torso',
				 effect: 'You suffer a severe injury that impairs your organs, like the heart, lungs, or liver. Any Toughness based Tests may become more difficult.'},
				{injury: 'Eye',
				 effect: 'Your '+side+' eye is damaged beyond repair. A single injured eye may add a penalty, such as +2DN, to any tests that require sight. If you have now lost both eyes, you are blinded (pg. 199).'}			 
			]
			output = ': Traumatic Injury ('+rolld+'):\r[**Result:**] '+injuryArray[rolld-1]['injury']+'\r[**Effect**] '+injuryArray[rolld-1]['effect'];
		}else{
			//Just a regular old injury.
			injuryMatrix = [0,0,1,2,3,4];
			injuryArray = [
				{injury: 'Battle Scar',
				 escalation: 'Missing Fingers'},
				{injury: 'Focused Burn',
				 escalation: 'Severe Burn'},
				{injury: 'Broken Jaw',
				 escalation: 'Cut Tongue'},
				{injury: 'Twitch',
				 escalation: 'Bad Knee'},
				{injury: 'Torn Ear',
				 escalation: 'Nagging Wound'}		 
			];
			output = ': Memorable Injury ('+rolld+') :\r[**Result:**] '+injuryArray[injuryMatrix[rolld-1]]['injury']+'\r[**Escalation**] '+injuryArray[injuryMatrix[rolld-1]]['escalation'];
		}
		return output;
	}

	function mutation(context) {
		mutations = parseInt(context); //The number of previous mutations a character had. Each add +10 (essentially +1 to rollOne).
		if(isNaN(mutations)){mutationAdd = 0;}else{mutationAdd = mutations;}

		mutationMatrix = {
			1: {
				1: [0, 0, 0, 0, 0, 0],
				2: [1, 1, 1, 1, 1, 1],
				3: [2, 2, 2, 3, 3, 3],
				4: [4, 4, 4, 5, 5, 5],
				5: [6, 6, 6, 7, 7, 7]
			},
			2: {
				1: [8, 8, 8, 8, 8, 8],
				2: [9, 9, 9, 9, 9, 9],
				3: [10, 10, 10, 11, 11, 11],
				4: [11, 11, 11, 12, 12, 12],
				5: [13, 13, 13, 14, 14, 14]
			},
			3: {
				1: [15, 15, 16, 16, 17, 17],
				2: [18, 18, 19, 19, 20, 20],
				3: [21, 21, 22, 22, 23, 23],
				4: [24, 24, 25, 25, 26, 26],
				5: [27, 27, 28, 28, 29, 29],
				6: [30, 30, 30, 31, 31, 31]
			}		
		}
		
		mutationArray = [
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
		];
		
		mutationType = ['Subtle', 'Minor', 'Severe'];
		severity = dice(3);
		//Start rolling on the tables. If rollOne+mutationAdd is >6 and severity is <3, increase the table severity and reroll.
		do{
			reroll=false;
			rollOne = dice(6); 
			mutationCheck = rollOne+mutationAdd;			
			if(mutationCheck>=6&&severity<3){severity++;reroll=true;}
		}while(reroll==true);
		if(mutationCheck>6){mutationCheck=6;}
		//We can now roll the second d6. It wasn't necessary for the previous loop, so rather than rerolling it we saved it for when we were on the right table/rollOne combo.
		rollTwo = dice(6);
		index = mutationMatrix[severity][mutationCheck][rollTwo-1];
		output = ': (**'+mutationType[severity-1]+' Mutation**) ('+mutationCheck.toString()+rollTwo.toString()+'): '+
				 '\r'+mutationArray[index]['name']+' - *See page '+mutationArray[index]['page']+' in the rulebook.*';
		return output;
	}

	function objective(context) {
		objectives = {
			'sororitas':[
				'Exult the rewards of sacrifice in the Emperor\'s name.',
				'Invoke an Imperial Saint (such as Alicia Dominica or Celestine) to bless your achievements.',
				'Recant a holy litany applicable to the current situation.',
				'Fill your lungs with a bolstering hymn in a time of stress.',
				'Recall a wise stricture your Drill Abess laid down and its application to the current situation.',
				'Purge a heretical item (or individual) with holy flame.'
			],
			'telepathica':[
				'Utilise your feared reputation in a social situation.',
				'Extoll the virtues of your training in honing your already considerable willpower.',
				'Express gratitude for the Emperor\'s guiding hand, protecting you from the Warp.',
				'Pass judgement on an individual you have never met through knowledge from "warp-sight".',
				'Dismiss the potential extent of psychic powers as being rumour or propaganda.',
				'Appraise another individual for psychic potential.'		
			],
			'mechanicus':[
				'Commune with a Machine Spirit.',
				'Calculate the odds of any given task and provide an estimate of survival or success.',
				'Reminisce about a Forge World you have visited and compare it to your current location.',
				'Examine an interesting piece of technology, determining a flaw or potential improvement.',
				'Give praise to the Omnissiah for some small miracle.',
				'Extoll the virtues of augmetics over the weakness of the flesh.'		
			],	
			'ministorum':[
				'Utilise blind faith to achieve your goals.',
				'Emphasise the power of faithful deeds over words.',
				'Recant a holy litany applicable to the current situation.',
				'Fill your lungs with a bolstering hymn in a time of stress.',
				'Chastise an individual for their lack of faith.',
				'Convert a non-believer to the truth of the Imperial Cult'		
			],	
			'militarum':[
				'Express confidence (or the opposite) in the virtue of overwhelming numbers and firepower.',
				'Apply a lesson from the Imperial Infantryman\'s Uplifting Primer to the current situation.',
				'Recant a holy litany applicable to the current situation.',
				'Compare the protection given by faith in the Emperor to a piece of armour or cover.',
				'Cite the logistical use of hatred for the enemy.',
				'Obey an order without question or doubt.'		
			],	
			'inquisition':[
				'Complete a social interaction without revealing your identity.',
				'Demonstrate the superiority of the philosophy of your Ordo.',
				'Gauge the approximate interrogative breaking point for an individual.',
				'Postulate on the weakness of the mutant, the alien, or the renegade.',
				'Cleanse the filth of the enemy with holy flame.',
				'Establish your authority using a symbol of office.'		
			],	
			'rogue':[
				'Make a profit in coin, connections, or information.',
				'Use your proud dynastic lineage — real or fabricated — to seal a deal.',
				'Spend some time admiring your ship and reminiscing on journeys through the void.',
				'Compare your current environment to a strange world beyond the frontier you have visited.',
				'Recant an experience you had with a xenos species that applies to the current situation.',
				'Use your Warrant of Trade to get your way or refuse a request.'		
			],	
			'scum':[
				'Apply your experience in a crime to the current situation.',
				'Verbally estimate the black market value of an item or person.',
				'Recount a desperate act of survival you once made.',
				'Use some gang slang — invented or real.',
				'Explain how a common object has an alternative use — probably as a weapon.',
				'Decry the violence and villainy of authority.'		
			],	
			'astartes':[
				'Dedicate a victory in combat to the Primarch (or if unknown, honour) of your Chapter.',
				'Apply the wisdom of the Codex Astartes to a situation.',
				'Clarify your duty — or lack thereof — in the current circumstances.',
				'Speak a motto or saying of your Chapter.',
				'Practice one of the traditions or rituals of your Chapter.',
				'Ruminate on the divide between Astartes and mortals.'		
			],		
			'aeldari':[
				'Unfavourably compare another Species\' culture, art, or technology to your own.',
				'Devote an accomplishment or victory to an Aeldari God.',
				'Recount a lesson from the traditions of a Craftworld that applies to the current situation.',
				'Utilise the reputation of your Species to manipulate an individual.',
				'Employ knowledge you learned from an earlier Path of your life to the current circumstances.',
				'Apply your superior intellect and sensitivity to prophecy to carry out a perfect plan.'		
			],	
			'orks':[
				'Start a fight.',
				'Solve a problem with the brutality of Gork.',
				'Demonstrate the wisdom of one of your Clans traditions.',
				'Kustomize a piece of Wargear.',
				'Solve a problem with the sage knowledge that bigger is better.',
				'Apply the kunnin\' of Mork to a situation.'		
			],	
			'chaos':[
				'Corrupt an innocent individual.',
				'Extoll the benefits (or negatives) of gaining the attention of the Chaos Gods.',
				'Pervert a religious icon, dedicating it to the Ruinous Powers.',
				'Point out a flaw in Imperial culture or philosophy that will lead to its downfall.',
				'Create confusion, incite bloodshed, pursue decadence, or spread disease.',
				'Claim an act or event is evidence of the favour (or contempt) of the Ruinous Powers.'		
			]		
		}
		if(context.trim() in objectives){
			rolld = dice(6);
			output = ': '+context.trim().charAt(0).toUpperCase()+context.trim().slice(1)+' Objective ('+rolld+') - *'+objectives[context.trim()][rolld-1]+'*';
			return output;
		} else {return(badCall('objective'));}
	}

	function perils(context) {
		/*This was the first time I worked out using a matrix-like thing to deal with d66 tables. Because the perils were consistently 2 across (11-12 gave one peril, 13-14 another, etc.)
		  I basically built the arrays with that in mind. My next runthrough will treat it like any of my other arrays and add in the missing values, just to make it (theoretically)
		  easier to add in perils as they come along (so long as they keep the d66 table. */
		perilMatrix = {
			1: [0, 1, 2],
			2: [3, 4, 5],
			3: [6, 7, 8],
			4: [9, 10, 11],
			5: [12, 13, 14],
			6: [15, 16, 17]
		}
		
		perilArray = [
			{name: 'FLICKERING LIGHTS',
			 desc: 'For a brief moment, all light sources flicker and go out.'},
			{name: 'HOARFROST',
			 desc: 'The temperature instantly drops 20 degrees, and all surfaces within 25 m of you are coated with a thin rime of frost. The temperature returns to normal over the course of a minute. The frost is treated as Difficult Terrain. Anyone who rolls a Complication whilst on the frost falls Prone.'},
			{name: 'ROILING MIST',
			 desc: 'A clammy mist roils up from the ground, surrounding you in a 25 m radius. The mist obscures vision and distorts sounds with weird echoes for 1 Round. All Tests made inside the mist that rely on sight or hearing are made at +2 DN.'},
			{name: 'WHISPERS IN THE DARK',
			 desc: 'All light sources within 25 m of you grow dim and shadows pool thickly. Sinister whispers echo, and anyone who can hear them must make a successful DN 3 Corruption Test. Any who fail the Corruption roll are Vulnerable [2] for 1 Round.'},
			{name: 'WARP SPECTRES',
			 desc: 'For roughly a minute, ethereal images of strange creatures move in and out of existence within 25 m of you. These apparitions move awkwardly, passing through objects and the living alike, seemingly unaware of the real world. All animals immediately flee the area, and any sentient being who witnesses the apparitions must make a DN 3 Fear Test.'},
			{name: 'TEARS OF THE MARTYR',
			 desc: 'All paintings, statues, or equivalent effigies within 100 m of you begin to weep blood. If no such features exist in range, then walls or similar surfaces begin to drip with blood. The bleeding persists for 1 minute. All sentient creatures that witness this event must make a DN 3 Fear Test.'},
			{name: 'SINISTER CHORUS',
			 desc: 'A sinister chorus or low laughter swirls around you and those in the vicinity. All sentient creatures within 25 m must make a successful DN 3 Willpower Test or are Hindered (1) for one Round. The GM gains 1 Ruin.'},
			{name: 'THE WATCHING',
			 desc: 'An overwhelming paranoia of something watching creeps over you and everyone within 20 m. Lesser creatures and animals cower in fear, while sentient creatures must make a successful DN 4 Willpower Test or suffer an uncontrollable compunction to second-guess all their actions — they are Hindered (2). This effect lasts for the remainder of the scene.'},
			{name: 'MIASMA OF DECAY',
			 desc: 'The stench of rotting meat and decaying flesh rises from the ground within 25 m of you. All creatures within range must make a DN 3 Toughness Test, including those protected by technological breathing apparatus. Those who fail suffer 1 Shock.'},
			{name: 'BANSHEE SCREAM',
			 desc: 'A mighty roar akin to a sonic boom crashes through the air. Lesser animal lifeforms (insects, rodents, avians, etc.) within 25 m are instantly killed. All others suffer '+dice(3)+' Shock and must make a successful DN 3 Toughness Test or are Staggered.'},
			{name: 'UNNATURAL BLOODLUST',
			 desc: 'All creatures within 15 m of you suffer from a ringing in their ears and taste the bitterness of iron. During the next round, all melee attacks they make gain +1 ED.'},
			{name: 'THE EARTH PROTESTS',
			 desc: 'The ground within 50 m of you is jolted by a sudden but brief earthquake. The tremor causes no real damage, but all in range must make a successful DN 3 Agility Test or be thrown Prone and suffer 1 Shock.'},
			{name: 'LIFE DRAIN',
			 desc: 'A numbing cold washes out from you, leeching the very life essence of those nearby. Every living creature within 25 m immediately suffers '+dice(3)+' Shock and all lesser life forms (plants, avians, insects, etc.) wither and die.'},
			{name: 'VISIONS OF POSSIBILITY',
			 desc: 'An awful droning buzz surrounds you, drowning out all speech. The drone penetrates the mind. All creatures with the PSYKER Keyword within 10 m must make a DN 4 Intellect Test. Those who fail are Staggered and suffer '+dice(3)+' Shock. Those who succeed gain 1 Wrath.'},
			{name: 'PSYCHIC BACKLASH',
			 desc: 'Lurid-pink Warp lightning dances across your flesh. You suffer '+(dice(3)+2)+' Shock.'},
			{name: 'THE VEIL THINS',
			 desc: 'The air within 25 m of you thins, causing living creatures to suffer shortness of breath and dizziness. All creatures without artificial breathing apparatus are Hindered (2) for 1 minute. In addition, 1 Wrath Dice must be added to all Psychic Mastery (Wil) Tests for the remainder of the scene.'},
			{name: 'WARPTOUCHED AURA',
			 desc: 'The mystical energies of the Warp wash over you and infuse the landscape for 25 m in every direction. All creatures in the area suffer '+dice(3)+' Shock. In addition, the invisible energies flowing through this area greatly increase the potency of psychic phenomena — 1 Wrath Dice must be added to all Psychic Mastery (Wil) for the remainder of the scene.'},
			{name: 'SURGING WARP ENERGIES',
			 desc: 'The air seems to shimmer and distort. All creatures within 25 m of you suffer '+dice(6)+' Shock and the GM gains 1 Ruin. For the remainder of the scene, all Wrath Dice rolled as part of a Psychic Mastery Test that don\'t result in a 1 or a 6 must be re-rolled once.'},
			{name: 'UNNATURAL EFFUSIONS',
			 desc: 'You vomit foul otherworldly materials uncontrollably, far more than your body could ever produce. You suffer '+dice(6)+' Shock and are Restrained for '+dice(6)+' Rounds.'},
			{name: 'THE CRAWLING',
			 desc: 'You are overcome with the sensation of tiny creatures moving just under your skin. You immediately suffer '+(dice(6)+1)+' Shock and must increase the DN of all Tests by 2 for the remainder of the scene.'},
			{name: 'TWISTED FLESH',
			 desc: 'The energies of the Warp unleash a corruptive force on your physical form and all creatures within 10m. All affected characters must make a DN 7 Corruption Test. Those who fail gain '+dice(3)+' Corruption (instead of just one) and suffer 1 Mortal Wound.'},
			{name: 'GRAVE CHILL',
			 desc: 'The environment around you grows numbingly cold, a supernatural chill suffusing every surface with glistening ice. You and every creature within 50 m suffer a -1 to Agility and Strength for the rest of the scene. In addition, all affected creatures must make a successful DN 5 Toughness Test or suffer 1 Mortal Wound.'},
			{name: 'THE SUMMONING',
			 desc: 'A portal is torn open between the Materium and the Warp. A Daemon appears within 25 m of you. The exact location and nature of this daemon is at the GM\'s discretion. The daemonic entity immediately attacks the nearest target. The daemon returns to the Warp after 3 rounds, or when it has been destroyed.'},
			{name: 'VOICES FROM THE BEYOND',
			 desc: 'All creatures within 25 m of you hear harsh, guttural voices close to their ear, though their words are seemingly gibberish. All characters within 10 m must make a DN 5 Fear Test. All sentient characters in range are Staggered until the end of the scene.'},
			{name: 'DARK PASSENGER',
			 desc: 'A daemon enters your mind. The daemon looks out through your eyes, reporting to whatever cruel entity rules it, and may attempt to influence your actions whenever you roll a Complication. It may whisper foul secrets, make disturbing comments, or otherwise make itself known for the remainder of your existence unless expelled. The GM gains one Ruin, and may rule that the daemon takes other actions. See the Daemonic Possession sidebar below for more information.'},
			{name: 'WRITHING DISFIGUREMENT',
			 desc: 'You are wracked with pain, collapsing to the ground. You suffer '+dice(6)+' Shock and gain '+(dice(3)+1)+' Corruption. You must roll on the Minor Mutations table (p.288).'},
			{name: 'SPECTRAL GALE',
			 desc: 'Swirling vortexes of misty, inhuman faces sweep past you and spin away in all directions. The distorted images cackle in maniacal glee, and all mortals who hear them struggle to keep order to their thoughts. All living creatures within 25 m of you must make a DN 7 Fear Test.'},
			{name: 'EYE OF THE GODS',
			 desc: 'Your mind fleetingly draws the gaze of one of the Ruinous Powers. You and any mortals within 20m must make a DN 7 Corruption Test. Those who succeed gain 1 Wrath Point.'},
			{name: 'BLOOD RAIN',
			 desc: 'A hot and sticky blood rain falls in an 8 m radius centered on you. The supernatural storm starts slowly, but quickly builds to a torrent lasting only minutes. Any creature whose flesh is touched by this blood must make a successful DN 7 Willpower Test or become Frenzied. The awful stench of the blood will seep into any item , and may make surfaces slick and slippery.'},
			{name: 'PSYCHIC OVERLOAD',
			 desc: 'Streaming Warp energy bursts from your eyes and mouth, flashing in all directions and penetrating all living creatures surrounding you. You suffer '+(dice(6)+dice(6))+' Mortal Wounds and gain '+dice(3)+' points of Corruption. All other creatures within 10 m suffer '+dice(3)+' Mortal Wounds and must make a successful DN 7 Toughness Test or are Blinded.'}		 
		]

		var perilsDice = parseInt(context);
		if(isNaN(perilsDice)){perilAdd = 0;}else{perilAdd = (perilsDice-1)*3; if(perilAdd>12){perilAdd=12;}}
		rollOne = dice(6);
		rollTwo = dice(6);
		var peril = perilArray[(perilMatrix[rollOne][Math.ceil((rollTwo/2)-1)]+perilAdd)];
		output = ': Perils of the Warp ('+rollOne.toString()+rollTwo.toString()+'+'+(perilAdd*10)+'): \r[**'+peril['name']+'**] \r*'+peril['desc']+'*';
		return output;
	}

	function trinket() { 
		trinketArray = [
			[
				['An Ork tooth. A string of numbers is etched into the enamel.',
				 'A phial of soil from your home world.',
				 'A bent spanner from a Hive World manufactorum.',
				 'A small effigy of a Jokaero made from spare parts.',
				 'A book of ribald poetry bound into the cover of a chronicle of Saint Julyana Gilead.',
				 'Three pieces of dried alien fruit wrapped in wax paper.'],
				['The hilt of a combat knife, the blade dissolved by acid.',
				 'A canteen of rotgut brewed from corpse starches and thruster coolant.',
				 'An icon of Saint Julyana Gilead covering her face as if weeping.',
				 'A shard of wraithbone. When unobserved, the shard orients itself to point towards Ostia.',
				 'The milky eye of an Astropath suspended in a vial of preservative fluid.',
				 'A power cell incompatible with all known Imperium technology.'],
				['A pack of thick Astra Militarum issue socks, never opened.',
				 'A bottle of finest amasec brewed in Imperium Sanctus.',
				 'A leather pouch containing '+dice(6)+' seeds.',
				 'A book of confounding riddles with a blue and yellow cover and 81 pages.',
				 'A boot polish tin containing '+dice(6)+' lho sticks.',
				 'A necklace made of five regicide playing pieces on a silver chain.'],
				['A doll in the form of a Space Marine made from an old shirt.',
				 'A decagon carved roughly from bone with strange symbols on each face.',
				 'A Data-Slate containing fragmentary maps of an ancient vessel lost in the Warp.',
				 'A thick tome of the Imperial Creed, its cover sealed closed by an archaic lock.',
				 'The ident tags of a long-dead soldier of the Astra Militarum.',
				 'A counterfeit Administratum notary seal carved from a starchy tuber.'],
				['A bucket of foul smelling red paint that cannot be washed off.',
				 'A sheaf of Astra Militarum enlistment papers, never filled out.',
				 'The severed finger of a Space Marine Power Fist, its markings inconsistent with any known Chapter.',
				 'An ornate child\'s puzzle box. When solved, the box opens to reveal a disquieting symbol.',
				 'A pict of a distant relation. Their face shows signs of subtle mutation.',
				 'An Explorator\'s journal with strange plant clippings and insects pressed between the pages.'],
				['A single card of the Emperor\'s Tarot bearing a name hastily written in blood.',
				 'A magnetised piece of scrap metal showing an Ork glyph. It takes great force to remove the chit once attached.',
				 'A copy of the Imperial Infantryman\'s Uplifting Primer. The book is bloodstained and charred from the impact of an energy weapon.',
				 'An unread message from someone important to you.',
				 'A fur hat made from the tufted crest of an Eldar Exarch\'s helmet.',
				 'A pilgrim\'s token from Holy Terra.']
			],
			[
				['A cheap copy of a Ministorum seal made from moulded resin covered in a patina of metal.',
				 'A polymorphine ampoule jury-rigged to hold a preserved blood sample.',
				 'The dedication plaque of a Dauntless-class Light Cruiser thought lost during the Gilead Crusade.',
				 'A faint vox-recording of a parent\'s last words.',
				 'A page torn from a sacred text of the Imperial Creed bearing a black smudge in the centre.',
				 'A diadem from a feudal world, its perimeter decorated with xenos claws.'],
				['An antique Chrono that always runs fifteen minutes fast.',
				 'A jawbone, supposedly from a saint, with High Gothic script worked into its surface in delicate scrimshaw.',
				 'An unfired Bolt round, initials carved into its surface.',
				 'A necklace of Imperial coins from various worlds strung on silver wire. The coins are worth just enough to pay for a funeral.',
				 'A wind instrument made from meteoric iron that requires six fingers on each hand to play properly.',
				 'A purity seal stamped with a grinning skull.'],
				['A book of dirty Limericks and bawdy verse written in Low Gothic.',
				 'A sealed translucent box containing a metallic liquid. The liquid splits and moves to avoid your direct gaze.',
				 'A tiny servitor made from the remains of an avian believed native to Holy Terra. It sings sweetly, never repeating a tune.',
				 'A gauzy crimson sash woven from mono-fibre once used to garrotte a treasonous Sub-Sector governor.',
				 'A marble hand broken off an Imperial monument, its surface stained with Ork blood.',
				 'Three corroded, magnetised ball bearings. Each is engraved with markings mimicking the continents of alien worlds.'],
				['A lighter in the shape of a compact laspistol. Pulling the trigger produces a tiny, steady chemical flame from the barrel.',
				 'A sheaf of grave rubbings taken from multiple headstones bearing the same name but different dates of birth and death',
				 'A shard of stained glass from a fallen cathedral.',
				 'The spent power cell of a T\'au Pulse Pistol.',
				 'The command codes for a highly specific class of Cherub Servitors.',
				 'A signet ring bearing the seal of a Nethreun Questor Imperialis unheard of since the opening of the Great Rift.'],
				['A battered Astra Militarum survival kit. Its contents spent except for three water purification tablets.',
				 'A crystal bottle of intoxicating perfume made from gyrinx musk glands.',
				 'A tattered flag showing an Ork emblem of infamous Freebooter Kaptin Mag Galluz.',
				 'A sealed bottle of red corrective ink bearing the label of the Adeptus Administratum.',
				 'A braided lock of synthetic hair.',
				 'A signed second volume of the memoirs of an Imperial hero.'],
				['A burned-out memetic coil from a Servitor Skull.',
				 'Sealed orders meant for a long-dead Lord Marshal of the Gilead Gravediggers.',
				 'A battle damaged ID chip from a T\'au Fire Warrior.',
				 'A stale wafer of hard tack from a Militarum commissary, thick enough to stop a slug round — as the dent in it may prove.',
				 'A diamantine tuning fork engraved with the seal of a Choir Master of the Adeptus Ministorum.',
				 'A deck of playing cards. Each card bears the image of an enemy of the Imperium.']
			],
			[
				['A vox recording of haunting xenos music from a species long thought extinct.',
				 'A death mask in the image of a Canoness of the Adepta Sororitas.',
				 'A reliquary containing a shard of gleaming ice. The ice never melts.',
				 'A wafer-thin sheet of wraithbone covered in interconnected Aeldari glyphs.',
				 'An improvised pendulum made from a length of optic cable and an autogun slug.',
				 'A portable Auto-Quill modified to print Ork glyphs.'],
				['A shrill whistle carved from a preserved horn.',
				 'An Imperial noble\'s commissioning scroll, signed and notarised, dated in M43.',
				 'A rockcrete brick pried from the defensive wall of a fallen Imperial bastion.',
				 'A forged promissory note from the Upstanding Starch Guild on Gilead Primus.',
				 'A ring of keys, each one encoded to a stasis vault on a different world.',
				 'A list of seemingly unrelated machine components written in blocky, crabbed handwriting.'],
				['An ornate silver snuffbox. The snuff within is fortified with trace amounts of xenos pollen.',
				 'A fetish carved from volcanic glass depicting a skull-faced god sitting on a gothic throne.',
				 'A ticket stub for a performance of an opera proscribed by the Ecclesiarchy.',
				 'A dog-eared, lavishly illustrated children\'s primer of Imperial history.',
				 'A classified document, redacted so that every word is blacked out except for one. It could read "crucible" or "cubicle".',
				 'Coded data-slate of a significant Human bloodline showing possible mutation and xenos gene-grafting.'],
				['A notched hourglass filled with the ruddy sand of Mars.',
				 'Half of a shattered mask depicting a face distorted with fear.',
				 'A smooth river stone with an Aeldari glyph carved into its surface.',
				 'An eight-spoked cogwheel.',
				 'A small triptych of the God-Emperor ascendant, martyred, and interred upon the Golden Throne. The hinges are rusted shut.',
				 'The remote detonator to a Penal Legionnaire\'s explosive collar.'],
				['A xenohide pouch containing the mummified heart of an unknown organism.',
				 'A radiation-damaged design template for a plasma reactor with a single fatal design flaw.',
				 'An exhaustive phrase book translating common phrases between multiple dialects of Low Gothic.',
				 'The knob from the end of a Weirdboy\'s channelling rod.',
				 'A clockwork replica of an attack bike that sparks and runs in circles when wound.',
				 'A sash made from the interlocking scales of a Maiden World reptile.'],
				['An illuminated book of hours. Many of the prayers within are edited in red ink.',
				 'A prism-like mirror shard. Staring at one\'s own reflection in the shard causes vivid hallucinations.',
				 'A piece of ceramite marked with the emblem of the Absolvers Chapter.',
				 'Several lengths of ribbed cable meant to be worn around the head and neck, giving the wearer the appearance of possessing several high-quality augmetics.',
				 'A bottle of sacramental wine blessed by Arch-Deacon Merramar Clade.',
				 'A cheap replica of an Arbitrator\'s badge of office.']
			]	
		];
		
		chart = dice(3);
		die1 = dice(6);
		die2 = dice(6);
		output = ': Trinket ('+chart+':'+die1.toString()+die2.toString()+ '): *'+trinketArray[chart-1][die1-1][die2-1]+'*`';
		return output;
	}

	function wghelp(context){
		switch (context.trim()){
			case 'roll':
				output = '\rRolling Function. Can roll skills, extra damage, d3, d6, and d66.'+ 
					'\rExample Syntax:'+ 
					'\r!wgroll 5 (Roll 4 regular dice, 1 wrath die. Equivalent to !roll 5w1)'+
					'\r!wgroll 5w2 (Roll 3 regular dice, 2 wrath dice).'+
					'\r!wgroll 3ed (Roll 3 Extra Die) (Could include brutal (!roll 3ed brutal) to recalculate percentages).'+
					'\r!wgroll d6 (Roll 1 d6 and returns the basic result)'+
					'\r!wgroll d66 (Roll 2d6 and returns the basic results)';
				return output;
				break;
			case 'complication':
				output = '\rRandom Complication Generator. Gives the description of a complication from the rulebook on page .\rExample Syntax:\r!wgcomplication\r'+
					'\rIf you would like to generate a combat complication (from page 191), add "combat" to the end of the command.\rExample Syntax:\r!wgcomplication combat';
				return output;
				break;
			case 'condition':
				output = '\rProvides more information about the condition called on by the syntax.\r Example Syntax: !wgcondition {condition}'+
					'\rList of conditions: bleeding, blinded, exhausted, fear, frenzied, hindered, on fire, pinned, poisoned, prone, restrained, staggered, terror, vulnerable';
				return output;
				break;
			case 'crit':
				output = '\rCritical Hits Table. Gives the name, description, effect, and glory effect for the crit that gets randomly selected.\rExample Syntax:\r!wgcrit';
				return output;
				break;
			case 'injury':
				output = '\rRandom Memorable Injury Generator. Gives the injury and escalation of a memorable injury from the table on page 194. \rExample Syntax:\r!wginjury'+			
					'\rIf you would like to generate a traumatic injury (from page 195), add "traumatic" to the end of the command.\rExample Syntax:\r!wginjury traumatic';					
				return output;
				break;
			case 'mutation':
				output = '\rProvide a random mutation using the mutation tables. If you have previous mutations, add them to the end of the command.'+
					'\rExample Syntax:'+
					'\r!wgmutation (equivalent of !mutation 0, or rolling on the mutation tables without an existing mutation).'+
					'\r!wgmutation 3 (rolling on the mutation with 3 existing mutations, so +30 (10*3) will be added to your d66 roll.)';
				return output;
				break;
			case 'objective':
				output = '\rProvide an objective for the indicated faction/sub-faction. The list of faction keywords to use are:'+
					'\rsororitas, telepathica, mechanicus, militarum, inquisition, rogue, scum, astartes'+
					'\raeldari, orks, chaos'+
					'\rExample Syntax:'+
					'\r!wgobjective sororitas';
				return output;
				break;
			case 'perils':
				output = '\rPerils of the Warp command. - !perils {# of Peril Dice}'+
					'\rExample Syntax:'+
					'\r!wgperils == !perils 1 == !roll d66.'+
					'\r!wgperils 3 == !rolld66+20, where the 20 comes from the 2 (3-1) additional perils.';
				return output;
				break;
			case 'trinket':
				output = 'Random Trinket Generator. Gives the description of a trinket from one of three trinket tables.\rExample Syntax:\r!wgtrinket';
				return output;
				break;
			default:
				output = '\rUse !wghelp {command} to get more information about the command. Please note that commands must be prefixed by "!wg" to work. The list of possible commands are: '+
					'\r -- complication \r -- condition \r -- crit \r -- injury \r -- mutation \r -- objective \r -- perils \r -- roll \r -- trinket';
				return output;
				break;
		}	
	}	
});
