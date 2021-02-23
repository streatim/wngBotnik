const pfhelp = function pfhelp(context){



    
    const helpContext = (context) ? context.trim() : "";

		switch (helpContext) {
			case 'roll':
				output = [
                    'Rolling Function. Uses XdY+Z where X is the number of dice, Y is the type of dice, and Y is any additional bonus.',
                    'Rolling with just "dY" or "Y" is the same as rolling "1dY" (e.g., !pfroll d20 and !pfroll 20 is the same as !pfroll 1d20)',
					'Example Syntax:', 
					'!pfroll 1d20  (Roll 1 d20).',
					'!pfroll 5d6 (Roll 5 d6).',
					'!pfroll 20 (Roll a single d20).',
					'!pfroll 2d4+3 (Roll 2 d4 and add 3 to the result).',
                ];
                break;
            case 'patch':
                output = [
                    'Version 0.123145663463',
                    'The latest and greatest to the baddest homebrew roll robot around.',
                    '!pfroll now defaults to d20, since that is the only dice type that DnD and DnD-like games seem to know how to use.',
                    '!pfroll now recognizes subtraction. The robot incorrectly assumed that you, you supposedly-stalwart heroes of yore, would never have to *subtract* from your roll. But apparently you already needed it.',
                ];
                break;
			default:
                output = [
                    'Use !pfhelp {command} to get more information about the command. Please note that commands must be prefixed by "!pf" to work.',
                    'The list of possible commands are: ',
                    'roll',
                    'patch',
                ];
			    break;
        }
    return output.join('\r');
}
    
module.exports = pfhelp;