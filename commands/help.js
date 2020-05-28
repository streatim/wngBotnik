const help = function help(context){
    const helpContext = context.trim();
		switch (helpContext) {
			case 'roll':
				output = [
                    'Rolling Function. Can roll skills, extra damage, d3, d6, and d66.',
					'Example Syntax:', 
					'!wgroll 5 (Roll 4 regular dice, 1 wrath die. Equivalent to !roll 5w1)',
					'!wgroll 5w2 (Roll 3 regular dice, 2 wrath dice).',
					'!wgroll 3ed (Roll 3 Extra Die) (Could include brutal (!roll 3ed brutal) to recalculate percentages).',
					'!wgroll d6 (Roll 1 d6 and returns the basic result)',
					'!wgroll d66 (Roll 2d6 and returns the basic results)'
                ];
				break;
			case 'complication':
				output = [
                    'Random Complication Generator. Gives the description of a complication from the rulebook on page.',
                    'Example Syntax:',
                    '!wgcomplication',
                    'If you would like to generate a combat complication (from page 191), add "combat" to the end of the command.',
                    'Example Syntax:',
                    '!wgcomplication combat'
                ]
				break;
			case 'condition':
                output = [
                    'Provides more information about the condition called on by the syntax.',
                    'Example Syntax: !wgcondition {condition}',
                    'List of conditions:',
                    'bleeding      blinded',
                    'exhausted     fear',
                    'frenzied      hindered',
                    'on fire       pinned',
                    'poisoned      prone',
                    'restrained    staggered', 
                    'terror        vulnerable'
                ]
				break;
			case 'crit':
				output = [
                    'Critical Hits Table. Gives the name, description, effect, and glory effect for the crit that gets randomly selected.',
                    'Example Syntax:',
                    '!wgcrit'
                ]
				break;
            /* Injury is 100% not working, taken out while being debugged.
            case 'injury':
				output = [
                    'Random Memorable Injury Generator. Gives the injury and escalation of a memorable injury from the table on page 194.', 
                    'Example Syntax:',
                    '!wginjury',			
                    'If you would like to generate a traumatic injury (from page 195), add "traumatic" to the end of the command.',
                    'Example Syntax:',
                    '!wginjury traumatic'
                ]
				break;
            */
                case 'mutation':
				output = [
                    'Provide a random mutation using the mutation tables. If you have previous mutations, add them to the end of the command.',
					'Example Syntax:',
					'!wgmutation (equivalent of !mutation 0, or rolling on the mutation tables without an existing mutation).',
                    '!wgmutation 3 (rolling on the mutation with 3 existing mutations, so +30 (10*3) will be added to your d66 roll.)'
                ]
				break;
			case 'objective':
				output = [
                    'Provide an objective for the indicated faction/sub-faction. The list of faction keywords to use are:',
                    'sororitas     telepathica',
                    'mechanicus    militarum', 
                    'inquisition   rogue',
                    'scum          astartes',
                    'aeldari       orks', 
                    'chaos',
					'Example Syntax:',
                    '!wgobjective sororitas'
                ]
				break;
			case 'perils':
				output = [
                    'Perils of the Warp command. - !perils {# of Peril Dice}',
					'Example Syntax:',
					'!wgperils == !wgperils 1 == !wgroll d66.',
                    '!wgperils 3 == !rolld66+20, where the 20 comes from the 2 (3-1) additional perils.'
                ]
				break;
			case 'trinket':
                output = [
                    'Random Trinket Generator. Gives the description of a trinket from one of three trinket tables.',
                    'Example Syntax:',
                    '!wgtrinket'
                ]
				break;
			default:
                output = [
                    'Use !wghelp {command} to get more information about the command. Please note that commands must be prefixed by "!wg" to work.',
                    'The list of possible commands are: ',
                    'complication     condition',
                    'crit             injury',
                    'mutation         objective',
                    'perils           roll',
                    'trinket'
                ]
			    break;
        }
    return output.join('\r');
}
    
module.exports = help;